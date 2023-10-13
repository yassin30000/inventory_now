from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Item(db.Model):
    __tablename__ = 'items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), nullable=True)
    supplier_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('suppliers.id')), nullable=True)
    active = db.Column(db.Boolean, nullable=False)

    name = db.Column(db.String(40), nullable=False)
    low_stock_at = db.Column(db.Integer, nullable=False)
    suffix = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,
                           onupdate=datetime.utcnow, nullable=False)
    

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'active': self.active,
            'name': self.name,
            'category_id': self.category_id,
            'supplier_id': self.supplier_id,
            'low_stock_at': self.low_stock_at,
            'suffix': self.suffix,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S')
        }
