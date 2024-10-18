"""Add transaction_id, category_id unique constraint for TransactionCategory

Revision ID: ff117ff70158
Revises: 4d090eb1e8cb
Create Date: 2024-09-06 23:00:07.876862

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ff117ff70158'
down_revision = '4d090eb1e8cb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transaction_category', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['transaction_id', 'category_id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transaction_category', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    # ### end Alembic commands ###