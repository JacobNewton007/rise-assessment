# Template

## Database Migrations

We utilize the `db-migrate` tool, which loads SQL files to facilitate the creation and editing of our database. For detailed information, please consult the [db-migrate documentation](https://github.com/db-migrate/node-db-migrate). The only difference is that you need to execute it via an npm script, using `npm run migrations -- <command arguments for db-migrate>`.

### Running the Application

To run the application locally:
1. npm install dependencies
   
  ### Migrate the database:
  ```bash
  npm run migrate:up

  ### Start the application in development mode:
   ```bash
   npm run dev

   ### Testing
   ```bash
  npm run test

  ### Docker
  ```bash
  docker build -t app-name .
  docker run -p port:port -d app-name

  ### Database

  ```bash
  npm run migrations -- create migration-name --sql-file



 