from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class InventorySheet(db.Model):
    __tablename__ = 'inventory_sheets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,
                           onupdate=datetime.utcnow, nullable=False)

    inventory_items = db.relationship(
        'InventoryItem', backref='inventory_sheet', lazy=True, cascade='all, delete-orphan')
    # children = relationship("Child", backref="parent")  # only on the parent class

    def to_dict(self):

        inventory_items = []
        for item in self.inventory_items:
            inventory_items.append(item.to_dict())

        return {
            'id': self.id,
            'user_id': self.user_id,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            'inventory_items': inventory_items
        }
