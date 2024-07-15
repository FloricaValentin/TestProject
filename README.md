This project is a full-stack application demonstrating a basic backend API using Node.js with NestJS in TypeScript, connected to a PostgreSQL database using Prisma . The frontend is built using React with @vite, Redux Tool Kit for state management.

Project Setup 

Backend:
Navigate to server folder and install dependencies using : npm install

Create a .env file and add

DATABASE_URL="postgresql://username:password@localhost:5432/invoicedb?schema=public"  (With your configuration)

Run the server using: npm run start:dev
In case you get errors on prisma generate run this command npx prisma generate --schema=src/prisma/schema.prisma (This error is due to schema.prisma location)

API Endpoints:

● POST /auth/login: Authenticate a user and return an authentication token

● GET /invoices: Retrieve all invoices

● GET /invoices/:id: Retrieve details of a specific invoice for modal display.

Frontend : 

Navigate to server folder and install dependencies using : npm install

Run the front end part using : npm run dev

