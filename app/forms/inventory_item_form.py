from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError
from app.models.inventory_item import InventoryItem


class InventoryItemForm(FlaskForm):
    quantity = IntegerField('Quantity', validators=[DataRequired()])
