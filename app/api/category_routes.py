from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models.category import db, Category
from ..forms.category_form import CategoryForm
from .auth_routes import validation_errors_to_error_messages

category_routes = Blueprint('categories', __name__)


# CREATE A NEW CATEGORY
@category_routes.route('/new', methods=['POST'])
@login_required
def create_category():
    form = CategoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        category = Category(
            name=form.data['name'],
            user_id=current_user.id
        )
        db.session.add(category)
        db.session.commit()

        return category.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# READ ALL CATEGORIES
@category_routes.route('/')
@login_required
def user_categories():
    user_categories = Category.query.filter_by(user_id=current_user.id).all()
    return {'categories': [category.to_dict() for category in user_categories]}, 200


# GET CATEGORY INFO BASED ON CATEGORY ID (GRABS ALL ITEMS IN CATEGORY)
@category_routes.route('/<int:category_id>')
@login_required
def one_category(category_id):
    user_category = Category.query.get(category_id)
    if user_category:
        if user_category.user_id == current_user.id:
            return {'category': user_category.to_dict()}, 200
        else:
            return {'errors': 'Unauthorized to get this category'}, 401
    else:
        return {'errors': 'Category not found'}, 404


# UPDAE A CATEGORY NAME BASED ON CATEGORY ID
@category_routes.route('/<int:category_id>', methods=["PUT", "PATCH"])
@login_required
def update_category(category_id):
    form = CategoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        category = Category.query.get(category_id)

        if category:
            if category.user_id == current_user.id:
                category.name = form.data['name']
                db.session.commit()
                return category.to_dict(), 200
            else:
                return {'errors': 'Unauthorized to update this category'}, 401
        else:
            return {'errors': 'Category not found'}, 404
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# DELETE A CATEGORY FROM CATEGORY ID
@category_routes.route('/<int:category_id>', methods=["DELETE"])
@login_required
def delete_category(category_id):
    category = Category.query.get(category_id)
    if category:
        if category.user_id == current_user.id:
            db.session.delete(category)
            db.session.commit()
            return {'message': 'Category deleted successfully'}, 200
        else:
            return {'errors': 'Unauthorized to delete this category'}, 401
    else:
        return {'errors': 'Category not found'}, 404
