TaskFlow Pro

A Full-Stack Task Management Platform (Trello/Jira Inspired)

TaskFlow Pro is a production-grade task management system designed for teams and individuals to manage workspaces, projects, boards, and tasks with real-time updates, role-based access, and cross-platform support (Web + Mobile).

This repository contains:

Backend API (CodeIgniter 4, MySQL, JWT)

Web Frontend (React)

Mobile App (Flutter)

Database schema & migrations

Docker setup

Testing & deployment guides

Tech Stack

Backend

PHP 8.x

CodeIgniter 4

MySQL 8

JWT Authentication

PHPMailer

Web Frontend

React

Redux Toolkit

Axios

Tailwind CSS

react-beautiful-dnd

Chart.js

Mobile App

Flutter

Provider

SQLite (offline support)

DevOps

Docker

Docker Compose

Project Structure
taskflow-pro/
├── backend/
├── web-frontend/
├── mobile-app/
└── database/

Core Features

Authentication & Users

JWT authentication

Email verification

Password reset

Role-based access (admin, member, viewer)

Workspaces & Projects

Multiple workspaces per user

Projects inside workspaces

Favorites, colors, icons

Boards & Tasks

Kanban boards

Drag & drop tasks

Priority, due dates, assignees

Labels and tags

WIP limits

Collaboration

Threaded comments

File attachments

Activity logs

Member invitations

Dashboard

Task statistics

Filters & search

Upcoming / overdue tasks

Mobile Support

Offline sync

Push notifications

Calendar view

Database

All schemas are in:

/database/schema.sql
/database/sample_data.sql


Tables include: users, workspaces, projects, boards, tasks, labels, task_labels, comments, attachments, activity_logs, user_workspaces.

Backend Setup (CodeIgniter 4)

Requirements

PHP 8+

Composer

MySQL 8+

Installation

cd backend
composer install
cp env .env


Update .env:

database.default.database = taskflow_db
database.default.username = root
database.default.password =

jwt.secret = your_super_secret_key
jwt.expiration = 86400


Create Database

CREATE DATABASE taskflow_db;


Run Migrations

php spark migrate


Start Server

php spark serve


Backend runs at http://localhost:8080

Web Frontend Setup (React)

Requirements

Node.js 18+

Installation

cd web-frontend
npm install
npm start


Runs at http://localhost:3000

Mobile App Setup (Flutter)

Requirements

Flutter 3+

Installation

cd mobile-app
flutter pub get
flutter run

API Endpoints Summary

Auth

POST   /api/register  
POST   /api/login  
POST   /api/refresh-token  
POST   /api/forgot-password  
POST   /api/reset-password  


User

GET    /api/profile  
PUT    /api/profile  
POST   /api/upload-avatar  


Workspaces

GET    /api/workspaces  
POST   /api/workspaces  
GET    /api/workspaces/:id  
PUT    /api/workspaces/:id  
DELETE /api/workspaces/:id  
POST   /api/workspaces/:id/invite  
GET    /api/my-workspaces  


Projects

GET    /api/projects  
POST   /api/projects  
GET    /api/projects/:id  
PUT    /api/projects/:id  
DELETE /api/projects/:id  
GET    /api/workspaces/:id/projects  
POST   /api/projects/:id/favorite  


Tasks

GET    /api/tasks  
POST   /api/tasks  
GET    /api/tasks/:id  
PUT    /api/tasks/:id  
DELETE /api/tasks/:id  
GET    /api/boards/:id/tasks  
POST   /api/tasks/:id/move  
POST   /api/tasks/:id/assign  
POST   /api/tasks/reorder  


Comments & Attachments

GET    /api/tasks/:id/comments  
POST   /api/tasks/:id/comments  
PUT    /api/comments/:id  
DELETE /api/comments/:id  
POST   /api/tasks/:id/attachments  
DELETE /api/attachments/:id  

Docker Setup
docker-compose up --build


Services

MySQL → 3306

Backend → 8080

Frontend → 3000

Testing

Backend

php spark test


Frontend

npm test


Flutter

flutter test

Development Roadmap

Phase 1 – Foundation

Database schema

Auth system

Basic UI

Phase 2 – Core Features

Workspaces, projects, tasks

Drag & drop boards

Mobile task list

Phase 3 – Advanced

Real-time updates

Comments & attachments

Offline sync

Phase 4 – Production

Testing

Dockerization

Documentation

Demo video

Security Notes

JWT protected routes

Input validation everywhere

Bcrypt password hashing

Query builder protection

File upload restrictions

Contribution Guidelines

Use feature branches (feature/auth, feature/tasks)

Write clean, documented code

Commit small and often

Open PR with clear description

License

For educational and portfolio use. Free to modify and extend.TaskFlow Pro

