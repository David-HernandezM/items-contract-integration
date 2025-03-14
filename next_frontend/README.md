# Tourii nextjs frontend

The frontend contains a `.env` file, where you can find the nest base url and the next auth secret.

To install all dependencies, use:

```bash
pnpm i
```

To run in development mode, use the next command:

```bash
pnpm run dev
```

## Frontend structure

- Middleware file (`src/middleware.ts`): The project contains a middleware to protect the routes that needs the user to log in first.
- Api (`src/app/api`): Contains the next auth configuration (with JWT support and user and password).
- Examples (`src/app/examples`): contains the page with the examples, it contains the calls to the keyring and tourii services (components).
- lib (`src/app/lib`): Contains the server actions (actions, some of the calls are in the components), constants, data, next auth definitions, etc.
- shared (`src/app/shared`): contains components that all components use.
- signup (`src/app/signup`): Contains the page to sign up a new user
- ui (`src/app/ui`): contains the components from the pages.
- user (`src/app/user`): contains the page where the user can see their info.