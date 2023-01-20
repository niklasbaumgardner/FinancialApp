"""User.username not nullable

Revision ID: ebd0966e90de
Revises: 94dc440dcdc2
Create Date: 2023-01-20 16:17:35.731963

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ebd0966e90de'
down_revision = '94dc440dcdc2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'username',
               existing_type=sa.VARCHAR(length=60),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'username',
               existing_type=sa.VARCHAR(length=60),
               nullable=True)
    # ### end Alembic commands ###
