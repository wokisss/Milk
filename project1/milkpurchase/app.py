from flask import Flask, render_template, redirect, url_for, flash, request
from config import Config
from models import db, Farmer, Purchase
from forms import FarmerForm, PurchaseForm
from decimal import Decimal

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/farmers')
def farmers_list():
    farmers = Farmer.query.all()
    return render_template('farmers.html', farmers=farmers)

@app.route('/farmer/new', methods=['GET','POST'])
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
def purchases_list():
    purchases = Purchase.query.all()
    return render_template('purchases.html', purchases=purchases)

@app.route('/purchase/new', methods=['GET','POST'])
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
