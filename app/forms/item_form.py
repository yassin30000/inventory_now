from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError
from app.models.item import Item


class ItemForm(FlaskForm):
    name = StringField('Name', validators=[
                       DataRequired(), Length(max=255)])
    category_id = IntegerField('Category ID')
    supplier_id = IntegerField('Supplier ID')
    low_stock_at = IntegerField('Low Stock Threshold', validators=[
                                DataRequired(), NumberRange(min=1)])
    suffix = StringField('Suffix', validators=[DataRequired(), Length(max=40)])
