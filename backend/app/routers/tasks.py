from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud
from app.cache import get_cached_tasks, invalidate_tasks_cache, set_cached_tasks
from app.database import get_db
from app.schemas import TaskCreate, TaskOut, TaskUpdate

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("", response_model=list[TaskOut])
def list_tasks(db: Session = Depends(get_db)):
    cached = get_cached_tasks()
    if cached is not None:
        return cached

    tasks = crud.get_tasks(db)
    serialized = [TaskOut.model_validate(t).model_dump(mode="json") for t in tasks]
    set_cached_tasks(serialized)
    return serialized


@router.post("", response_model=TaskOut, status_code=201)
def create_task(data: TaskCreate, db: Session = Depends(get_db)):
    task = crud.create_task(db, data)
    invalidate_tasks_cache()
    return task


@router.put("/{task_id}", response_model=TaskOut)
def update_task(task_id: int, data: TaskUpdate, db: Session = Depends(get_db)):
    task = crud.update_task(db, task_id, data)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    invalidate_tasks_cache()
    return task


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    if not crud.delete_task(db, task_id):
        raise HTTPException(status_code=404, detail="Task not found")
    invalidate_tasks_cache()
