"""create books

Revision ID: 56690d8a0a53
Revises: d37d8a32051e
Create Date: 2022-02-13 18:43:51.168417

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '56690d8a0a53'
down_revision = 'd37d8a32051e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('books',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=150), nullable=False),
    sa.Column('author', sa.String(length=150), nullable=False),
    sa.Column('synopsis', sa.Text(), nullable=True),
    sa.Column('image_url', sa.Text(), nullable=False),
    sa.Column('isbn13', sa.String(length=13), nullable=True),
    sa.Column('original_title', sa.String(length=150), nullable=True),
    sa.Column('language', sa.String(length=50), nullable=False),
    sa.Column('publication_year', sa.Integer(), nullable=True),
    sa.Column('pages', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('books')
    # ### end Alembic commands ###
