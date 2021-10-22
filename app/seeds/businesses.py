from app.models import db, Business

# Adds a demo user, you can add other users here if you want
def seed_businesses():
    bettaTesters = Business(
        name='Betta Testers',
        ownerId=1,
        address1='1234 Carp Parkway',
        address2='Building 5',
        address3='Unit 404',
        city='San Francisco',
        state='CA',
        country='US',
        zipcode='94005',
        lat=37.690513,
        lng=-122.309315,
        phone='1-800-555-1234',
        price='3',
    )
    catTracks = Business(
        name='Cat Tracks',
        ownerId=2,
        address1='567 Puma Ave',
        address2='',
        address3='',
        city='Los Gatos',
        state='CA',
        country='US',
        zipcode='9406',
        lat=37.221722,
        lng=-121.982666,
        phone='1-800-555-1234',
        price='3',
    )
    dingDongDoorbell = Business(
        name='Ding Dong Doorbell',
        ownerId=4,
        address1='345 Barker Way',
        address2='House 5',
        address3='Unit 6',
        city='Pawston',
        state='MA',
        country='US',
        zipcode='02113',
        lat=42.365478,
        lng=-71.055321,
        phone='1-800-555-5678',
        price='2',
    )

    db.session.add(bettaTesters)
    db.session.add(catTracks)
    db.session.add(dingDongDoorbell)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
