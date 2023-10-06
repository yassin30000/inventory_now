from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models.item import Item, db
from ..forms.item_form import ItemForm
from .auth_routes import validation_errors_to_error_messages

item_routes = Blueprint('items', __name__)


# CREATE A NEW ITEM
@item_routes.route('/new', methods=['POST'])
@login_required
def create_item():
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        item = Item(
            name=form.data['name'],
            category_id=form.data['category_id'],
            supplier_id=form.data['supplier_id'],
            low_stock_at=form.data['low_stock_at'],
            suffix=form.data['suffix'],
            user_id=current_user.id
        )
        db.session.add(item)
        db.session.commit()

        return item.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# READ ALL ITEMS THAT BELONG TO CURRENT USER
@item_routes.route('/')
@login_required
def user_items():
    user_items = Item.query.filter_by(user_id=current_user.id).all()
    return {'items': [item.to_dict() for item in user_items]}


# READ ITEM INFO FROM ITEM ID
@item_routes.route('/<int:item_id>')
@login_required
def one_item(item_id):
    item = Item.query.get(item_id)
    if item:
        if item.user_id == current_user.id:
            return {'item': item.to_dict()}, 200
        else:
            return {'errors': 'Unauthorized to get this item'}, 401
    else:
        return {'errors': 'Item not found'}, 404


# UPDATE AN ITEM BASED ON ITEM ID
@item_routes.route('/<int:item_id>', methods=['PUT', 'PATCH'])
@login_required
def update_item(item_id):
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        item = Item.query.get(item_id)

        if item:
            if item.user_id == current_user.id:
                item.name = form.data['name']
                item.category_id = form.data['category_id']
                item.supplier_id = form.data['supplier_id']
                item.low_stock_at = form.data['low_stock_at']
                item.suffix = form.data['suffix']

                db.session.commit()

                return item.to_dict()
            else:
                return {'errors': 'Unauthorized to update this item'}, 401
        else:
            return {'errors': 'Item not found'}, 404
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# DELETE AN ITEM BASED ON ITEM ID
@item_routes.route('/<int:item_id>', methods=['DELETE'])
@login_required
def delete_item(item_id):
    item = Item.query.get(item_id)

    if item:
        if item.user_id == current_user.id:
            db.session.delete(item)
            db.session.commit()
            return {'message': 'Item deleted successfully'}, 200
        else:
            return {'errors': 'Unauthorized to delete this item'}, 401
    else:
        return {'errors': 'Item not found'}, 404
