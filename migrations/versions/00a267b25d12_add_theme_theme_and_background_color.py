"""Add Theme theme and background color

Revision ID: 00a267b25d12
Revises: 5a7a53b13ab3
Create Date: 2024-01-04 20:05:06.954597

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '00a267b25d12'
down_revision = '5a7a53b13ab3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('theme', schema=None) as batch_op:
        batch_op.add_column(sa.Column('theme', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('backgroundColor', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('theme', schema=None) as batch_op:
        batch_op.drop_column('backgroundColor')
        batch_op.drop_column('theme')

    # ### end Alembic commands ###
