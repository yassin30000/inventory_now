from .db import db, environment, SCHEMA
from datetime import datetime

class Supplier(db.Model):
    __tablename__ = 'suppliers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


    # supplier to item (one to many)
    items = db.relationship('Item', backref='supplier', lazy=True)


    def to_dict(self):

        supplier_items = []
        for item in self.items:
            supplier_items.append(item.to_dict())
        
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            'items': supplier_items
        }
