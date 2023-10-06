from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models.supplier import db, Supplier
from ..forms.supplier_form import SupplierForm
from .auth_routes import validation_errors_to_error_messages

supplier_routes = Blueprint('suppliers', __name__)


# CREATE A NEW SUPPLIER
@supplier_routes.route('/new', methods=['POST'])
@login_required
def create_supplier():
    form = SupplierForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        supplier = Supplier(
            name=form.data['name'],
            user_id=current_user.id
        )
        db.session.add(supplier)
        db.session.commit()

        return supplier.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# READ ALL SUPPLIERS
@supplier_routes.route('/')
@login_required
def user_suppliers():
    user_suppliers = Supplier.query.filter_by(user_id=current_user.id).all()
    return {'suppliers': [supplier.to_dict() for supplier in user_suppliers]}, 200


# GET SUPPLIER INFO BASED ON SUPPLIER ID (GRABS ALL ITEMS IN SUPPLIERS)
@supplier_routes.route('/<int:supplier_id>')
@login_required
def one_supplier(supplier_id):
    user_supplier = Supplier.query.get(supplier_id)
    if user_supplier:
        if user_supplier.user_id == current_user.id:
            return {'supplier': user_supplier.to_dict()}, 200
        else:
            return {'errors': 'Unauthorized to get this supplier'}, 401
    else:
        return {'errors': 'Supplier not found'}, 404


# UPDAE A SUPPLIER NAME BASED ON SUPPLIER ID
@supplier_routes.route('/<int:supplier_id>', methods=["PUT", "PATCH"])
@login_required
def update_supplier(supplier_id):
    form = SupplierForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        supplier = Supplier.query.get(supplier_id)

        if supplier:
            if supplier.user_id == current_user.id:
                supplier.name = form.data['name']
                db.session.commit()
                return supplier.to_dict(), 200
            else:
                return {'errors': 'Unauthorized to update this supplier'}, 401
        else:
            return {'errors': 'Supplier not found'}, 404
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# DELETE A SUPPLIER FROM SUPPLIER ID
@supplier_routes.route('/<int:supplier_id>', methods=["DELETE"])
@login_required
def delete_supplier(supplier_id):
    supplier = Supplier.query.get(supplier_id)
    if supplier:
        if supplier.user_id == current_user.id:
            db.session.delete(supplier)
            db.session.commit()
            return {'message': 'Supplier deleted successfully'}, 200
        else:
            return {'errors': 'Unauthorized to delete this supplier'}, 401
    else:
        return {'errors': 'Supplier not found'}, 404
