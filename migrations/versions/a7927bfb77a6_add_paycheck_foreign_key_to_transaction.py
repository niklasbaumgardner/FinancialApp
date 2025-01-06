"""Add Paycheck foreign key to Transaction

Revision ID: a7927bfb77a6
Revises: f69e0dcbeb12
Create Date: 2024-11-19 13:20:53.087481

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a7927bfb77a6'
down_revision = 'f69e0dcbeb12'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transaction', schema=None) as batch_op:
        batch_op.add_column(sa.Column('paycheck_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'paycheck', ['paycheck_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transaction', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('paycheck_id')

    # ### end Alembic commands ###