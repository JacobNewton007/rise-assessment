# template

## Database Migrations

We use db-migrate tool which loads a SQL file to handle creating/editing our db.
Please reference the [db-migrate docs](https://github.com/db-migrate/node-db-migrate).
The only difference is that you have to run it via npm script, as `npm run migrations -- <command arguments for db-migrate>`.

Example `npm run migrations -- create anothermigration --sql-file`