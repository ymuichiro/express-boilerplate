# express-boilerplate

`express-boilerplate` is a highly flexible Express boilerplate that integrates essential database connectivity, authentication, and OpenAPI validation. It incorporates a lightweight logger using pino and adopts Prisma as a type-safe ORM.

## Getting Started

1. Install dependencies:

    ```bash
    npm install
    ```

2. Configure ORM and OpenAPI:

    ```bash
    npm run prisma
    npm run openapi
    ```

3. Start the server:

    ```bash
    npm run start
    ```

## Authentication

This server is designed to be deployed behind a trusted authentication proxy. It expects to receive JWTs as Bearer tokens from the authentication proxy for authentication purposes.

## Contribution

We welcome contributions! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure the code follows the project's coding standards.
4. Test your changes thoroughly.
5. Submit a pull request, describing the changes and any considerations for reviewers.

Let's build and improve `express-boilerplate` together!