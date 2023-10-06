from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models.inventory_sheet import db, InventorySheet
from app.models.item import Item
from app.models.inventory_item import InventoryItem
from .auth_routes import validation_errors_to_error_messages
from ..forms.inventory_item_form import InventoryItemForm

inventory_sheets_routes = Blueprint('inventory_sheets', __name__)


# CREATE INVENTORY SHEET
@inventory_sheets_routes.route('/new', methods=['POST'])
@login_required
def create_inventory_sheet():
    # Create a new inventory sheet
    inventory_sheet = InventorySheet(user_id=current_user.id)
    db.session.add(inventory_sheet)
    db.session.commit()

    # Fetch the user's inventory items
    user_items = Item.query.filter_by(user_id=current_user.id).all()

    # Create new inventory items with a quantity of 0 for the inventory sheet
    for item in user_items:
        inventory_item = InventoryItem(
            inventory_sheet_id=inventory_sheet.id,
            item_id=item.id,
            quantity=0  # Initialize quantity to 0
        )
        db.session.add(inventory_item)

    db.session.commit()

    return jsonify({'message': 'Inventory sheet created successfully', 'inventory_sheet_id': inventory_sheet.id}), 201


# READ INVENTORY SHEET INFO FROM INVETORY_SHEET_ID
@inventory_sheets_routes.route('/<int:inventory_sheet_id>')
@login_required
def one_inventory_sheet(inventory_sheet_id):
    inventory_sheet = InventorySheet.query.get(inventory_sheet_id)
    if inventory_sheet:
        if inventory_sheet.user_id == current_user.id:
            return inventory_sheet.to_dict(), 200
        else:
            return {'errors': 'Unauthorized to view inventory sheet'}, 401
    else:
        return {'errors': 'Inventory Sheet not found'}, 400


# READ ALL INVENTORY SHEETS BY CURRENT USER
@inventory_sheets_routes.route('/')
@login_required
def all_inventory_sheets():
    inventory_sheets = InventorySheet.query.filter_by(
        user_id=current_user.id).all()
    return {'inventory_sheets': [sheet.to_dict() for sheet in inventory_sheets]}


# UPDATE INVENTORY SHEET FROM SHEET ID
@inventory_sheets_routes.route('/<int:inventory_sheet_id>', methods=["PUT", "PATCH"])
@login_required
def update_inventory_sheet(inventory_sheet_id):
    pass


# DELETE INVENTORY SHEET FROM SHEET ID
@inventory_sheets_routes.route('/<int:inventory_sheet_id>', methods=["DELETE"])
@login_required
def delete_inventory_sheet(inventory_sheet_id):
    sheet = InventorySheet.query.get(inventory_sheet_id)
    if sheet:
        if sheet.user_id == current_user.id:
            db.session.delete(sheet)
            db.session.commit()
            return {'message': 'Inventory Sheet deleted successfully'}, 200
        else:
            return {'errors': 'Unauthorized to delete this inventory sheet'}, 401
    else:
        return {'errors': 'Inventory Sheet not found'}, 404
