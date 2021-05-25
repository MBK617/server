# MBK617 - server
<a href="https://codeclimate.com/github/MBK617/server/maintainability"><img src="https://api.codeclimate.com/v1/badges/4ab70749ba56f0c6bb9a/maintainability" /></a>
## Requirements for Development
* Node.js LTS release or greater

## Available NPM Scripts
* `npm start` : Starts development environment using nodemon. When you save files in the source folder, the server will automatically restart to incorporate new changes.
* `npm install` : Installs dependencies outlined in `package.json`.

## Environment Variables
You will need to create a .env file in the root directory with the following values:
```js
// This is the address your database is hosted at. If you're 
// hosting a database locally for development, it will be localhost.
DB_HOST = localhost

// This is the port that your database is hosted on. MongoDB 
// defaults to use 27017.
DB_PORT = 27017

// This is the name of your primary database.
DATABASE = *database name*

// This is the username for accessing the above database.
DB_USER = *database username here*


// This is the username for accessing the above database.
DB_PASS = *database password here*

// This is the secret key used in security protocols. Any string 
// of characters will do, but we recommend generating something random. 
SECRET = *random string*

// Optional. This is the port that the server will be locally hosted 
// from. If not provided, will default to 8080.
PORT = 8181
```

## Getting Started
* Ensure that your database is accessible from the specified host and port in your .env file. This may mean starting up a local mongo session, or tunneling into the development server with the database port fowarded to your local machine.
  * If tunnelling into a remote database, you can use `ssh -L 27017:localhost:27017 {SYSTEM_USERNAME}@{DATABASE_MACHINE_ADDRESS}` in a Unix based terminal.
  * You can use PuTTY to accomplish the same thing by setting up your SSH connection to the machine, then navigating to Connection -> SSH -> Tunnels and adding a local tunnel from port 27017 (or a custom port) to localhost:27017.
* If you are starting the server for the first time or have pulled new changes since running it last, install any new dependencies. 
  * Run `npm install` in the root directory of this repository.
* Run `npm start` in the root directory of this repository.
