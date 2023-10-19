from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError
from app.models.supplier import Supplier



class SupplierForm(FlaskForm):
    name = StringField('Name', validators=[
                       DataRequired(), Length(max=255)])
