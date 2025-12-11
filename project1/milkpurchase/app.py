from flask import Flask, render_template, redirect, url_for, flash, request, session
from config import Config
from models import db, Farmer, Purchase, User
from forms import FarmerForm, PurchaseForm, LoginForm
from decimal import Decimal
from functools import wraps

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

@app.before_first_request
def create_tables():
    db.create_all()
    # 创建默认管理员用户
    if not User.query.filter_by(username='admin').first():
        admin_user = User(username='admin', role='admin')
        admin_user.set_password('admin123')
        db.session.add(admin_user)
        db.session.commit()

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
        price = Decimal(form.price_per_unit.data)
        total = qty * price
        p = Purchase(farmer_id=farmer.id, price_per_unit=price, quantity=qty, total_price=total, location=form.location.data, note=form.note.data)
        db.session.add(p)
        db.session.commit()
        flash('收购记录已保存', 'success')
        return redirect(url_for('purchases_list'))
    return render_template('purchase_form.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)
