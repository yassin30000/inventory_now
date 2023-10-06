from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # user to inventory sheet (one to many)
    inventory_sheets = db.relationship('InventorySheet', backref='user', lazy=True)
    items = db.relationship('Item', backref='user', lazy=True)
    suppliers = db.relationship('Supplier', backref='user', lazy=True)
    categories = db.relationship('Category', backref='user', lazy=True)
    # children = relationship("Child", backref="parent")  # only on the parent class


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):

        user_inventory_sheets = []
        for sheet in self.inventory_sheets:
            user_inventory_sheets.append(sheet.to_dict())

        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'inventory_sheets': user_inventory_sheets
        }
