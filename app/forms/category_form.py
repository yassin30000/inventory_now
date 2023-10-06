from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError
from app.models.category import Category


def category_exists(form, field):
    name = field.data
    category = Category.query.filter(Category.name == name).first()
    if category:
        raise ValidationError("Already have a category with this name")


class CategoryForm(FlaskForm):
    name = StringField('Name', validators=[
                       DataRequired(), Length(max=255), category_exists])
