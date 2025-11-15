# pdos - Epic Breakdown

**Author:** Product Builder
**Date:** 2025-11-15
**Project Level:** Backend API Development
**Target Scale:** MVP - Python Backend Intelligence Layer

---

## Overview

This document provides the complete epic and story breakdown for pdos (Eventric Tour Management Backend), decomposing the requirements from the [PRD](./PRD.md) into implementable stories.

### Epic Structure

This backend is organized into 7 epics that enable incremental delivery of the rider validation intelligence layer:

1. **Foundation & Development Infrastructure** - Establishes project foundation for all development
2. **PDF Processing Pipeline** - Upload and parse rider PDFs into structured text
3. **AI Requirement Extraction Engine** - Extract requirements from rider text using OpenAI
4. **Venue Management System** - Store and manage venue capability profiles
5. **Compatibility Scoring Engine** - The "wow moment" - instant red/yellow/green scoring
6. **Frontend Integration & API Polish** - Seamless connection with existing React UI
7. **Production Readiness & Security** - Secure, performant, production-ready system

**Total Stories:** 36 bite-sized stories designed for autonomous dev agent completion

---

## Epic 1: Foundation & Development Infrastructure

**Goal:** Establish a solid foundation for Python backend development with FastAPI, Docker, logging, monitoring, and development tooling. This epic creates the infrastructure that all subsequent epics will build upon.

**Value:** Enables rapid, consistent development with proper DevOps practices from day one.

---

### Story 1.1: Initialize FastAPI Project Structure

As a **backend developer**,
I want **a fully initialized FastAPI project with proper structure and dependencies**,
So that **I can start building API endpoints on a solid foundation**.

**Acceptance Criteria:**

**Given** no existing Python backend codebase
**When** the project is initialized
**Then** the following structure exists:
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py (FastAPI app entry point)
│   ├── config.py (environment configuration)
│   └── api/
│       └── __init__.py
├── tests/
│   └── __init__.py
├── requirements.txt (FastAPI, pydantic, uvicorn, python-dotenv)
├── .env.example
├── .gitignore (Python-specific)
└── README.md
```

**And** FastAPI app runs locally on `http://localhost:8000`
**And** Swagger docs are accessible at `http://localhost:8000/docs`
**And** README contains setup instructions

**Prerequisites:** None (first story)

**Technical Notes:**
- Use Python 3.11+
- FastAPI with Pydantic v2 for validation
- Uvicorn as ASGI server
- python-dotenv for environment variables
- Follow Python project best practices (src layout)

---

### Story 1.2: Implement Health Check Endpoint

As a **DevOps engineer**,
I want **a health check endpoint that reports service status**,
So that **monitoring tools can detect if the backend is running properly**.

**Acceptance Criteria:**

**Given** the FastAPI app is running
**When** I send `GET /api/v1/health`
**Then** I receive a 200 OK response with:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "services": {
    "api": "ok"
  },
  "timestamp": "2025-11-15T10:30:00Z"
}
```

**And** response time is < 100ms
**And** endpoint does not require authentication

**Prerequisites:** Story 1.1 (FastAPI project initialized)

**Technical Notes:**
- Implement in `app/api/health.py`
- Version read from environment or config
- Later stories will add service checks (pdf_processor, nlp_service, database)

---

### Story 1.3: Configure Docker Containerization

As a **developer**,
I want **the backend to run in a Docker container**,
So that **the development environment is consistent across machines and ready for deployment**.

**Acceptance Criteria:**

**Given** the FastAPI project exists
**When** I build and run the Docker container
**Then** the following files exist:
- `Dockerfile` (multi-stage build: build + runtime)
- `docker-compose.yml` (backend service on port 8000)
- `.dockerignore`

**And** `docker-compose up` starts the backend on `localhost:8000`
**And** Hot reload works (code changes reflect without rebuild)
**And** Container build time is < 2 minutes
**And** Runtime image size is < 200MB

**Prerequisites:** Story 1.1 (FastAPI project initialized)

**Technical Notes:**
- Use official Python 3.11-slim base image
- Multi-stage build (dependencies in build stage)
- Volume mount for hot reload in development
- Health check configured in docker-compose
- Document Docker commands in README

---

### Story 1.4: Set Up Structured Logging

As a **developer**,
I want **structured JSON logging throughout the application**,
So that **I can easily debug issues and analyze logs in production**.

**Acceptance Criteria:**

**Given** the FastAPI app is running
**When** any API request is processed
**Then** logs are written in JSON format:
```json
{
  "timestamp": "2025-11-15T10:30:00Z",
  "level": "INFO",
  "message": "Request processed",
  "request_id": "uuid",
  "method": "GET",
  "path": "/api/v1/health",
  "status_code": 200,
  "duration_ms": 15
}
```

**And** log level is configurable via environment variable (DEBUG, INFO, WARN, ERROR)
**And** request_id is generated for each request and included in all logs
**And** logs are output to stdout (for Docker)

**Prerequisites:** Story 1.1 (FastAPI project initialized)

**Technical Notes:**
- Use structlog or python-json-logger
- Middleware to capture request/response
- Generate request_id with UUID4
- Include request_id in response headers for tracing

---

### Story 1.5: Implement CORS Configuration

As a **frontend developer**,
I want **CORS properly configured for the React frontend**,
So that **the browser allows API calls from the frontend origin**.

**Acceptance Criteria:**

**Given** the FastAPI app is running
**When** configured with allowed origins
**Then** CORS middleware allows requests from:
- `http://localhost:8080` (development)
- Environment-specified production domains

