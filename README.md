# News Vaultody API

This is a TypeScript-based Koa application that provides a RESTful API for managing news articles. You can create, delete, search by title, filter by date, and sort by title and date.

## Requirements

- Node.js (version >= 20)
- npm (version >= 8)
- TypeScript (version >= 4)
- Docker (version >= 19.03)
- Docker Compose (version >= 1.25)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tsanim/vaultody-news-api.git
   cd vaultody-news-api

## Install dependencies:

npm install

## Setup

Create a .env file in the root directory with the following variables(There is defaults):

```
ENV MONGO_URI="mongodb://localhost:27017"
ENV MONGO_DB_NAME="vaultody"
ENV MAX_POOL_SIZE=100
ENV PORT=5252
```

Run TypeScript compiler:

```
npm run build
```

## Starting the Application

To start the application in development mode, use:

```
npm run dev
```

To start the application in production mode, first build it and then run:

```
npm start
```

## Endpoints

### Create News Article

**POST** /news

**Body:**

```
{
  "title": "News Title",
  "description": "Optional short description",
  "text": "Full text of the news article."
}
```

### Get News Articles

**GET** /news/filter

**Query Parameters:**

- title (optional): Filter news articles by title.
- startDate (optional): Filter articles published after this date (YYYY-MM-DD).
- endDate (optional): Filter articles published before this date (YYYY-MM-DD).
- sortByTitle (optional): Sort articles by title (asc/desc).
- sortByDate (optional): Sort articles by date (asc/desc).

### Delete News Article

**DELETE** /news/:id

**Path Parameter:**

- id: The ID of the news article to delete.

## Testing

To run the tests, use:

```
npm test
```

## Dockerization

This application comes with a Dockerfile and a docker-compose.yml for easy containerization.

### Building the Docker Image

Build the Docker image:

```
docker build -t news-api .
```

### Running the Docker Container

To run the application with Docker Compose, use:

```
docker-compose up --build
```

This will start the application and a MongoDB instance as defined in docker-compose.yml.

### Stopping the Docker Containers

To stop the running containers, use:

```
docker-compose down
```