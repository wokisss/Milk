from flask import Flask, render_template, redirect, url_for, flash, request, session
from config import Config
from models import db, Farmer, Purchase, User
from forms import FarmerForm, PurchaseForm, LoginForm
from decimal import Decimal
from functools import wraps
import uuid
from datetime import datetime

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('请先登录', 'danger')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

# 标志变量，用于确保初始化只执行一次
_initialized = False

@app.before_request
def ensure_initialized():
    global _initialized
    if not _initialized:
        # db.create_all() # 已禁用，因为表结构由 Project 2 管理
        # 创建默认管理员用户
        if not User.query.filter_by(username='admin').first():
            admin_user = User(username='admin', role='admin')
            admin_user.set_password('admin123')
            db.session.add(admin_user)
            db.session.commit()
        _initialized = True

@app.route('/')
def index():
    if 'user_id' in session:
        return render_template('index.html')
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user_id' in session:
        return redirect(url_for('index'))
    
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.check_password(form.password.data):
            session['user_id'] = user.id
            session['username'] = user.username
            session['role'] = user.role
            flash('登录成功！', 'success')
            return redirect(url_for('index'))
        else:
            flash('用户名或密码错误', 'danger')
    return render_template('login.html', form=form)

@app.route('/logout')
def logout():
    session.clear()
    flash('已退出登录', 'success')
    return redirect(url_for('login'))

@app.route('/farmers')
@login_required
def farmers_list():
    farmers = Farmer.query.all()
    return render_template('farmers.html', farmers=farmers)

@app.route('/farmer/new', methods=['GET','POST'])
@login_required
def new_farmer():
    form = FarmerForm()
    if form.validate_on_submit():
        f = Farmer(name=form.name.data, id_card=form.id_card.data, bank_card=form.bank_card.data,
                   address=form.address.data, phone=form.phone.data, milk_station_id=form.milk_station_id.data)
        db.session.add(f)
        db.session.commit()
        flash('已添加牧民', 'success')
        return redirect(url_for('farmers_list'))
    return render_template('farmer_form.html', form=form)

@app.route('/farmer/view/<int:farmer_id>')
@login_required
def view_farmer(farmer_id):
    farmer = Farmer.query.get_or_404(farmer_id)
    # 使用新的外键 herdsman_id 查询，并按日期倒序
    purchases = Purchase.query.filter_by(herdsman_id=farmer.id).order_by(Purchase.date.desc()).all()
    return render_template('farmer_view.html', farmer=farmer, purchases=purchases)

@app.route('/farmer/edit/<int:farmer_id>', methods=['GET','POST'])
@login_required
def edit_farmer(farmer_id):
    farmer = Farmer.query.get_or_404(farmer_id)
    form = FarmerForm(obj=farmer)
    
    if form.validate_on_submit():
        farmer.name = form.name.data
        farmer.id_card = form.id_card.data
        farmer.bank_card = form.bank_card.data
        farmer.address = form.address.data
        farmer.phone = form.phone.data
        farmer.milk_station_id = form.milk_station_id.data
        db.session.commit()
        flash('牧民信息已更新', 'success')
        return redirect(url_for('farmers_list'))
    
    return render_template('farmer_form.html', form=form, farmer=farmer)

@app.route('/farmer/delete/<int:farmer_id>', methods=['POST'])
@login_required
def delete_farmer(farmer_id):
    farmer = Farmer.query.get_or_404(farmer_id)
    
    # 检查是否有关联的收购记录
    if Purchase.query.filter_by(herdsman_id=farmer.id).first():
        flash('该牧民有关联的收购记录，无法删除', 'danger')
        return redirect(url_for('farmers_list'))
    
    db.session.delete(farmer)
    db.session.commit()
    flash('牧民已删除', 'success')
    return redirect(url_for('farmers_list'))

@app.route('/purchases')
@login_required
def purchases_list():
    purchases = Purchase.query.all()
    return render_template('purchases.html', purchases=purchases)

@app.route('/purchase/new', methods=['GET','POST'])
@login_required
def new_purchase():
    form = PurchaseForm()
    if form.validate_on_submit():
        farmer = Farmer.query.filter_by(id_card=form.farmer_id_card.data).first()
        if not farmer:
            flash('未找到对应牧民', 'danger')
            return redirect(url_for('new_purchase'))
        
        qty = Decimal(form.quantity.data)
        price_val = Decimal(form.price_per_unit.data)
        total = qty * price_val
        
        # 创建符合 Project 2 acquisitions 表结构的 Purchase 对象
        p = Purchase(
            herdsman_id=farmer.id,
            initial_id=str(uuid.uuid4()),
            weight=str(qty),
            price=float(price_val),
            total_price=float(total),
            date=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            location=form.location.data
        )
        db.session.add(p)
        db.session.commit()
        flash('收购记录已保存', 'success')
        return redirect(url_for('purchases_list'))
    return render_template('purchase_form.html', form=form)

@app.route('/purchase/view/<int:purchase_id>')
@login_required
def view_purchase(purchase_id):
    purchase = Purchase.query.get_or_404(purchase_id)
    return render_template('purchase_view.html', purchase=purchase)

@app.route('/purchase/edit/<int:purchase_id>', methods=['GET','POST'])
@login_required
def edit_purchase(purchase_id):
    purchase = Purchase.query.get_or_404(purchase_id)
    form = PurchaseForm()
    
    if request.method == 'GET':
        # 预填充表单数据，使用新字段
        form.farmer_id_card.data = purchase.farmer.id_card
        form.price_per_unit.data = Decimal(str(purchase.price))
        form.quantity.data = Decimal(purchase.weight)
        form.location.data = purchase.location
        form.note.data = "" # Note 字段不再使用
    
    if form.validate_on_submit():
        farmer = Farmer.query.filter_by(id_card=form.farmer_id_card.data).first()
        if not farmer:
            flash('未找到对应牧民', 'danger')
            return redirect(url_for('edit_purchase', purchase_id=purchase_id))
        
        qty = Decimal(form.quantity.data)
        price_val = Decimal(form.price_per_unit.data)
        total = qty * price_val
        
        # 更新 purchase 对象以符合新模型
        purchase.herdsman_id = farmer.id
        purchase.price = float(price_val)
        purchase.weight = str(qty)
        purchase.total_price = float(total)
        purchase.location = form.location.data
        # 'date' 字段在编辑时通常不更新，保持创建时的时间
        # 'initial_id' 也不应改变
        
        db.session.commit()
        flash('收购记录已更新', 'success')
        return redirect(url_for('purchases_list'))
    
    return render_template('purchase_form.html', form=form, purchase=purchase)

@app.route('/purchase/delete/<int:purchase_id>', methods=['POST'])
@login_required
def delete_purchase(purchase_id):
    purchase = Purchase.query.get_or_404(purchase_id)
    db.session.delete(purchase)
    db.session.commit()
    flash('收购记录已删除', 'success')
    return redirect(url_for('purchases_list'))

if __name__ == '__main__':
    app.run(debug=True)