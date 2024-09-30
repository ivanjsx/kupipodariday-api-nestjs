# Backend API for Kupi Podari Day

## See It In Action

If you're looking for the deployed version of the app, please refer to a [separate repository](https://github.com/ivanjsx/kupipodariday-docker-nestjs), which contains the full source code (including frontend) and deployment configuration.

## API Description

**Functionality before registration:**
- User registration and authorization
- Viewing the main page with a feed of gifts (most recent & popular)

**Functionality after registration:**
- Logging in with username and password
- Searching for users by username or email
- Adding or editing gifts
- Viewing gift details (your own or others’)
- Viewing themed gift selections
- Editing profile information
- Viewing other users' profiles and wishlists
- Submitting applications to contribute to a gift
- Copying gifts to your own profile

## My Role In It

I created the entire backend for the project from scratch. You are welcome to explore the commit history to track the development progress.

## Technologies Used

- The API is built using **NestJS**, a robust Node.js framework powered by minimalist **Express.js**.
- The API connects to a **PostgreSQL** database via **TypeORM**.
- Authentication and authorization are managed using **JWT** tokens.
- **Config Factory** simplifies the replacement of underlying database types and other settings.
- The API includes 5 custom modules that provide endpoints for all the listed features.
- **DTOs** are used for request validation.
- **Guards** manage user permissions.
- **Interceptors** handle logging, error management, and sensitive data processing.
- **Swagger** is used for API documentation.
- The API is protected against **SQL Injections** and **XSS** attacks.
- **TypeScript** ensures type safety and consistency throughout the codebase.