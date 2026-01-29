from sqlalchemy import Table, Column, Integer, String, Date
from .database import metadata, engine

attendance = Table(
    "attendance",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("user_id", Integer, nullable=False),
    Column("date", Date, nullable=False),
    Column("status", String, nullable=False)
)

# This line actually creates the table in the database
metadata.create_all(engine)
