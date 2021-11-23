from app.models import db, Image


# Adds a demo images, you can add other images here if you want
def seed_images():
    image1 = Image(userId=2, imageable_id=1, imageable_type='business', imageUrl='https://yap-bucket.s3.us-west-1.amazonaws.com/be6f0d96dff54c32b7a3a61dfe30c424.jpg')
    image2 = Image(userId=3, imageable_id=2, imageable_type='business', imageUrl='https://yap-bucket.s3.us-west-1.amazonaws.com/687fc9c425ad4f4185370715c54b7f16.jpg')
    image3 = Image(userId=2, imageable_id=1, imageable_type='review', imageUrl='https://yap-bucket.s3.us-west-1.amazonaws.com/bb77393ea08441e2bdff58c693df13ff.png')
    image4 = Image(userId=1, imageable_id=2, imageable_type='review', imageUrl='https://yap-bucket.s3.us-west-1.amazonaws.com/b06e2e0e81e14418846e2d4e845fefe7.jpg')
    image5 = Image(userId=1, imageable_id=1, imageable_type='user', imageUrl='https://yap-bucket.s3.us-west-1.amazonaws.com/c69b2f330aa54937adc60fecf2f732b0.jpg', imageCaption="Just hangin'")

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
