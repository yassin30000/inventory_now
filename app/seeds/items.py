from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.item import Item


# Adds a demo user, you can add other users here if you want
# Adds 5 demo items
def seed_items():
    items_to_add = [
        {
            'name': 'Item 1',
            'user_id': 1,
            'category_id': 1,
            'supplier_id': 1,
            'low_stock_at': 5,
            'suffix': 'bags',
            'active': True
        },
        {
            'name': 'Item 2',
            'user_id': 1,
            'category_id': 2,
            'supplier_id': 2,
            'low_stock_at': 10,
            'suffix': 'bags',
            'active': True

        },
        {
            'name': 'Item 3',
            'user_id': 1,
            'category_id': 3,
            'supplier_id': 3,
            'low_stock_at': 3,
            'suffix': 'containers',
            'active': True

        },
        {
            'name': 'Item 4',
            'user_id': 1,
            'category_id': 4,
            'supplier_id': 4,
            'low_stock_at': 7,
            'suffix': 'containers',
            'active': True

        },
        {
            'name': 'Item 5',
            'user_id': 1,
            'category_id': 5,
            'supplier_id': 5,
            'low_stock_at': 6,
            'suffix': 'containers',
            'active': True

        }
    ]

    for item_data in items_to_add:
        item = Item(**item_data)
        db.session.add(item)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
