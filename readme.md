# JSarks

A simple Bookmark Manager made with NodeJS + ReactJS + MongoDB + Docker.

## How to Run

This project is composed of two subprojects the backend and the frontend.

### With Docker (the cool way)

You can run this project using docker simply running,

```sh
docker-compose up
```

on the root of this project. After the setup the application will be available on:

BACKEND : http://localhost:3000/
FRONTEND: http://localhost:8080/

### Locally

Alternativally you can also run this project directly on your host. Simply run:

```sh
npm install; npm start
```

on each of the subproject. You will also need to run a MongoDB instance on `http://localhost:3763`.
