from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models.inventory_sheet import db, InventorySheet
from app.models.item import Item
from app.models.inventory_item import InventoryItem
from .auth_routes import validation_errors_to_error_messages
from ..forms.inventory_item_form import InventoryItemForm

inventory_items_routes = Blueprint('inventory_items', __name__)


# UPDATE INVENTORY ITEM
@inventory_items_routes.route('/<int:inventory_item_id>/<int:inventory_sheet_id>', methods=['PUT', 'PATCH'])
@login_required
def update_inventory_item(inventory_item_id, inventory_sheet_id):

    form = InventoryItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        inventory_item = InventoryItem.query.get(inventory_item_id)

        if inventory_item:
            if inventory_item.inventory_sheet_id == inventory_sheet_id:
                inventory_item.quantity = form.data['quantity']
                db.session.commit()
                return inventory_item.to_dict()
            else:
                return {'errors': 'Inventory item does not belong to this sheet'}
        else:
            return {'errors': 'Inventory item not found'}, 404

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
