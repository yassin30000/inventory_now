from .db import db, environment, SCHEMA
from datetime import datetime


class InventoryItem(db.Model):
    __tablename__ = 'inventory_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    inventory_sheet_id = db.Column(db.Integer, db.ForeignKey('inventory_sheets.id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,
                           onupdate=datetime.utcnow, nullable=False)
    
    # inventory item to item (many to one)
    item = db.relationship('Item', backref='inventory_items', lazy=True)


    def to_dict(self):
        return {
            'id': self.id,
            'inventory_sheet_id': self.inventory_sheet_id,
            'item_id': self.item_id,
            'quantity': self.quantity,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            'item': self.item.to_dict()
        }