**And** CORS headers include:
- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods` (GET, POST, PUT, DELETE, OPTIONS)
- `Access-Control-Allow-Headers` (Content-Type, X-API-Key)

**And** Preflight OPTIONS requests return 200
**And** CORS errors do not appear in browser console

**Prerequisites:** Story 1.1 (FastAPI project initialized)

**Technical Notes:**
- Use FastAPI's CORSMiddleware
- Allowed origins from environment variable
- Support wildcard for development, specific origins for production
- Document CORS configuration in README

---

## Epic 2: PDF Processing Pipeline

**Goal:** Enable tour managers to upload PDF rider documents and extract structured text for AI processing. Handles various PDF formats with robust error handling.

**Value:** First step in the automation journey - turning unstructured PDF documents into machine-readable text.

---

### Story 2.1: Implement File Upload Endpoint

As a **tour manager**,
I want **to upload a PDF rider document via API**,
So that **the system can begin processing the rider requirements**.

**Acceptance Criteria:**

**Given** the backend is running
**When** I POST a PDF file to `/api/v1/rider/upload` with multipart/form-data
**Then** I receive a 202 Accepted response with:
```json
{
  "rider_id": "uuid-generated",
  "status": "processing",
  "message": "Rider document uploaded successfully"
}
```

**And** the file is validated:
- File type is PDF (magic number check, not just extension)
- File size is ≤ 10MB
- File is saved to temporary storage with unique filename

**And** invalid uploads receive appropriate errors:
- 400 for non-PDF files
- 413 for files > 10MB
- 500 for storage errors

**Prerequisites:** Story 1.1 (FastAPI initialized)

**Technical Notes:**
- Implement in `app/api/rider.py`
- Use FastAPI's `UploadFile` for multipart handling
- Generate UUID for rider_id
- Store uploaded files in `./data/uploads/{rider_id}.pdf`
- Validate PDF magic number: `%PDF-`
- Return immediately (202), actual processing happens async

---

### Story 2.2: Implement PDF Text Extraction

As a **backend developer**,
I want **to extract all text content from uploaded PDF files**,
So that **the text can be sent to AI for requirement extraction**.

**Acceptance Criteria:**

**Given** a PDF file has been uploaded
**When** the system processes the PDF
**Then** all text is extracted using pdfplumber
**And** text preserves:
- Section structure (headings, paragraphs)
- List formatting (bullets, numbers)
- Table content (if present)

**And** multi-page PDFs (up to 50 pages) are fully processed
**And** extracted text is saved to `./data/extracted/{rider_id}.txt`
**And** extraction completes in < 2 seconds for typical 10-page PDF

**And** problematic PDFs are handled:
- Password-protected PDFs return clear error
- Corrupt PDFs return clear error
- Empty/image-only PDFs return warning

**Prerequisites:** Story 2.1 (File upload endpoint)

**Technical Notes:**
- Use pdfplumber library (recommended over PyPDF2)
- Add pdfplumber to requirements.txt
- Implement in `app/services/pdf_processor.py`
- Handle PDFPasswordException explicitly
- Log extraction metrics (page count, time, success/failure)

---

### Story 2.3: Implement Text Preprocessing and Cleaning

As a **backend developer**,
I want **extracted text to be cleaned and normalized**,
So that **AI processing receives high-quality input**.

**Acceptance Criteria:**

**Given** raw text has been extracted from PDF
**When** preprocessing runs
**Then** the text is cleaned:
- Extra whitespace normalized (no multiple spaces/newlines)
- Special characters preserved (°, ", ', etc.)
- Section headers identified (TECHNICAL, HOSPITALITY, etc.)
- Artifacts removed (page numbers, headers, footers)

**And** preprocessed text is saved to `./data/preprocessed/{rider_id}.json`:
```json
{
  "rider_id": "uuid",
  "sections": [
    {"type": "technical", "text": "..."},
    {"type": "hospitality", "text": "..."}
  ],
  "page_count": 10,
  "word_count": 1500
}
```

**And** preprocessing completes in < 1 second

**Prerequisites:** Story 2.2 (PDF text extraction)

**Technical Notes:**
- Implement in `app/services/text_preprocessor.py`
- Use regex for whitespace normalization
- Common section headers: TECHNICAL, HOSPITALITY, SECURITY, TIMING, ACCESS
- Case-insensitive section detection
- Store metadata (page_count, word_count) for monitoring

---

### Story 2.4: Implement Rider Processing Status Endpoint

As a **frontend developer**,
I want **to check the status of rider processing**,
So that **I can show progress to the user**.

**Acceptance Criteria:**

**Given** a rider has been uploaded
**When** I GET `/api/v1/rider/{rider_id}/status`
**Then** I receive status information:
```json
{
  "rider_id": "uuid",
  "status": "completed" | "processing" | "failed",
  "progress": 100,
  "stage": "text_extraction" | "preprocessing" | "complete",
  "extracted_text_preview": "First 200 chars...",
  "page_count": 10,
  "error_message": null,
  "uploaded_at": "2025-11-15T10:30:00Z",
  "completed_at": "2025-11-15T10:30:08Z"
}
```

**And** 404 is returned for invalid rider_id
**And** status updates in real-time as processing progresses

**Prerequisites:** Stories 2.1, 2.2, 2.3 (Complete PDF pipeline)

**Technical Notes:**
- Implement in `app/api/rider.py`
- Store processing status in-memory (dict) for MVP
- Update status at each processing stage
- Include text preview for user verification
- Return processing duration for monitoring

---

### Story 2.5: Add PDF Processing Error Handling and Logging

As a **backend developer**,
I want **comprehensive error handling and logging for PDF processing**,
So that **failures are debuggable and users get helpful feedback**.

**Acceptance Criteria:**

**Given** any PDF processing operation
**When** an error occurs
**Then** the error is logged with full context:
- rider_id
- Processing stage (upload, extraction, preprocessing)
- Error type and message
- Stack trace
- File metadata (size, pages if available)

**And** user receives actionable error response:
```json
{
  "error": {
    "code": "RIDER_PROCESSING_FAILED",
    "message": "Unable to extract text from PDF",
    "details": "PDF may be password-protected or corrupted",
    "timestamp": "2025-11-15T10:30:00Z",
    "request_id": "uuid"
  }
}
```

**And** error codes include:
- `INVALID_FILE_FORMAT` - Not a PDF
- `FILE_TOO_LARGE` - Exceeds 10MB
- `PASSWORD_PROTECTED_PDF` - Cannot open
- `CORRUPT_PDF` - Malformed file
- `EXTRACTION_FAILED` - Processing error

**Prerequisites:** Stories 2.1, 2.2, 2.3 (PDF pipeline)

**Technical Notes:**
- Implement in `app/utils/error_handler.py`
- Use custom exception classes for each error type
- FastAPI exception handlers for consistent responses
- Include request_id from logging middleware
- Log full stack traces but return user-friendly messages

---

## Epic 3: AI Requirement Extraction Engine

**Goal:** Use OpenAI API to automatically extract structured requirements from rider text, categorizing them by type and criticality. This is the "intelligence" in the intelligence layer.

**Value:** Eliminates manual requirement parsing - the system understands what tour managers need from the rider document.

---

### Story 3.1: Implement OpenAI API Integration

As a **backend developer**,
I want **to integrate OpenAI API for NLP processing**,
So that **the system can extract requirements from rider text**.

**Acceptance Criteria:**

**Given** OpenAI API key is configured
**When** the system sends a prompt to OpenAI
**Then** the API responds with structured output
**And** the integration handles:
- API authentication with API key from environment
- Request/response formatting
- Rate limiting (respect OpenAI limits)
- Timeout handling (30 second timeout)
- Retry logic (3 attempts with exponential backoff)

**And** OpenAI service errors are caught and logged:
- Authentication errors
- Rate limit exceeded
- API timeouts
- Invalid responses

**Prerequisites:** Story 1.1 (FastAPI initialized)

**Technical Notes:**
- Use openai Python SDK (add to requirements.txt)
- API key from environment variable `OPENAI_API_KEY`
- Implement in `app/services/openai_client.py`
- Use GPT-4 or GPT-3.5-turbo (configurable)
- Log token usage for cost monitoring
- Implement circuit breaker pattern for reliability

---

### Story 3.2: Design and Test Requirement Extraction Prompt

As a **backend developer**,
I want **an optimized prompt for extracting rider requirements**,
So that **extraction accuracy is high and output is structured**.

**Acceptance Criteria:**

**Given** preprocessed rider text
**When** sent to OpenAI with extraction prompt
**Then** the response is structured JSON with requirements:
```json
{
  "requirements": [
    {
      "category": "technical",
      "description": "Minimum stage depth of 50 feet",
      "value": "50 feet",
      "criticality": "critical",
      "confidence": 0.95,
      "source_text": "Stage must be at least 50' deep"
    }
  ]
}
```

**And** categories are correctly identified:
- technical, hospitality, security, timing, access

**And** criticality is determined from language cues:
- "must", "required" → critical
- "should", "preferred" → important
- "optional", "nice to have" → nice-to-have

**And** extraction achieves 90%+ accuracy on test riders

**Prerequisites:** Story 3.1 (OpenAI integration), Story 2.3 (preprocessed text)

**Technical Notes:**
- Implement in `app/prompts/requirement_extraction.py`
- Use structured output with JSON mode
- Include few-shot examples in prompt for better accuracy
- Test with 5-10 real rider documents
- Iterate on prompt based on results
- Store prompt version for tracking

---

### Story 3.3: Implement Requirement Extraction Service

As a **backend developer**,
I want **a service that orchestrates requirement extraction**,
So that **rider text is automatically converted to structured requirements**.

**Acceptance Criteria:**

**Given** preprocessed rider text exists
**When** extraction service runs
**Then** requirements are extracted for each section:
- Send each section (technical, hospitality, etc.) to OpenAI
- Parse and validate OpenAI responses
- Assign confidence scores (0-1)
- Generate unique requirement_id for each requirement

**And** extracted requirements are saved to `./data/requirements/{rider_id}.json`
**And** extraction completes in < 8 seconds for typical rider
**And** extraction progress is tracked (for status endpoint)

**Prerequisites:** Stories 3.1, 3.2 (OpenAI integration and prompt)

**Technical Notes:**
- Implement in `app/services/requirement_extractor.py`
- Process sections sequentially (or parallel for speed)
- Validate OpenAI response schema
- Handle partial failures (some sections succeed, others fail)
- Store raw OpenAI responses for debugging
- Update rider status during extraction

---

### Story 3.4: Add Requirement Validation and Confidence Scoring

As a **backend developer**,
I want **extracted requirements to be validated and scored**,
So that **low-confidence extractions are flagged for review**.

**Acceptance Criteria:**

**Given** requirements have been extracted
**When** validation runs
**Then** each requirement is checked for:
- Required fields present (category, description, criticality)
- Category is valid enum value
- Criticality is valid enum value
- Confidence is between 0 and 1
- Value is present when applicable

**And** confidence scores are calculated based on:
- OpenAI's response confidence
- Presence of clear value (numerical, categorical)
- Language clarity (specific vs. vague)

**And** requirements with confidence < 0.7 are flagged for manual review
**And** validation results are logged

**Prerequisites:** Story 3.3 (Requirement extraction service)

**Technical Notes:**
- Implement in `app/services/requirement_validator.py`
- Use Pydantic models for schema validation
- Confidence adjustment heuristics
- Flag low-confidence requirements but don't reject
- Store validation metrics for monitoring

---

### Story 3.5: Update Status Endpoint with Extraction Results

As a **frontend developer**,
I want **to retrieve extracted requirements via status endpoint**,
So that **users can review what was extracted from their rider**.

**Acceptance Criteria:**

**Given** requirement extraction is complete
**When** I GET `/api/v1/rider/{rider_id}/status`
**Then** the response includes extracted requirements:
```json
{
  "rider_id": "uuid",
  "status": "completed",
  "progress": 100,
  "requirements": {
    "technical": [
      {
        "requirement_id": "uuid",
        "description": "Stage depth 50 feet",
        "value": "50 feet",
        "criticality": "critical",
        "confidence": 0.95
      }
    ],
    "hospitality": [...],
    "security": [...],
    "timing": [...],
    "access": [...]
  },
  "extraction_confidence": 0.92,
  "requirement_count": 42,
  "low_confidence_count": 3
}
```

**And** requirements are grouped by category
**And** low confidence requirements are clearly marked

**Prerequisites:** Stories 2.4 (Status endpoint), 3.3, 3.4 (Extraction complete)

**Technical Notes:**
- Extend existing status endpoint
- Load requirements from `./data/requirements/{rider_id}.json`
- Format response to match frontend expectations
- Include summary metrics
- Cache results for performance

---

## Epic 4: Venue Management System

**Goal:** Store and manage venue capability profiles that can be matched against rider requirements. Provides CRUD operations and seed data for testing.

**Value:** Venues are the "other side" of the matching equation - their capabilities must be queryable and comparable to rider requirements.

---

### Story 4.1: Design Venue Data Schema

As a **backend developer**,
I want **a well-defined schema for venue capability data**,
So that **venue profiles are consistent and matchable against rider requirements**.

**Acceptance Criteria:**

**Given** venue data needs to be stored
**When** the schema is defined
**Then** the schema includes:
- venue_id (UUID)
- name, location (city, state, country)
- capacity (integer)
- capabilities object with categories:
  - technical (stage dimensions, power, equipment)
  - hospitality (catering, green rooms, dietary)
  - security (staff, access control)
  - timing (load-in hours, curfew)
  - access (loading dock, parking)
- contact info (name, email, phone)

**And** Pydantic models are created for validation
**And** JSON schema documentation is generated

**Prerequisites:** Story 1.1 (FastAPI initialized)

**Technical Notes:**
- Implement in `app/models/venue.py`
- Use Pydantic for schema validation
- Categories align with rider requirement categories
- All numeric values should have units (feet, hours, etc.)
- Nested structure for capabilities
- Example schema in PRD document

---

### Story 4.2: Implement JSON File-Based Venue Storage

As a **backend developer**,
I want **venues stored in JSON files for MVP**,
So that **we can iterate quickly without database setup**.

**Acceptance Criteria:**

**Given** venue data needs to be persisted
**When** venues are created/updated
**Then** they are saved to `./data/venues/{venue_id}.json`
**And** an index file `./data/venues/index.json` maintains list of all venue IDs

**And** the storage layer provides:
- Load venue by ID
- List all venues
- Save venue (create or update)
- Delete venue (move to archive)

**And** file operations are atomic (no partial writes)
**And** concurrent access is handled safely

**Prerequisites:** Story 4.1 (Venue schema)

**Technical Notes:**
- Implement in `app/storage/venue_storage.py`
- Use file locking for concurrent access
- Index file for fast listing
- Validate against Pydantic model before saving
- Handle file system errors gracefully
- Note: Migration path to PostgreSQL for growth phase

---

### Story 4.3: Implement Venue CRUD API Endpoints

As a **venue manager**,
I want **API endpoints to manage venue profiles**,
So that **venue capabilities can be kept up-to-date**.

**Acceptance Criteria:**

**Given** the backend is running
**When** I interact with venue endpoints
**Then** the following operations work:

`GET /api/v1/venues` - List all venues (paginated)
- Returns array of venue summaries
- Query params: limit, offset, city, state

`GET /api/v1/venues/{venue_id}` - Get single venue
- Returns complete venue object
- 404 if venue not found

`POST /api/v1/venues` - Create venue (admin only for MVP)
- Validates venue schema
- Returns 201 with created venue
- Generates new venue_id

`PUT /api/v1/venues/{venue_id}` - Update venue (admin only for MVP)
- Validates updated venue schema
- Returns 200 with updated venue
- 404 if venue not found

`DELETE /api/v1/venues/{venue_id}` - Soft delete (admin only for MVP)
- Marks venue as inactive
- Returns 204

**Prerequisites:** Stories 4.1, 4.2 (Schema and storage)

**Technical Notes:**
- Implement in `app/api/venues.py`
- Use Pydantic for request/response validation
- Pagination with limit/offset
- Filtering by location
- Admin-only endpoints (authentication in Epic 7)

---

### Story 4.4: Create Seed Data with Sample Venues

As a **developer**,
I want **10-20 realistic venue profiles for testing**,
So that **I can test venue matching without manual data entry**.

**Acceptance Criteria:**

**Given** the system needs test data
**When** seed data script runs
**Then** 15+ venues are created with:
- Variety of venue types (arenas, theaters, clubs, outdoor)
- Different locations (cities/states)
- Range of capabilities (small to large)
- Realistic technical specs
- Complete capability data for all categories

**And** venues include well-known examples:
- Madison Square Garden (large arena)
- The Fillmore (mid-size theater)
- Red Rocks Amphitheatre (outdoor)
- Local club/small venue

**And** seed script is idempotent (can run multiple times)

**Prerequisites:** Stories 4.2, 4.3 (Storage and CRUD)

**Technical Notes:**
- Implement in `scripts/seed_venues.py`
- Research actual venue specs for realism
- Document command in README: `python scripts/seed_venues.py`
- Check if venues exist before creating
- Include variety for comprehensive testing

---

### Story 4.5: Add Venue Search and Filtering

As a **tour manager**,
I want **to search and filter venues**,
So that **I can quickly find relevant venues for my tour**.

**Acceptance Criteria:**

**Given** venues exist in the system
**When** I query `GET /api/v1/venues` with filters
**Then** venues are filtered by:
- Location: city, state, country
- Capacity: min/max range
- Basic capabilities: has_loading_dock, has_catering

**And** results are sorted by relevance
**And** filtering is case-insensitive
**And** multiple filters work together (AND logic)

**Example:**
`GET /api/v1/venues?city=New+York&min_capacity=5000&has_loading_dock=true`

**Prerequisites:** Story 4.3 (CRUD endpoints)

**Technical Notes:**
- Extend `GET /api/v1/venues` with query parameters
- Implement filtering in storage layer
- Support partial string matching for location
- Return count of total matching venues
- Consider caching for performance

---

## Epic 5: Compatibility Scoring Engine

**Goal:** Implement the core matching algorithm that compares rider requirements against venue capabilities and generates red/yellow/green compatibility scores. This is the "wow moment" of the system.

**Value:** Tour managers get instant, accurate feedback on venue compatibility - what used to take hours of manual comparison now happens in seconds.

---

### Story 5.1: Implement Requirement Matching Algorithm

As a **backend developer**,
I want **a matching algorithm that compares requirements to venue capabilities**,
So that **each requirement can be checked against the venue**.

**Acceptance Criteria:**

**Given** a rider requirement and venue capability
**When** the matcher compares them
**Then** it determines if the requirement is met:
- Numerical comparisons (stage depth 50' vs venue 45' = not met)
- Boolean checks (needs loading dock vs has loading dock)
- Categorical matches (dietary options)
- String matching (equipment names)

**And** the matcher handles:
- Unit conversions (feet to meters, etc.)
- Partial matches (venue has 90% of required items)
- Missing venue data (mark as unknown, not failure)

**And** each match returns:
- matched: true/false
- match_percentage: 0-100
- notes: explanation of mismatch

**Prerequisites:** Stories 3.3 (Requirements extracted), 4.1 (Venue schema)

**Technical Notes:**
- Implement in `app/services/requirement_matcher.py`
- Separate matching logic by requirement type
- Use unit conversion library (pint) for measurements
- Handle null/missing venue capabilities gracefully
- Return detailed match information for user feedback

---

### Story 5.2: Implement Weighted Scoring System

As a **backend developer**,
I want **requirements weighted by criticality**,
So that **critical requirements impact the score more than nice-to-haves**.

**Acceptance Criteria:**

**Given** matched requirements with criticality levels
**When** overall score is calculated
**Then** weights are applied:
- Critical requirements: 3x weight
- Important requirements: 2x weight
- Nice-to-have requirements: 1x weight

**And** score formula is:
```
match_percentage = (matched_weight / total_weight) × 100
```

**And** color classification is:
- Green: 90-100% match
- Yellow: 70-89% match
- Red: < 70% match

**And** unmatched critical requirements always result in Red score

**Prerequisites:** Story 5.1 (Requirement matching)

**Technical Notes:**
- Implement in `app/services/scoring_engine.py`
- Document scoring algorithm clearly
- Include matched/total requirement counts
- Store scoring calculation details for transparency
- Make thresholds configurable (90/70) via environment

---

### Story 5.3: Implement Mismatch Detail Generation

As a **tour manager**,
I want **detailed explanations of mismatches**,
So that **I understand exactly what requirements aren't met**.

**Acceptance Criteria:**

**Given** requirements that don't match venue capabilities
**When** validation completes
**Then** each mismatch includes:
- requirement description
- venue capability (or "not available")
- severity (critical, moderate, minor)
- specific notes (e.g., "5 feet short of requirement")
- recommendation (e.g., "Contact venue about stage extension")

**And** mismatches are grouped by category (technical, hospitality, etc.)
**And** mismatches are sorted by severity (critical first)

**Example:**
```json
{
  "category": "technical",
  "requirement": "Minimum stage depth: 50 feet",
  "venue_capability": "Stage depth: 45 feet",
  "severity": "moderate",
  "notes": "Venue stage is 5 feet shorter than required",
  "recommendation": "Contact venue to discuss stage extension options"
}
```

**Prerequisites:** Stories 5.1, 5.2 (Matching and scoring)

**Technical Notes:**
- Implement in `app/services/mismatch_generator.py`
- Generate helpful, actionable recommendations
- Consider venue type when making recommendations
- Include confidence in mismatch detection
- Format for easy display in UI

---

### Story 5.4: Implement Venue Validation Endpoint

As a **tour manager**,
I want **to validate a rider against selected venues**,
So that **I can see compatibility scores for each venue**.

**Acceptance Criteria:**

**Given** a rider with extracted requirements
**When** I POST to `/api/v1/rider/{rider_id}/validate` with venue IDs
**Then** I receive validation results for each venue:
```json
{
  "rider_id": "uuid",
  "validations": [
    {
      "venue_id": "uuid",
      "venue_name": "Madison Square Garden",
      "score": "green",
      "match_percentage": 95,
      "matched_requirements": 38,
      "total_requirements": 40,
      "mismatches": [...],
      "recommendations": "Excellent match - minor catering adjustments needed"
    }
  ],
  "validation_timestamp": "2025-11-15T10:30:00Z"
}
```

**And** validation handles:
- Multiple venues (batch validation)
- Missing rider or venue (404 error)
- Incomplete extraction (returns warning)

**And** validation completes in < 2 seconds per venue
**And** results are sorted by match_percentage (best first)

**Prerequisites:** Stories 5.1, 5.2, 5.3 (Complete scoring engine)

**Technical Notes:**
- Implement in `app/api/validation.py`
- Process venues in parallel for speed
- Cache validation results (rider_id + venue_id)
- Include request_id for tracing
- Log validation metrics (time, scores)

---

### Story 5.5: Add Batch Validation Optimization

As a **tour manager**,
I want **fast validation of multiple venues**,
So that **I can quickly compare 10+ venues without waiting**.

**Acceptance Criteria:**

**Given** a request to validate against 10 venues
**When** validation runs
**Then** venues are processed in parallel (asyncio)
**And** total time is < 5 seconds for 10 venues

**And** partial results are returned if some venues fail
**And** validation progress can be tracked
**And** results are cached to avoid re-computation

**Prerequisites:** Story 5.4 (Validation endpoint)

**Technical Notes:**
- Use Python asyncio for parallel processing
- Implement in `app/services/batch_validator.py`
- Cache results with TTL (24 hours)
- Handle individual venue failures gracefully
- Return partial results with errors noted
- Consider rate limiting for large batches

---

### Story 5.6: Add Validation Result Persistence

As a **tour manager**,
I want **validation results to be saved**,
So that **I can review them later without re-validating**.

**Acceptance Criteria:**

**Given** validation completes successfully
**When** results are generated
**Then** they are saved to `./data/validations/{rider_id}_{timestamp}.json`

**And** I can retrieve past validations:
`GET /api/v1/rider/{rider_id}/validations` returns list of all validations

**And** each validation includes:
- timestamp
- venue_ids validated
- scores summary
- full detailed results

**And** validations are retained for 30 days

**Prerequisites:** Story 5.4 (Validation endpoint)

**Technical Notes:**
- Implement in `app/storage/validation_storage.py`
- Store complete validation results
- Index by rider_id for fast retrieval
- Implement automatic cleanup (delete > 30 days)
- Consider compression for large results

---

## Epic 6: Frontend Integration & API Polish

**Goal:** Ensure seamless integration with the existing React frontend. Zero frontend code changes required - API responses match exactly what the UI expects.

**Value:** Backend "just works" with existing wizard flow - tour managers use the familiar UI with powerful new intelligence layer.

---

### Story 6.1: Define TypeScript API Contracts

As a **frontend developer**,
I want **TypeScript interfaces for all API responses**,
So that **frontend has type-safe API communication**.

**Acceptance Criteria:**

**Given** Python backend API is defined
**When** TypeScript interfaces are created
**Then** interfaces exist in `/shared/api.ts` for:
- RiderUploadResponse
- RiderStatusResponse
- VenueResponse
- ValidationResponse
- ErrorResponse

**And** interfaces match Python Pydantic models exactly
**And** types are documented with JSDoc comments
**And** enums match (score: "green" | "yellow" | "red")

**Prerequisites:** Stories 2.4, 3.5, 4.3, 5.4 (All API endpoints)

**Technical Notes:**
- Add to existing `/shared/api.ts`
- Use TypeScript strict mode
- Document optional fields clearly
- Include example JSON in comments
- Consider using openapi-typescript generator

---

### Story 6.2: Configure Express Proxy to Python Backend

As a **full-stack developer**,
I want **Express to proxy /api/v1/* to Python backend**,
So that **frontend makes requests to single origin**.

**Acceptance Criteria:**

**Given** Python backend runs on port 8000
**When** Express receives request to `/api/v1/*`
**Then** it proxies to `http://localhost:8000/api/v1/*`

**And** proxy preserves:
- Request headers (including X-API-Key)
- Request body
- HTTP method
- Query parameters

**And** proxy handles:
- Connection errors (503 if backend down)
- Timeouts (30 seconds)
- WebSocket upgrade (for future real-time updates)

**And** existing Express routes continue working:
- `/api/ping`
- `/api/demo`

**Prerequisites:** Story 1.1 (FastAPI initialized), Existing Express server

**Technical Notes:**
- Use http-proxy-middleware in Express
- Configure in `/server/index.ts`
- Python backend URL from environment variable
- Different ports: Express 8080, Python 8000
- Document setup in README

---

### Story 6.3: Update Docker Compose for Full Stack

As a **developer**,
I want **Docker Compose to run both Express and Python backend**,
So that **the full stack runs with single command**.

**Acceptance Criteria:**

**Given** Docker Compose configuration
**When** I run `docker-compose up`
**Then** both services start:
- express-server (port 8080)
- python-backend (port 8000)

**And** services are connected:
- Express can reach Python backend via service name
- Shared volume for uploaded files
- Both use same network

**And** health checks work for both services
**And** logs are clearly labeled per service
**And** Hot reload works for both services in dev mode

**Prerequisites:** Story 1.3 (Docker), Story 6.2 (Express proxy)

**Technical Notes:**
- Update `/docker-compose.yml`
- Service names: express-server, python-backend
- Shared network: app-network
- Shared volume: ./data
- Environment variables for both services
- Document in README

---

### Story 6.4: Create End-to-End Integration Tests

As a **QA engineer**,
I want **end-to-end tests of the complete flow**,
So that **frontend-backend integration is verified**.

**Acceptance Criteria:**

**Given** full stack is running
**When** E2E tests execute
**Then** they verify complete workflow:
1. Upload PDF rider
2. Poll status until extraction complete
3. Fetch venues
4. Validate rider against venues
5. Receive red/yellow/green scores

**And** tests use actual HTTP requests (not mocks)
**And** tests run in CI/CD pipeline
**And** tests clean up test data after execution

**Prerequisites:** Stories 6.2, 6.3 (Full stack running)

**Technical Notes:**
- Use pytest with requests library
- Implement in `/tests/e2e/`
- Sample test PDF in `/tests/fixtures/`
- Use test database/storage
- Run with: `pytest tests/e2e/`
- Document in README

---

### Story 6.5: Add API Response Time Monitoring

As a **backend developer**,
I want **response time monitoring for all endpoints**,
So that **performance issues are detected early**.

**Acceptance Criteria:**

**Given** the backend is processing requests
**When** any API endpoint is called
**Then** response time is logged with:
- endpoint path
- HTTP method
- status code
- duration_ms
- request_id

**And** slow endpoints (> 2 seconds) are flagged
**And** metrics are accessible via `/api/v1/metrics` (Prometheus format)
**And** average response times are tracked per endpoint

**Prerequisites:** Story 1.4 (Structured logging)

**Technical Notes:**
- Middleware to track timing
- Log response times with structured logging
- Expose Prometheus metrics endpoint
- Track P50, P95, P99 percentiles
- Use prometheus_client library

---

## Epic 7: Production Readiness & Security

**Goal:** Harden the backend for production use with authentication, rate limiting, security best practices, and comprehensive documentation.

**Value:** System is secure, performant, and production-ready - tour managers can trust it with real booking decisions.

---

### Story 7.1: Implement API Key Authentication

As a **backend developer**,
I want **API key authentication for all endpoints**,
So that **only authorized clients can access the API**.

**Acceptance Criteria:**

**Given** the backend requires authentication
**When** a request is made without `X-API-Key` header
**Then** it receives 401 Unauthorized

**And** valid API keys are:
- Stored in environment variables
- Validated on every request (except /health)
- Multiple keys supported (for different clients)

**And** authentication middleware runs before all endpoints
**And** Invalid API keys receive 401 with clear message

**Prerequisites:** Story 1.1 (FastAPI initialized)

**Technical Notes:**
- Implement in `app/middleware/auth.py`
- FastAPI dependency injection for auth
- API keys from environment: `API_KEYS=key1,key2,key3`
- Constant-time comparison to prevent timing attacks
- Exclude /health and /metrics from auth

---

### Story 7.2: Implement Rate Limiting

As a **backend developer**,
I want **rate limiting per API key**,
So that **the system is protected from abuse**.

**Acceptance Criteria:**

**Given** authenticated requests
**When** rate limit is exceeded
**Then** request receives 429 Too Many Requests

**And** rate limits are:
- PDF processing: 100 requests/hour per API key
- Read operations: 1000 requests/hour per API key
- Rate limit headers included in response:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

**And** rate limits are configurable via environment

**Prerequisites:** Story 7.1 (API authentication)

**Technical Notes:**
- Use slowapi or custom middleware
- In-memory rate limiting (Redis for production scale)
- Per-endpoint rate limits
- Include retry-after header
- Log rate limit violations

---

### Story 7.3: Add Input Validation and Sanitization

As a **security engineer**,
I want **all inputs validated and sanitized**,
So that **injection attacks are prevented**.

**Acceptance Criteria:**

**Given** any API endpoint receives input
**When** validation runs
**Then** inputs are checked for:
- Type correctness (Pydantic models)
- Size limits (strings, files, arrays)
- Format validation (UUIDs, emails, etc.)
- SQL injection patterns (none should exist)
- XSS patterns in text fields

**And** invalid inputs receive 400 with specific error
**And** file uploads are scanned for:
- Magic number validation
- Size limits enforced
- Dangerous file types rejected

**Prerequisites:** All API endpoints created

**Technical Notes:**
- Pydantic models provide type validation
- Add custom validators for complex rules
- Sanitize file names (no path traversal)
- Use bleach for text sanitization if needed
- Log validation failures for monitoring

---

### Story 7.4: Generate OpenAPI/Swagger Documentation

As a **API consumer**,
I want **complete API documentation with examples**,
So that **I can understand and test the API interactively**.

**Acceptance Criteria:**

**Given** the FastAPI app is running
**When** I visit `/docs`
**Then** I see interactive Swagger UI with:
- All endpoints documented
- Request/response schemas
- Example requests and responses
- Authentication requirements noted
- Error responses documented

**And** OpenAPI JSON is available at `/openapi.json`
**And** documentation includes:
- API version
- Description of each endpoint
- Required vs optional fields
- Enums and their values

**Prerequisites:** All API endpoints created

**Technical Notes:**
- FastAPI auto-generates OpenAPI docs
- Add docstrings to all endpoint functions
- Use Pydantic Field descriptions
- Include examples in models
- Custom OpenAPI schema if needed

---

### Story 7.5: Create Deployment Documentation and Scripts

As a **DevOps engineer**,
I want **deployment documentation and automation scripts**,
So that **the backend can be deployed to production**.

**Acceptance Criteria:**

**Given** the backend is ready for deployment
**When** deployment docs are created
**Then** they include:
- Environment variable documentation
- Docker deployment instructions
- Cloud deployment guides (AWS/GCP/Azure)
- Database migration path (JSON → PostgreSQL)
- Monitoring setup
- Backup and recovery procedures

**And** deployment scripts exist:
- `scripts/deploy.sh` - Production deployment
- `scripts/backup.sh` - Data backup
- `scripts/health-check.sh` - Health monitoring

**And** README.md is complete with:
- Quick start guide
- API documentation link
- Environment setup
- Common troubleshooting

**Prerequisites:** All previous stories complete

**Technical Notes:**
- Document in `/docs/deployment.md`
- Include cloud-specific guides
- Environment variable template
- SSL/TLS certificate setup
- Load balancer configuration
- Monitoring setup (Prometheus + Grafana)

---

_For implementation: Use the `dev-story` workflow to implement individual stories from this epic breakdown._

---

## Epic Breakdown Summary

### Implementation Overview

This epic breakdown transforms the [PRD](./PRD.md) into **36 implementable stories** across **7 epics** that enable incremental delivery of the Eventric rider validation intelligence layer.

**Estimated Timeline:** 4-6 weeks for MVP (Epics 1-6), +1 week for production hardening (Epic 7)

### Story Distribution

| Epic | Stories | Estimated Effort | Priority |
|------|---------|------------------|----------|
| Epic 1: Foundation | 5 | 3-4 days | Critical (must be first) |
| Epic 2: PDF Processing | 5 | 5-6 days | Critical (core capability) |
| Epic 3: AI Extraction | 5 | 6-7 days | Critical (intelligence layer) |
| Epic 4: Venue Management | 5 | 4-5 days | Critical (matching data) |
| Epic 5: Scoring Engine | 6 | 7-8 days | Critical ("wow moment") |
| Epic 6: Frontend Integration | 5 | 4-5 days | High (seamless UX) |
| Epic 7: Production Readiness | 5 | 5-6 days | High (security & docs) |
| **Total** | **36** | **34-41 days** | |

### Critical Path

```
Epic 1 (Foundation)
    ↓
Epic 2 (PDF) → Epic 3 (AI) → Epic 5 (Scoring) → Epic 6 (Integration) → MVP Ready!
    ↓              ↓
Epic 4 (Venues) ───┘
                                    ↓
                        Epic 7 (Production) → Production Ready!
```

**Key Insights:**
- **Epic 1 must complete first** - establishes foundation for all development
- **Epics 2 & 4 can run in parallel** - PDF processing and venue management are independent
- **Epic 3 depends on Epic 2** - needs parsed PDF text
- **Epic 5 depends on Epics 3 & 4** - needs extracted requirements and venue data
- **Epic 6 integrates everything** - requires all core functionality
- **Epic 7 hardens for production** - can start during Epic 6

### Quality Assurance

**Every story includes:**
- ✅ BDD acceptance criteria (Given/When/Then)
- ✅ Clear prerequisites (only backward dependencies)
- ✅ Technical implementation notes
- ✅ Sized for single dev agent session
- ✅ Testable outcomes

**Coverage validated:**
- ✅ All 7 PRD functional requirements covered
- ✅ All 6 PRD non-functional requirements addressed
- ✅ No orphaned requirements
- ✅ No forward dependencies

### Success Metrics

**MVP Success (After Epic 6):**
- Tour manager can upload PDF rider
- System extracts requirements with 90%+ accuracy
- System validates against venues in < 5 seconds
- Frontend displays red/yellow/green scores
- Zero UI code changes required

**Production Success (After Epic 7):**
- API secured with authentication
- Rate limiting prevents abuse
- 99.5% uptime target met
- Complete API documentation available
- Deployment automated and documented

---

## Next Steps for Implementation

### 1. Architecture Phase (Before Development)

Run: `/bmad:bmm:workflows:architecture`

**Define:**
- Python backend architecture (FastAPI, service layer, storage)
- Integration patterns (Express proxy, CORS, API contracts)
- Data flow (PDF → extraction → scoring → validation)
- Error handling strategy
- Deployment architecture (Docker, cloud hosting)

**Deliverable:** Architecture document with decisions and diagrams

---

### 2. Sprint Planning

Run: `/bmad:bmm:workflows:sprint-planning`

**Organize stories into sprints:**
- **Sprint 1:** Epic 1 (Foundation) - 1 week
- **Sprint 2:** Epics 2 & 4 (PDF + Venues) - 1.5 weeks
- **Sprint 3:** Epic 3 (AI Extraction) - 1.5 weeks
- **Sprint 4:** Epic 5 (Scoring Engine) - 1.5 weeks
- **Sprint 5:** Epic 6 (Frontend Integration) - 1 week
- **Sprint 6:** Epic 7 (Production Readiness) - 1 week

**Deliverable:** Sprint status tracking file

---

### 3. Story Implementation

For each story, run: `/bmad:bmm:workflows:dev-story`

**Process:**
1. Select next story from sprint backlog
2. Generate story context (relevant docs, code, dependencies)
3. Implement according to acceptance criteria
4. Write comprehensive unit tests
5. Validate against acceptance criteria
6. Mark story as done

**Deliverable:** Working, tested code for each story

---

### 4. Code Review

After story completion, run: `/bmad:bmm:workflows:code-review`

**Review criteria:**
- Acceptance criteria met
- Code quality (follows Python best practices)
- Test coverage (80%+ target)
- Documentation complete
- No security vulnerabilities

**Deliverable:** Code review report with approval or changes needed

---

### 5. Continuous Integration

**Throughout development:**
- Run tests after each story: `pytest`
- Type checking: `mypy app/`
- Linting: `pylint app/`
- Format: `black app/`
- Security scan: `bandit -r app/`

---

### 6. Retrospective (After MVP)

Run: `/bmad:bmm:workflows:retrospective`

**Review:**
- What worked well?
- What challenges did we face?
- Extraction accuracy achieved?
- Performance targets met?
- Lessons learned for growth phase

---

## Reference Documents

- **PRD:** [./PRD.md](./PRD.md) - Complete product requirements
- **Architecture:** (To be created via architecture workflow)
- **AppGraph:** [../.alucify/AppGraph_eventric_demo.json](../.alucify/AppGraph_eventric_demo.json)
- **Tech Stack:** [./technology-stack.md](./technology-stack.md)
- **API Contracts:** [./api-contracts-client.md](./api-contracts-client.md)

---

**Document Status:** ✅ Complete and ready for architecture and implementation phases

**Created:** 2025-11-15 by Product Builder via BMAD create-epics-and-stories workflow

