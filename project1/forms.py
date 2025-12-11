from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, SubmitField, PasswordField
from wtforms.validators import DataRequired, Length

class LoginForm(FlaskForm):
    username = StringField('用户名', validators=[DataRequired(), Length(max=64)])
    password = PasswordField('密码', validators=[DataRequired()])
    submit = SubmitField('登录')

class FarmerForm(FlaskForm):
    name = StringField('姓名', validators=[DataRequired(), Length(max=128)])
    id_card = StringField('身份证号', validators=[DataRequired(), Length(max=30)])
    bank_card = StringField('银行卡号', validators=[Length(max=30)])
    address = StringField('家庭住址', validators=[Length(max=256)])
    phone = StringField('联系方式', validators=[Length(max=30)])
    milk_station_id = StringField('所属奶站编号', validators=[Length(max=50)])
    submit = SubmitField('保存')

class PurchaseForm(FlaskForm):
    farmer_id_card = StringField('牧民身份证号', validators=[DataRequired()])
    price_per_unit = DecimalField('收购单价', places=2, validators=[DataRequired()])
    quantity = DecimalField('输入数量', places=3, validators=[DataRequired()])
    location = StringField('收购地点', validators=[Length(max=256)])
    note = TextAreaField('备注', validators=[Length(max=512)])
    submit = SubmitField('提交')
