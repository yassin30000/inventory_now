from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.category import Category 


# Adds a demo user, you can add other users here if you want
# Adds 5 demo items
def seed_categories():
    categories_to_add = [
        {
            'name': 'Category 1',
            'user_id': 1
        },
        {
            'name': 'Category 2',
            'user_id': 1
        },
        {
            'name': 'Category 3',
            'user_id': 1
        },
        {
            'name': 'Category 4',
            'user_id': 1
        },
        {
            'name': 'Category 5',
            'user_id': 1
        }
    ]

    for category_data in categories_to_add:
        category = Category(**category_data)
        db.session.add(category)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_categories():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
