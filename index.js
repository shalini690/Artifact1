'use strict';

/**
 * index.js — Express.js tutorial HTTP server (single entry-point module).
 *
 * This is the sole entry point for the "Artifact1" tutorial server. It is run
 * directly via `node index.js` (or `npm start`, which is wired to the same
 * command in package.json). The module is intentionally self-contained: it
 * bootstraps the Express application, registers the route handlers, and binds
 * the HTTP listener — all in one place, consistent with the minimal "tutorial"
 * footprint mandated by the feature plan.
 *
 * Feature requirements delivered by this file:
 *   - R1 (adopt Express): the HTTP server is built on the Express web framework,
 *     imported below as a CommonJS module.
 *   - R3 (preserve baseline): `GET /` responds with exactly `Hello world`.
 *   - R2 (new endpoint):     `GET /good-evening` responds with exactly
 *     `Good evening` — a purely additive route that does not alter the baseline.
 *
 * Design constraints (deliberately observed):
 *   - Single framework: ALL routing flows through the Express `app`. Node's raw
 *     `http` module, Koa, Fastify, etc. are intentionally NOT used.
 *   - Exact payloads: the response bodies are the literal strings `Hello world`
 *     and `Good evening` — no extra punctuation, casing changes, or surrounding
 *     whitespace.
 *   - Minimal footprint: no `express.Router`, controllers, middleware stacks, or
 *     `src/` layering are introduced; everything lives in this one module.
 *   - Module system: CommonJS (`require`). The project does not set
 *     `"type": "module"` in package.json, so ESM `import` syntax is not used.
 *
 * Runtime: Node.js >= 18 (Express 5 requirement); Express ^5.2.1.
 */

// ---------------------------------------------------------------------------
// Bootstrap — adopt the Express framework (R1)
// ---------------------------------------------------------------------------

// CommonJS import of the Express web framework. `express` is declared as a
// runtime dependency (`^5.2.1`) in package.json and resolved from node_modules.
const express = require('express');

// Instantiate the single Express application. Every route handler and the HTTP
// listener below are registered on this one `app` instance.
const app = express();

// ---------------------------------------------------------------------------
// Route handlers — registered on the single Express `app`
// ---------------------------------------------------------------------------

/**
 * GET / — preserved baseline endpoint (R3).
 *
 * Responds with the exact plain-text body `Hello world`. `res.send` sets the
 * Content-Type to `text/html; charset=utf-8` by default and writes the string
 * verbatim, so the body is delivered without any added punctuation, casing
 * change, or surrounding whitespace.
 *
 * @param {import('express').Request}  req - The incoming HTTP request.
 * @param {import('express').Response} res - The outgoing HTTP response.
 */
app.get('/', (req, res) => {
  res.send('Hello world');
});

/**
 * GET /good-evening — new, purely additive endpoint (R2).
 *
 * Responds with the exact plain-text body `Good evening`. This route is layered
 * on top of the existing application without affecting the baseline `GET /`
 * behavior, satisfying the additive ("another endpoint") intent of the request.
 *
 * @param {import('express').Request}  req - The incoming HTTP request.
 * @param {import('express').Response} res - The outgoing HTTP response.
 */
app.get('/good-evening', (req, res) => {
  res.send('Good evening');
});

// ---------------------------------------------------------------------------
// Listener bind
// ---------------------------------------------------------------------------

// Resolve the listening port: honor the PORT environment variable when set
// (e.g., in hosted/PaaS environments), otherwise default to 3000 for local
// tutorial use.
const port = process.env.PORT || 3000;

// Start the HTTP server. The returned server instance is captured so a basic
// error handler can be attached for graceful failure reporting.
const server = app.listen(port, () => {
  // Startup log: confirms the server is listening and on which port. Helpful
  // for tutorial clarity and for verifying a successful boot in any environment.
  console.log(`Server listening on port ${port}`);
});

/**
 * Surface listener-level errors (such as `EADDRINUSE` when the port is already
 * taken, or `EACCES` for privileged ports) with a clear, actionable message,
 * then exit with a non-zero status code so the failure is not silently ignored.
 * This is a single defensive callback — not additional routing or layering —
 * and keeps the server's startup behavior robust without expanding scope.
 */
server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Set the PORT environment variable to choose a different port.`);
  } else {
    console.error('Failed to start HTTP server:', err);
  }
  process.exit(1);
});
