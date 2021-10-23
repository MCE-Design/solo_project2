from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', fname='Demo', lname='Man', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', fname='Marnie', lname='Davis',email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', fname='Bobbie', lname='McGee',email='bobbie@aa.io', password='password')
    paw = User(
        username='paw', fname='Paw', lname='Barker',email='paw@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(paw)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
