# Backend API for Kupi Podari Day (Купи Подари Дай)

If you are looking for the deployed version of the app, please refer to a [separate repository](https://github.com/ivanjsx/kupipodariday-docker-nestjs?tab=readme-ov-file) containing full source code (including frontend) and deployment configuration.

## API Description

Functionality before registration
- Registration and authorization
- Viewing the main page with gifts feed (most recent & popular)

Functionality after registration
- Login with username and password
- Searching for users by username or email
- Adding or editing gifts
- Viewing gift information (your own or someone else’s)
- Viewing themed selections
- Editing profile
- Viewing profiles and wishlists of other users
- Application form for those who wish to contribute to a gift
- Copying a gift to your own profile

## My Role In It

I created the full backend for the project from scratch. You are welcome to check out the commit history to see the progress.

## Technologies Used

- The API is built using **NestJS**, a Node.js framework powered by minimalist **Express.js**.
- The API is connected to a **PostgreSQL** database using **TypeORM**.
- Authentication & authorization are handled using **JWT** tokens.
- **Config Factory** makes it easy to replace the underlying database type and other settings.
- The API includes 5 custom modules to provide a full set of endpoints for all the features listed above.
- **Validation** is handled using **DTOs**
- **Guards** and are used to handle permissions
- **Interceptors** are used to handle logging, errors and sensitive data. 
- **Swagger** is used to document the API.
- The API is protected against **SQL Injections** and **XSS** attacks.
- **Typescript** ensures type safety and code consistency.
