@echo off
ECHO Starting only the Project 2 Backend (FastAPI) for debugging...

REM Start Project 2 Backend (FastAPI)
ECHO Starting Project 2 Backend (FastAPI) on port 8000
cd project2/backend
start cmd /k "python -m pip install -r ../../requirements-project2.txt && python -m uvicorn main:app --reload --port 8000"
cd ../..

ECHO The service is starting in a new window. Check that window for errors.
pause
