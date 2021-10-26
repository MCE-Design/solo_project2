"""empty message

Revision ID: 892f2a7d342e
Revises: 8cfbd5946498
Create Date: 2021-10-26 10:52:48.088906

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import sessionmaker

Session = sessionmaker()

# revision identifiers, used by Alembic.
revision = '892f2a7d342e'
down_revision = '8cfbd5946498'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('avatar', sa.String(length=2000), nullable=True),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('fname', sa.String(length=40), nullable=False),
    sa.Column('lname', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('businesses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.Column('address1', sa.String(length=64), nullable=True),
    sa.Column('address2', sa.String(length=64), nullable=True),
    sa.Column('address3', sa.String(length=64), nullable=True),
    sa.Column('city', sa.String(length=64), nullable=False),
    sa.Column('state', sa.String(length=3), nullable=False),
    sa.Column('country', sa.String(length=2), nullable=False),
    sa.Column('zipcode', sa.String(length=12), nullable=False),
    sa.Column('lat', sa.Numeric(precision=9, scale=7), nullable=False),
    sa.Column('lng', sa.Numeric(precision=10, scale=7), nullable=False),
    sa.Column('phone', sa.String(length=32), nullable=True),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('imageable_id', sa.Integer(), nullable=False),
    sa.Column('imageable_type', postgresql.ENUM('user', 'business', 'review', name='imageable_types'), nullable=False),
    sa.Column('imageUrl', sa.String(length=1000), nullable=False),
    sa.Column('imageCaption', sa.String(length=1000), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('businessId', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(length=5000), nullable=False),
    sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['businessId'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('images')
    bind = op.get_bind()
    session = Session(bind=bind)
    session.execute('DROP TYPE imageable_types')
    op.drop_table('reviews')
    op.drop_table('businesses')
    op.drop_table('users')
    # ### end Alembic commands ###
