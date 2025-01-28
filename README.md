# Project Details:
We need to save changes to patients a1c and blood pressure metrics. Every time we update a patient, if the new blood pressure or a1c value is different we will insert a new record (value and date) into the respective table. Same for the date, if the new a1c date or blood pressure date is different we will insert the new values and dates into the respective table.

# Tasks: 
_Create two modules in NestJs identity: metric-a1c, metric-blood-pressure
_Use postgres trigger we can evaluate new and old after insert.
_When we update patient in the patient table, trigger runs and if necessary it will insert a record into metric-a1c and/or metric-blood-pressure table
_Create a Modal to show trends in the UI

# Prerequisites
* Node.js (v16 or later) and npm installed on your machine
* Git for cloning the repository
* PostgreSQL 

# Technologie used 
* Frontend: Reactjs, Bootstrap
* Backend: Nestjs
* Database: PostgrSql

#  How to Run the Project

### Clone the Repository
### Backend
open new terminal and run :
```bash
cd server
npm install
npm run start:dev
```
create .env file then put this code here  :
```bash
PG_HOST=      // put your database config here 
PG_PORT=
PG_USER=
PG_PASSWORD=
PG_DATABASE=
PORT=3000
```

run the server : 
```bash
npm run start:dev
```
### Frontend
open new terminal and run :
```bash
cd client
npm install
npm run dev
```
