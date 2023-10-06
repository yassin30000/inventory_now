from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,
                           onupdate=datetime.utcnow, nullable=False)

    # category to items (one to many)
    items = db.relationship('Item', backref='category', lazy=True)


    # parent = relationship("Parent", backref="children")  # only on the child class



    def to_dict(self):

        category_items = []
        for item in self.items:
            category_items.append(item.to_dict())

        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
            'items': category_items
        }
