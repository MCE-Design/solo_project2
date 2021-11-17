"""empty message

Revision ID: aa823dc09a4f
Revises: 892f2a7d342e
Create Date: 2021-11-16 22:04:08.544376

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aa823dc09a4f'
down_revision = '892f2a7d342e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('nickname', sa.String(length=50), nullable=True))
    op.add_column('users', sa.Column('headline', sa.String(length=100), nullable=True))
    op.add_column('users', sa.Column('findme', sa.String(length=80), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'findme')
    op.drop_column('users', 'headline')
    op.drop_column('users', 'nickname')
    # ### end Alembic commands ###
