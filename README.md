# MBK617 - server
## Requirements for Development
* Node.js LTS release or greater

## Available NPM Scripts
* `npm start` : Starts development environment using nodemon. When you save files in the source folder, the server will automatically restart to incorporate new changes.
* `npm install` : Installs dependencies outlined in `package.json`.

## Environment Variables
You will need to create a .env file in the root directory with the following values:
```js
// This is the address your database is hosted at. It expects a mongodb url.
DB_HOST = *cluster*.mongodb.net

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
* Ensure that your database is accessible from the specified host in your .env file. Create your own mongo cluster or contact Abby for the official dev connection info.
* If you are starting the server for the first time or have pulled new changes since running it last, install any new dependencies. 
  * Run `npm install` in the root directory of this repository.
* Run `npm start` in the root directory of this repository.
