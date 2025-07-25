"""Add Theme.background_color

Revision ID: ddec5cb29a77
Revises: 1f66f5e8d152
Create Date: 2025-06-17 11:34:33.757850

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ddec5cb29a77'
down_revision = '1f66f5e8d152'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('theme', schema=None) as batch_op:
        batch_op.add_column(sa.Column('background_color', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('theme', schema=None) as batch_op:
        batch_op.drop_column('background_color')

    # ### end Alembic commands ###
