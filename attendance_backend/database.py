from databases import Database
from sqlalchemy import MetaData, create_engine

# Replace values with your PostgreSQL credentials
DATABASE_URL = "postgresql://postgres:skaiwel@localhost:5432/attendance_OJT"

# Async database connection
database = Database(DATABASE_URL)

# SQLAlchemy metadata
metadata = MetaData()

# Engine for creating tables
engine = create_engine(DATABASE_URL)
