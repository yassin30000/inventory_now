from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.supplier import Supplier 


# Adds a demo user, you can add other users here if you want
# Adds 5 demo items
def seed_suppliers():
    suppliers_to_add = [
        {
            'name': 'Supplier 1',
        },
        {
            'name': 'Supplier 2',
        },
        {
            'name': 'Supplier 3',
        },
        {
            'name': 'Supplier 4',
        },
        {
            'name': 'Supplier 5',
        }
    ]

    for supplier_data in suppliers_to_add:
        supplier = Supplier(**supplier_data)
        db.session.add(supplier)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_suppliers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.suppliers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM suppliers"))

    db.session.commit()
