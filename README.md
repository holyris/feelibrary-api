

## Description

<!-- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. -->
Feelibrary api (WIP)
## Requirements
[NodeJS](https://nodejs.org/en/download/)

[Docker](https://www.docker.com/get-started) (for local database)

## Setup
To run properly, the project needs a ```.env``` file.

You can copy paste the content of ```.env.example``` to ```.env```.

Install dependencies :
```bash
npm install
```
You will have to setup a local database. See [Database](https://github.com/holyris/feelibrary-api#database)

To have the correct database structure, see [Migration commands](https://github.com/holyris/feelibrary-api#migration-commands)

## Running the app

```bash
npm run start:dev
npm run start:debug
```

## Database
If you don't want to setup a local database, you can install [Docker](https://www.docker.com/get-started).

If you are on Linux, you will have to [install docker-compose](https://docs.docker.com/compose/install/).

to start the database : 
```bash
docker-compose up -d
```
To stop it :
```bash
docker-compose down
```

## Migration commands
```bash
npm run migration:run
npm run migration:revert
```
