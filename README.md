# Artifact1

A minimal Node.js tutorial HTTP server built with the [Express.js](https://expressjs.com/) web framework. It exposes two plain-text endpoints — a baseline `Hello world` route and an additional `Good evening` route — all served from a single entry-point module, [`index.js`](index.js).

## Endpoints

| Method | Path | Response body |
|--------|------|---------------|
| GET | `/` | `Hello world` |
| GET | `/good-evening` | `Good evening` |

## Prerequisites

- **Node.js >= 18** — Express 5 requires Node.js 18 or newer (Node.js 22.x LTS is recommended).
- **npm** — bundled with Node.js; used to install dependencies and run the server.

## Installation

Install the project dependencies from the repository root:

```bash
npm install
```

This resolves and installs `express` (`^5.2.1`) into `node_modules/` and generates `package-lock.json` for reproducible installs.

## Running the server

Start the server with either of the following equivalent commands (`npm start` runs the `start` script defined in `package.json`, which executes `node index.js`):

```bash
npm start
# or
node index.js
```

The server listens on port `3000` by default. To use a different port, set the `PORT` environment variable (the server reads `process.env.PORT || 3000`):

```bash
PORT=8080 npm start
```

## Example requests

With the server running, exercise both endpoints with `curl`:

```bash
curl http://localhost:3000/             # -> Hello world
curl http://localhost:3000/good-evening # -> Good evening
```
