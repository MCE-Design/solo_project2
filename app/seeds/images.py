from app.models import db, Image


# Adds a demo images, you can add other images here if you want
def seed_images():
    image1 = Image(userId=2, imageable_id=1, imageable_type='business', imageUrl='http://www.threepanelsoul.com/comics/2011-05-23-195.png')
    image2 = Image(userId=3, imageable_id=2, imageable_type='business', imageUrl='http://www.threepanelsoul.com/comics/2013-04-15-273.png')
    image3 = Image(userId=2, imageable_id=1, imageable_type='review', imageUrl='http://www.threepanelsoul.com/comics/2015-03-16-362.png')
    image4 = Image(userId=1, imageable_id=2, imageable_type='review', imageUrl='http://www.threepanelsoul.com/comics/2013-12-16-305.png')
    image5 = Image(userId=1, imageable_id=1, imageable_type='user', imageUrl='https://yap-bucket.s3.us-west-1.amazonaws.com/133ae11a6fa74608a8a35f4320c5fbbf.jpg', imageCaption="Just hangin'")

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
