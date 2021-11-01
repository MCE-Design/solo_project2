from app.models import db, Review
import datetime

# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review1 = Review(
        userId=1, businessId=2, rating=1, review='Test Data REVIEW', createdAt=datetime.datetime.now(), updatedAt=datetime.datetime.now())
    review2 = Review(
        userId=2, businessId=3, rating=2, review='THIS IS A REVIEW', createdAt=datetime.datetime.now(), updatedAt=datetime.datetime.now())
    review3 = Review(
        userId=3, businessId=3, rating=5, review='Loremipsum'
        'dolor sit amet, consectetur adipiscing elit. Integer eget lectus'
        'eget neque aliquam feugiat. Nunc luctus placerat lectus, nec condimentum'
        'purus scelerisque sed. Quisque pulvinar mattis purus non accumsan. Etiam'
        'in porttitor felis. Nam suscipit eu nisi at commodo. Curabitur eu turpis'
        'et mi euismod dictum id ut neque. Vestibulum a turpis vitae erat lacinia'
        'lacinia. Proin gravida accumsan elit, eu ullamcorper orci. Sed porttitor'
        'pellentesque tortor sit amet auctor. ', createdAt=datetime.datetime.now(), updatedAt=datetime.datetime.now())

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
