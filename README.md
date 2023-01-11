<h1>NestJS Boilerplate
  <a
    href="http://nestjs.com/"
    target="blank"
  >
    <img
      src="https://nestjs.com/img/logo_text.svg"
      width="65"
      alt="Nest Logo"
    />
  </a>
</h1>

## Description

[NestJS](https://github.com/nestjs/nest) Boilerplate made with ❤️ by [💡HasnainShahzad💡].

## Start Guide

### Outside Docker containers

- Create .env file `cp .env.example .env` and replace existing env variables
  (postgres connection params)
- Install dependencies `npm i`
- Start the app `npm run start:dev` (app will be exposed through the port configured in env file)

### Inside Docker containers

Just run already prepared bash script:
```bash
$ ./init
```
It will setup the project for you (starting docker-compose stack, running migrations).
The NestJS app running in dev mode will be exposed on `http://localhost` (port 80)

For IDE autocompletion to work, run `yarn` on the host machine.

## TypeORM integrated

[TypeORM](http://typeorm.io/) gives you possibility to use next db types:
`mysql`, `postgres`, `mariadb`, `sqlite`, etc. Please look at docs for more details.
The `docker-compose` template uses `postgres`.

**`synchronize: true` shouldn't be used in production - otherwise, you can lose production data.**


## Environment Configuration

Integrated Configuration Module so you can just inject `ConfigService`
and read all environment variables from `.env` file, which is created automatically by the init script from `.env.example`.

## Authentication - JWT

Already preconfigured JWT authentication.
It's suggested to change current password hashing to something more secure.
You can start use already working implementation of `Login` and `Registration`
endpoints.
