from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError
from app.models.item import Item


def name_exists(form, field):
    name = field.data
    item = Item.query.filter(Item.name == name).first()
    if item:
        raise ValidationError("Already have an item with this name")


class ItemForm(FlaskForm):
    name = StringField('Name', validators=[
                       DataRequired(), Length(max=255), name_exists])
    category_id = IntegerField('Category ID', validators=[
                               DataRequired(), NumberRange(min=1)])
    supplier_id = IntegerField('Supplier ID', validators=[
                               DataRequired(), NumberRange(min=1)])
    low_stock_at = IntegerField('Low Stock Threshold', validators=[
                                DataRequired(), NumberRange(min=1)])
    suffix = StringField('Suffix', validators=[DataRequired(), Length(max=40)])
