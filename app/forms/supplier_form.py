from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError
from app.models.supplier import Supplier


def supplier_exists(form, field):
    name = field.data
    supplier = Supplier.query.filter(Supplier.name == name).first()
    if supplier:
        raise ValidationError("Already have a supplier with this name")


class SupplierForm(FlaskForm):
    name = StringField('Name', validators=[
                       DataRequired(), Length(max=255), supplier_exists])
