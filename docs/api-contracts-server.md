# API Contracts - Server

## Overview

The Express server exposes RESTful API endpoints under the `/api/` prefix. All endpoints return JSON responses and support CORS for cross-origin requests.

## Base Configuration

- **Base URL (Development):** `http://localhost:8080/api`
- **Base URL (Production):** `{server_url}/api`
- **Content-Type:** `application/json`
- **CORS:** Enabled for all origins (development)

## Middleware Stack

```typescript
1. cors() - Cross-origin resource sharing
2. express.json() - JSON body parsing
3. express.urlencoded({ extended: true }) - URL-encoded body parsing
```

---

## API Endpoints

### GET /api/ping

**Description:** Health check endpoint that returns a configurable ping message.

**Request:**
- **Method:** GET
- **Path:** `/api/ping`
- **Headers:** None required
- **Query Parameters:** None
- **Body:** None

**Response:**
```typescript
{
  message: string  // Value from PING_MESSAGE env var or "ping"
}
```

**Status Codes:**
- `200 OK` - Successful response

**Example Request:**
```bash
curl http://localhost:8080/api/ping
```

**Example Response:**
```json
{
  "message": "ping pong"
}
```

**Implementation:**
- **Location:** `server/index.ts:15-18`
- **Handler:** Inline arrow function
- **Environment Variable:** `PING_MESSAGE` (optional, defaults to "ping")

---

### GET /api/demo

**Description:** Demo endpoint demonstrating typed response with shared interface.

**Request:**
- **Method:** GET
- **Path:** `/api/demo`
- **Headers:** None required
- **Query Parameters:** None
- **Body:** None

**Response:**
```typescript
interface DemoResponse {
  message: string
}
```

**Status Codes:**
- `200 OK` - Successful response

**Example Request:**
```bash
curl http://localhost:8080/api/demo
```

**Example Response:**
```json
{
  "message": "Hello from Express server"
}
```

**Implementation:**
- **Location:** `server/routes/demo.ts`
- **Handler:** `handleDemo`
- **Type Contract:** `DemoResponse` from `@shared/api`
- **Registered:** `server/index.ts:20`

---

## Type Safety

### Shared Type Contracts

The server uses TypeScript interfaces defined in `shared/api.ts` to ensure type safety between client and server.

**Example:**
```typescript
// shared/api.ts
export interface DemoResponse {
  message: string;
}

// server/routes/demo.ts
import { DemoResponse } from "@shared/api";

export const handleDemo: RequestHandler = (req, res) => {
  const response: DemoResponse = {
    message: "Hello from Express server",
  };
  res.status(200).json(response);
};
```

**Benefits:**
- Compile-time type checking
- Refactoring safety
- Self-documenting API contracts
- IDE autocomplete for client requests

---

## Error Handling

Currently, the API implements basic error handling through Express defaults:
- **404 Not Found:** Returned for undefined routes
- **500 Internal Server Error:** Returned for uncaught exceptions

**Note:** Custom error handling middleware not yet implemented.

---

## Authentication & Authorization

**Status:** Not implemented

The current API endpoints are public and do not require authentication.

---

## Request Validation

### Zod Schema Validation

The project includes Zod (`^3.25.76`) for runtime validation, though validation middleware is not yet implemented in the current endpoints.

**Recommended Pattern:**
```typescript
import { z } from 'zod';

const requestSchema = z.object({
  field: z.string()
});

app.post('/api/resource', (req, res) => {
  const validated = requestSchema.parse(req.body);
  // ... handle request
});
```

---

## Response Format

All API endpoints return JSON with consistent structure:

**Success Response:**
```json
{
  // Response data fields
}
```

**Error Response (Standard Express):**
```json
{
  "message": "Error description"
}
```

---

## API Expansion Guide

### Adding a New Endpoint

1. **Create Route Handler** (e.g., `server/routes/my-route.ts`):
```typescript
import { RequestHandler } from "express";
import { MyResponse } from "@shared/api";

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyResponse = {
    // ... response data
  };
  res.json(response);
};
```

2. **Define Shared Interface** (`shared/api.ts`):
```typescript
export interface MyResponse {
  field: string;
}
```

3. **Register Route** (`server/index.ts`):
```typescript
import { handleMyRoute } from "./routes/my-route";

app.get("/api/my-endpoint", handleMyRoute);
```

---

## Development vs Production

### Development
- **Integration:** Express runs as Vite middleware
- **Port:** 8080 (shared with Vite dev server)
- **Hot Reload:** Server code changes trigger restart

### Production
- **Standalone:** Express server serves both API and static files
- **Port:** Configurable (default from hosting provider)
- **Static Files:** Served from `dist/spa/`

---

## Deployment Considerations

### Netlify Functions
The project is configured for Netlify serverless deployment:
- **Function:** `netlify/functions/api.ts` wraps Express app
- **Redirects:** `/api/*` routes to `/.netlify/functions/api/:splat`
- **Config:** `netlify.toml`

### Standard Node.js
Direct server deployment:
```bash
npm run build
npm start
# Server starts on default port
```

---

## Future API Endpoints (Planned)

Based on the tour management application context, potential endpoints:

- `POST /api/tours` - Create new tour
- `GET /api/tours/:id` - Get tour details
- `PUT /api/tours/:id` - Update tour
- `DELETE /api/tours/:id` - Delete tour
- `POST /api/tours/:id/venues` - Add venue to tour
- `POST /api/riders/upload` - Upload rider document
- `POST /api/riders/validate` - Validate rider against venues

**Note:** These endpoints are not currently implemented.
