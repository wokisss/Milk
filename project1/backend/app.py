from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config
# Updated model imports
from models import db, User, Herdsman, Acquisition
from datetime import datetime

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
CORS(app)
jwt = JWTManager(app)
db.init_app(app)

# The db.create_all() call is removed, as tables are managed by project2
# The logic to create a default admin user is also removed to avoid conflicts,
# assuming user management might be centralized or handled differently now.

# ==================== Authentication API (Unchanged) ====================

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
    return jsonify({'success': False, 'message': 'Username or password incorrect'}), 401

@app.route('/api/user/info', methods=['GET'])
@jwt_required()
def get_user_info():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        return jsonify({'success': True, 'data': user.to_dict()})
    return jsonify({'success': False, 'message': 'User not found'}), 404

# ==================== Herdsman Management API (Refactored from Farmer) ====================
# The API endpoints are kept the same (/api/farmers) to ensure frontend compatibility.

@app.route('/api/farmers', methods=['GET'])
def get_farmers():
    herdsmen = Herdsman.query.all()
    return jsonify({
        'success': True,
        'data': [h.to_dict() for h in herdsmen]
    })

@app.route('/api/farmers/<int:id>', methods=['GET'])
def get_farmer(id):
    herdsman = Herdsman.query.get_or_404(id)
    return jsonify({'success': True, 'data': herdsman.to_dict()})

@app.route('/api/farmers', methods=['POST'])
def create_farmer():
    data = request.get_json()
    # Map old frontend fields to new Herdsman model
    herdsman = Herdsman(
        name=data.get('name'),
        phone=data.get('phone'),
        address=data.get('address'),
        id_card=data.get('id_card'),
        bank_card=data.get('bank_account'), # Mapping bank_account to bank_card
        milk_station_id=data.get('milk_station_id') # Assuming frontend might send this
    )
    db.session.add(herdsman)
    db.session.commit()
    return jsonify({'success': True, 'data': herdsman.to_dict()}), 201

@app.route('/api/farmers/<int:id>', methods=['PUT'])
def update_farmer(id):
    herdsman = Herdsman.query.get_or_404(id)
    data = request.get_json()
    herdsman.name = data.get('name', herdsman.name)
    herdsman.phone = data.get('phone', herdsman.phone)
    herdsman.address = data.get('address', herdsman.address)
    herdsman.id_card = data.get('id_card', herdsman.id_card)
    herdsman.bank_card = data.get('bank_account', herdsman.bank_card) # Mapping
    herdsman.milk_station_id = data.get('milk_station_id', herdsman.milk_station_id)
    db.session.commit()
    return jsonify({'success': True, 'data': herdsman.to_dict()})

@app.route('/api/farmers/<int:id>', methods=['DELETE'])
def delete_farmer(id):
    herdsman = Herdsman.query.get_or_404(id)
    db.session.delete(herdsman)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Delete successful'})

# ==================== Acquisition API (Refactored from Purchase) ====================
# The API endpoints are kept the same (/api/purchases) to ensure frontend compatibility.

@app.route('/api/purchases', methods=['GET'])
def get_purchases():
    acquisitions = Acquisition.query.all()
    return jsonify({
        'success': True,
        'data': [a.to_dict() for a in acquisitions]
    })

@app.route('/api/purchases/<int:id>', methods=['GET'])
def get_purchase(id):
    acquisition = Acquisition.query.get_or_404(id)
    return jsonify({'success': True, 'data': acquisition.to_dict()})

@app.route('/api/purchases', methods=['POST'])
def create_purchase():
    data = request.get_json()
    
    # Map old fields to new model, providing defaults for new required fields
    price = float(data.get('unit_price', 0))
    # The 'weight' in the new model is a string. The old 'quantity' was a float.
    weight_str = str(data.get('quantity', 0))

    # The 'date' in the new model is a string.
    date_str = data.get('purchase_date', datetime.utcnow().strftime('%Y-%m-%d'))

    acquisition = Acquisition(
        herdsman_id=data.get('farmer_id'),
        weight=weight_str,
        price=price,
        total_price=float(weight_str) * price,
        date=date_str,
        # Provide default values for new required fields not present in project1's frontend
        initial_id=data.get('initial_id', f"proj1-{datetime.utcnow().timestamp()}"),
        location=data.get('location', 'Unknown')
    )
    db.session.add(acquisition)
    db.session.commit()
    return jsonify({'success': True, 'data': acquisition.to_dict()}), 201

@app.route('/api/purchases/<int:id>', methods=['PUT'])
def update_purchase(id):
    acquisition = Acquisition.query.get_or_404(id)
    data = request.get_json()
    
    acquisition.herdsman_id = data.get('farmer_id', acquisition.herdsman_id)
    
    # Handle weight (string) and price (float)
    if 'quantity' in data:
        acquisition.weight = str(data.get('quantity'))
    if 'unit_price' in data:
        acquisition.price = float(data.get('unit_price'))

    # Recalculate total_price
    acquisition.total_price = float(acquisition.weight) * acquisition.price

    if 'purchase_date' in data:
        acquisition.date = data.get('purchase_date')

    # Update new fields if provided
    acquisition.initial_id = data.get('initial_id', acquisition.initial_id)
    acquisition.location = data.get('location', acquisition.location)
    
    db.session.commit()
    return jsonify({'success': True, 'data': acquisition.to_dict()})

@app.route('/api/purchases/<int:id>', methods=['DELETE'])
def delete_purchase(id):
    acquisition = Acquisition.query.get_or_404(id)
    db.session.delete(acquisition)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Delete successful'})

# ==================== Stats API (Refactored) ====================

@app.route('/api/stats', methods=['GET'])
def get_stats():
    total_farmers = Herdsman.query.count()
    total_purchases = Acquisition.query.count()

    # 'weight' is a string, so we must fetch all records and sum in Python
    acquisitions = Acquisition.query.all()
    total_quantity = sum(float(a.weight) for a in acquisitions if a.weight)
    
    # total_price can be summed in the DB
    total_amount = db.session.query(db.func.sum(Acquisition.total_price)).scalar() or 0
    
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