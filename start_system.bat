@echo off
ECHO Starting all services...

REM Start Project 2 Backend (FastAPI)
ECHO Starting Project 2 Backend (FastAPI) on port 8000
cd project2/backend
start cmd /k "python -m pip install -r ../../requirements-project2.txt && python -m uvicorn main:app --reload --port 8000"
cd ../..

REM Start Project 2 Frontend
ECHO Starting Project 2 Frontend on port 5173
cd project2
start cmd /k "npm install && npm run dev"
cd ..

REM Start Project 1 Backend (Flask)
ECHO Starting Project 1 Backend (Flask) on port 5000
cd project1/milkpurchase
start cmd /k "python -m pip install -r ../../requirements-project1.txt && python app.py"
cd ../..

REM Start Project 3 Backend (Node.js)
ECHO Starting Project 3 Backend (Node.js) on port 3001
cd project3/backend
start cmd /k "npm install && npm start"
cd ../..

ECHO All services are starting in new windows.
