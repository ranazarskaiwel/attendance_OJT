from databases import Database
from sqlalchemy import create_engine, MetaData

# Make sure this points to your attendance_db
DATABASE_URL = "postgresql://postgres:skaiwel@localhost:5432/attendance_db"

database = Database(DATABASE_URL)
metadata = MetaData()
engine = create_engine(DATABASE_URL)
