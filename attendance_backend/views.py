from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import date
from typing import List
from .database import database
from .models import attendance

app = FastAPI(title="Attendance App API")

# -----------------------------
# Pydantic model
# -----------------------------
class Attendance(BaseModel):
    user_id: int
    date: date
    status: str

# -----------------------------
# Connect/disconnect DB
# -----------------------------
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# -----------------------------
# Endpoints
# -----------------------------
@app.post("/attendance/")
async def mark_attendance(record: Attendance):
    # Check if user already has a record for this date
    query = attendance.select().where(
        (attendance.c.user_id == record.user_id) & (attendance.c.date == record.date)
    )
    existing = await database.fetch_one(query)
    if existing:
        raise HTTPException(status_code=400, detail="Attendance already marked for today")
    
    insert_query = attendance.insert().values(
        user_id=record.user_id,
        date=record.date,
        status=record.status
    )
    await database.execute(insert_query)
    return {"message": "Attendance marked successfully", "record": record}

@app.get("/attendance/{user_id}", response_model=List[Attendance])
async def get_attendance(user_id: int):
    query = attendance.select().where(attendance.c.user_id == user_id)
    results = await database.fetch_all(query)
    if not results:
        raise HTTPException(status_code=404, detail="No attendance found for this user")
    return results
