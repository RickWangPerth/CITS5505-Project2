"""empty message

Revision ID: 0bf2c4338353
Revises: f9cc93c9ac44
Create Date: 2022-05-20 12:19:11.254312

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0bf2c4338353'
down_revision = 'f9cc93c9ac44'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('adminkey', sa.String(length=128), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'adminkey')
    # ### end Alembic commands ###