A Full-Stack Task Management Platform (Trello/Jira Inspired)

TaskFlow Pro is a production-grade task management system designed for teams and individuals to manage workspaces, projects, boards, and tasks with real-time updates, role-based access, and cross-platform support (Web + Mobile).

This repository contains:

Backend API (CodeIgniter 4, MySQL, JWT)

Web Frontend (React)

Mobile App (Flutter)

Database schema & migrations

Docker setup

Testing & deployment guides

Tech Stack

Backend

PHP 8.x

CodeIgniter 4

MySQL 8

JWT Authentication

PHPMailer

Web Frontend

React

Redux Toolkit

Axios

Tailwind CSS

react-beautiful-dnd

Chart.js

Mobile App

Flutter

Provider

SQLite (offline support)

DevOps

Docker

Docker Compose

Project Structure
taskflow-pro/
├── backend/
├── web-frontend/
├── mobile-app/
└── database/

Core Features

Authentication & Users

JWT authentication

Email verification

Password reset

Role-based access (admin, member, viewer)

Workspaces & Projects

Multiple workspaces per user

Projects inside workspaces

Favorites, colors, icons

Boards & Tasks

Kanban boards

Drag & drop tasks

Priority, due dates, assignees

Labels and tags

WIP limits

Collaboration

Threaded comments

File attachments

Activity logs

Member invitations

Dashboard

Task statistics

Filters & search

Upcoming / overdue tasks

Mobile Support

Offline sync

Push notifications

Calendar view

Database

All schemas are in:

/database/schema.sql
/database/sample_data.sql


Tables include: users, workspaces, projects, boards, tasks, labels, task_labels, comments, attachments, activity_logs, user_workspaces.

Backend Setup (CodeIgniter 4)

Requirements

PHP 8+

Composer

MySQL 8+

Installation

cd backend
composer install
cp env .env


Update .env:

database.default.database = taskflow_db
database.default.username = root
database.default.password =

jwt.secret = your_super_secret_key
jwt.expiration = 86400


Create Database

CREATE DATABASE taskflow_db;


Run Migrations

php spark migrate


Start Server

php spark serve


Backend runs at http://localhost:8080

Web Frontend Setup (React)

Requirements

Node.js 18+

Installation

cd web-frontend
npm install
npm start


Runs at http://localhost:3000

Mobile App Setup (Flutter)

Requirements

Flutter 3+

Installation

cd mobile-app
flutter pub get
flutter run

API Endpoints Summary

Auth

POST   /api/register  
POST   /api/login  
POST   /api/refresh-token  
POST   /api/forgot-password  
POST   /api/reset-password  


User

GET    /api/profile  
PUT    /api/profile  
POST   /api/upload-avatar  


Workspaces

GET    /api/workspaces  
POST   /api/workspaces  
GET    /api/workspaces/:id  
PUT    /api/workspaces/:id  
DELETE /api/workspaces/:id  
POST   /api/workspaces/:id/invite  
GET    /api/my-workspaces  


Projects

GET    /api/projects  
POST   /api/projects  
GET    /api/projects/:id  
PUT    /api/projects/:id  
DELETE /api/projects/:id  
GET    /api/workspaces/:id/projects  
POST   /api/projects/:id/favorite  


Tasks

GET    /api/tasks  
POST   /api/tasks  
GET    /api/tasks/:id  
PUT    /api/tasks/:id  
DELETE /api/tasks/:id  
GET    /api/boards/:id/tasks  
POST   /api/tasks/:id/move  
POST   /api/tasks/:id/assign  
POST   /api/tasks/reorder  


Comments & Attachments

GET    /api/tasks/:id/comments  
POST   /api/tasks/:id/comments  
PUT    /api/comments/:id  
DELETE /api/comments/:id  
POST   /api/tasks/:id/attachments  
DELETE /api/attachments/:id  

Docker Setup
docker-compose up --build


Services

MySQL → 3306

Backend → 8080

Frontend → 3000

Testing

Backend

php spark test


Frontend

npm test


Flutter

flutter test

Development Roadmap

Phase 1 – Foundation

Database schema

Auth system

Basic UI

Phase 2 – Core Features

Workspaces, projects, tasks

Drag & drop boards

Mobile task list

Phase 3 – Advanced

Real-time updates

Comments & attachments

Offline sync

Phase 4 – Production

Testing

Dockerization

Documentation

Demo video

Security Notes

JWT protected routes

Input validation everywhere

Bcrypt password hashing

Query builder protection

File upload restrictions

Contribution Guidelines

Use feature branches (feature/auth, feature/tasks)

Write clean, documented code

Commit small and often

Open PR with clear description

License

For educational and portfolio use. Free to modify and extend.
