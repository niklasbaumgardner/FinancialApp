"""Add nullable is_shard to Budget

Revision ID: 978025ae8e69
Revises: 00a267b25d12
Create Date: 2024-01-29 17:23:13.043604

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '978025ae8e69'
down_revision = '00a267b25d12'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('budget', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_shared', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('budget', schema=None) as batch_op:
        batch_op.drop_column('is_shared')

    # ### end Alembic commands ###