# Deckify

- Create deck of links that can be shared as a whole.

## Setup

- Clone the repo to your local machine.
- Install dependencies.
```console
$ npm i
```
- Run the server
```console
node app.js
```
- Create a `.env` file in the root directory with the following values.
```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=''
MYSQL_DB_NAME='deckify'
GITHUB_CLIENT_ID=YOUR_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_CLIENT_SECRET
GITHUB_CLIENT_CALLBACK=http://localhost:1337/authorize/callback
```
- Project would be available on `http://localhost:1337`
- Login using github auth.