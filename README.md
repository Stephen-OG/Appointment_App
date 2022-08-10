# wellnite_project REST API Gateway + microservices

This project contains a REST API gateway with TCP back-end microservices all written using the NestJS Framework and TypeScript.

## Layers

### API Layer

[NestJS + Express](https://nestjs.com/) acts as the API Layer for the architecture. It takes care of listening for client requests and calling the appropriate back-end microservice to fulfill them.

### Microservice Layer

TCP was chosen as the framework to do the microservices.

### Persistence Layer

PostgreSQL is used as the database and TypeORM is used as the Object-Relational Mapper (ORM).

## How to Run

1. System Requirements - must be Linux/Mac
- [Node.js](https://nodejs.org/en/) - v12 Recommended

2. From the Terminal, go into each project's root folder (microservice) and execute `npm install`.

3. Execute `npm start` for each microservice from the terminal 

4. Once the start script is done, the API Gateway will listening on [http://localhost:3000]
