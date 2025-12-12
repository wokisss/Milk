from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config
from models import db, User, Farmer, Purchase
from datetime import datetime

app = Flask(__name__)
app.config.from_object(Config)

# 初始化扩展
CORS(app)
jwt = JWTManager(app)
db.init_app(app)

# 创建数据库表
with app.app_context():
    db.create_all()
    # 创建默认管理员账户
    if not User.query.filter_by(username='admin').first():
        admin = User(
            username='admin',
            password=generate_password_hash('admin123'),
            name='管理员',
            role='admin'
        )
        db.session.add(admin)
        db.session.commit()

# ==================== 认证接口 ====================

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'success': True,
            'data': {
                'token': access_token,
                'user': user.to_dict()
            }
        })
    return jsonify({'success': False, 'message': '用户名或密码错误'}), 401

@app.route('/api/user/info', methods=['GET'])
@jwt_required()
def get_user_info():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        return jsonify({'success': True, 'data': user.to_dict()})
    return jsonify({'success': False, 'message': '用户不存在'}), 404

# ==================== 牧民管理接口 ====================

@app.route('/api/farmers', methods=['GET'])
def get_farmers():
    farmers = Farmer.query.all()
    return jsonify({
        'success': True,
        'data': [f.to_dict() for f in farmers]
    })

@app.route('/api/farmers/<int:id>', methods=['GET'])
def get_farmer(id):
    farmer = Farmer.query.get_or_404(id)
    return jsonify({'success': True, 'data': farmer.to_dict()})

@app.route('/api/farmers', methods=['POST'])
def create_farmer():
    data = request.get_json()
    farmer = Farmer(
        name=data.get('name'),
        phone=data.get('phone'),
        address=data.get('address'),
        id_card=data.get('id_card'),
        bank_account=data.get('bank_account')
    )
    db.session.add(farmer)
    db.session.commit()
    return jsonify({'success': True, 'data': farmer.to_dict()}), 201

@app.route('/api/farmers/<int:id>', methods=['PUT'])
def update_farmer(id):
    farmer = Farmer.query.get_or_404(id)
    data = request.get_json()
    farmer.name = data.get('name', farmer.name)
    farmer.phone = data.get('phone', farmer.phone)
    farmer.address = data.get('address', farmer.address)
    farmer.id_card = data.get('id_card', farmer.id_card)
    farmer.bank_account = data.get('bank_account', farmer.bank_account)
    db.session.commit()
    return jsonify({'success': True, 'data': farmer.to_dict()})

@app.route('/api/farmers/<int:id>', methods=['DELETE'])
def delete_farmer(id):
    farmer = Farmer.query.get_or_404(id)
    db.session.delete(farmer)
    db.session.commit()
    return jsonify({'success': True, 'message': '删除成功'})

# ==================== 收购记录接口 ====================

@app.route('/api/purchases', methods=['GET'])
def get_purchases():
    purchases = Purchase.query.all()
    return jsonify({
        'success': True,
        'data': [p.to_dict() for p in purchases]
    })

@app.route('/api/purchases/<int:id>', methods=['GET'])
def get_purchase(id):
    purchase = Purchase.query.get_or_404(id)
    return jsonify({'success': True, 'data': purchase.to_dict()})

@app.route('/api/purchases', methods=['POST'])
def create_purchase():
    data = request.get_json()
    quantity = float(data.get('quantity', 0))
    unit_price = float(data.get('unit_price', 0))
    
    purchase = Purchase(
        farmer_id=data.get('farmer_id'),
        quantity=quantity,
        unit_price=unit_price,
        total_price=quantity * unit_price,
        quality_level=data.get('quality_level'),
        purchase_date=datetime.strptime(data.get('purchase_date'), '%Y-%m-%d') if data.get('purchase_date') else datetime.utcnow(),
        notes=data.get('notes')
    )
    db.session.add(purchase)
    db.session.commit()
    return jsonify({'success': True, 'data': purchase.to_dict()}), 201

@app.route('/api/purchases/<int:id>', methods=['PUT'])
def update_purchase(id):
    purchase = Purchase.query.get_or_404(id)
    data = request.get_json()
    
    purchase.farmer_id = data.get('farmer_id', purchase.farmer_id)
    purchase.quantity = float(data.get('quantity', purchase.quantity))
    purchase.unit_price = float(data.get('unit_price', purchase.unit_price))
    purchase.total_price = purchase.quantity * purchase.unit_price
    purchase.quality_level = data.get('quality_level', purchase.quality_level)
    if data.get('purchase_date'):
        purchase.purchase_date = datetime.strptime(data.get('purchase_date'), '%Y-%m-%d')
    purchase.notes = data.get('notes', purchase.notes)
    
    db.session.commit()
    return jsonify({'success': True, 'data': purchase.to_dict()})

@app.route('/api/purchases/<int:id>', methods=['DELETE'])
def delete_purchase(id):
    purchase = Purchase.query.get_or_404(id)
    db.session.delete(purchase)
    db.session.commit()
    return jsonify({'success': True, 'message': '删除成功'})

# ==================== 统计接口 ====================

@app.route('/api/stats', methods=['GET'])
def get_stats():
    total_farmers = Farmer.query.count()
    total_purchases = Purchase.query.count()
    total_quantity = db.session.query(db.func.sum(Purchase.quantity)).scalar() or 0
    total_amount = db.session.query(db.func.sum(Purchase.total_price)).scalar() or 0
    
    return jsonify({
        'success': True,
        'data': {
            'total_farmers': total_farmers,
            'total_purchases': total_purchases,
            'total_quantity': round(total_quantity, 2),
            'total_amount': round(total_amount, 2)
        }
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)



