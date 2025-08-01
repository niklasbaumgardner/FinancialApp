"""TransactionCategory cascade delete

Revision ID: 785d955d4fed
Revises: e0e758560446
Create Date: 2025-06-11 21:16:36.202403

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '785d955d4fed'
down_revision = 'e0e758560446'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transaction_category', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('transaction_category_transaction_id_fkey'), type_='foreignkey')
        batch_op.create_foreign_key(None, 'transaction', ['transaction_id'], ['id'], ondelete='CASCADE')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transaction_category', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('transaction_category_transaction_id_fkey'), 'transaction', ['transaction_id'], ['id'])

    # ### end Alembic commands ###
