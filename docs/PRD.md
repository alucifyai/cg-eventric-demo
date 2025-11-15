# pdos - Product Requirements Document

**Author:** Product Builder
**Date:** 2025-11-15
**Version:** 1.0

---

## Executive Summary

Eventric is a tour management platform that streamlines the complex process of booking and validating concert venues. Currently, tour managers spend hours manually comparing contract riders against venue capabilities, a process that is both time-consuming and error-prone. This PRD defines the backend intelligence layer that will automate this verification process.

The new Python backend will parse PDF rider documents, extract technical and hospitality requirements using AI/NLP, and automatically score venue compatibility. The system integrates with the existing React frontend wizard flow to deliver instant red/yellow/green compatibility scores, transforming a multi-hour manual process into a few seconds of automated analysis.

### What Makes This Special

**The magic moment:** A tour manager uploads a rider PDF, selects venues, and instantly sees red/yellow/green compatibility scores with specific requirement mismatches highlighted. What used to take hours of manual spreadsheet comparison and phone calls now happens automatically, eliminating booking mistakes before they happen and giving tour managers confidence in their venue selections.

---

## Project Classification

**Technical Type:** Backend API / Intelligent Service
**Domain:** Event Management / Entertainment Technology
**Complexity:** Medium (AI/ML components, document processing, real-time scoring)

This is a **Python backend service** that provides intelligent document analysis and matching capabilities. The project involves:

- **AI/ML Components:** PDF parsing, natural language processing, requirement extraction
- **RESTful API:** Endpoints consumed by existing React frontend
- **Document Processing:** Handling PDF rider documents with varying formats and structures
- **Scoring Engine:** Multi-criteria matching algorithm with configurable thresholds
- **Integration:** Seamless connection to pre-built React wizard UI

**Existing Assets:**
- Complete React frontend (wizard flow: upload → venue selection → validation → review)
- Express server scaffold (needs Python backend integration)
- UI components and state management (TanStack Query ready for API integration)
- AppGraph modeling complete system architecture

---

## Success Criteria

**The backend succeeds when:**

1. **Accuracy & Trust**
   - 95%+ accuracy in extracting requirements from rider PDFs
   - Tour managers trust the red/yellow/green scores without manual verification
   - Zero critical mismatches missed (no green scores for incompatible venues)
   - Detailed mismatch reports that tour managers can share with venues

2. **Speed & Reliability**
   - Rider PDF processed and requirements extracted in < 10 seconds
   - Venue compatibility scoring returns in < 2 seconds per venue
   - 99.5% uptime during business hours
   - Handles malformed PDFs gracefully with clear error messages

3. **Adoption & Impact**
   - Tour managers complete rider validation in < 5 minutes (vs hours manually)
   - 80% reduction in booking mistakes caught during validation
   - Tour managers choose Eventric over manual spreadsheets for new tours
   - Positive feedback: "I can't imagine going back to the old way"

4. **Integration Success**
   - Seamless connection with existing React frontend (zero UI changes needed)
   - API responses match exact format expected by frontend
   - Error handling provides actionable feedback to users
   - Development team can deploy backend updates without frontend changes

---

## Product Scope

### MVP - Minimum Viable Product

**Core Intelligence Layer (must work for launch):**

1. **PDF Processing**
   - Accept PDF rider documents via API endpoint
   - Parse PDF content using Python libraries (PyPDF2, pdfplumber, or similar)
   - Extract text with basic structure recognition
   - Handle common PDF formats and encodings
   - Return clear errors for unsupported formats

2. **Requirement Extraction**
   - Use AI/NLP (OpenAI API or similar) to identify requirements from rider text
   - Extract key categories: technical specs, hospitality, timing, security, access
   - Structure extracted data in standardized JSON format
   - Confidence scores for extracted requirements

3. **Venue Compatibility Scoring**
   - Compare extracted rider requirements against venue capabilities
   - Generate red/yellow/green scores:
     - **Green:** All requirements met (90-100% match)
     - **Yellow:** Most requirements met with minor gaps (70-89% match)
     - **Red:** Critical requirements missing (< 70% match)
   - Identify specific mismatches with severity levels
   - Return detailed compatibility report per venue

4. **REST API Endpoints**
   - `POST /api/rider/upload` - Accept PDF, return parsed requirements
   - `POST /api/rider/validate` - Score rider against selected venues
   - `GET /api/rider/{id}` - Retrieve parsed rider data
   - `GET /api/venues` - List available venues with capabilities
   - Standard error responses with actionable messages

5. **Venue Data Management**
   - JSON-based venue capability storage
   - CRUD operations for venue profiles
   - Support for standard capability fields (stage size, equipment, etc.)

6. **Frontend Integration**
   - API responses match expected format from existing React UI
   - CORS configuration for local development and production
   - Deployment alongside existing Express server

### Growth Features (Post-MVP)

**Enhanced Intelligence & Usability:**

1. **Advanced NLP**
   - Fine-tuned models for entertainment industry terminology
   - Context-aware requirement extraction (understand abbreviations, industry jargon)
   - Handling complex nested requirements

2. **Learning & Improvement**
   - Tour manager feedback on scoring accuracy
   - System learns from corrections (false positives/negatives)
   - Continuously improving extraction accuracy

3. **Document Format Expansion**
   - Support for Word documents (.docx)
   - Excel rider templates
   - Scanned PDF OCR processing
   - Multiple rider versions/amendments

4. **Smart Matching**
   - Weighted scoring based on requirement criticality
   - Venue recommendations based on tour history
   - Alternative venue suggestions for red-scored venues
   - "Close match" notifications for venues that almost work

5. **Analytics & Insights**
   - Common mismatch patterns across venues
   - Requirement trends over time
   - Venue compatibility statistics
   - Export reports for tour planning

6. **Batch Operations**
   - Process multiple riders simultaneously
   - Compare multiple tours against venue inventory
   - Bulk venue updates

### Vision (Future)

**Industry-Leading Intelligence Platform:**

1. **Predictive AI**
   - Predict compatibility before full upload based on tour type
   - Suggest optimal venue sequences for multi-city tours
   - Seasonal availability predictions
   - Budget optimization recommendations

2. **Industry Integration**
   - Direct integration with venue booking systems
   - Real-time availability checking
   - Automated contract generation from validated matches
   - Integration with ticketing platforms

3. **Collaborative Features**
   - Multi-user tour planning with shared rider libraries
   - Venue manager portal for updating capabilities
   - Real-time negotiation tools for yellow-scored items
   - Comment threads on specific requirements

4. **Advanced Capabilities**
   - Multi-language rider support (international tours)
   - Photo/diagram recognition in riders (stage plots, technical diagrams)
   - Video requirement analysis
   - 3D venue visualization with rider overlay

5. **Market Intelligence**
   - Benchmark against industry standards
   - Competitive venue analysis
   - Market rate recommendations
   - Trend forecasting for rider requirements

---

## Backend API Specific Requirements

### Technology Stack

**Python Backend:**
- **Framework:** FastAPI or Flask (recommend FastAPI for async support and automatic OpenAPI docs)
- **PDF Processing:** pdfplumber, PyPDF2, or pypdf
- **AI/NLP:** OpenAI API (GPT-4 or GPT-3.5-turbo) for requirement extraction
- **Data Storage:** JSON files for MVP (PostgreSQL for growth)
- **Deployment:** Docker containerization, deployable to cloud services (AWS, GCP, Azure)

**Integration Points:**
- Existing Express server proxies requests to Python backend
- CORS enabled for React frontend (localhost:8080 dev, production domain)
- Shared data contracts defined in TypeScript interfaces

### API Specification

**Base URL:** `/api/v1`

#### 1. Rider Upload & Processing

```
POST /api/v1/rider/upload
Content-Type: multipart/form-data

Request:
{
  "file": <PDF binary>,
  "tour_name": "Summer 2025 Tour",
  "tour_id": "uuid" (optional)
}

Response (202 Accepted):
{
  "rider_id": "uuid",
  "status": "processing",
  "message": "Rider document uploaded successfully"
}

Errors:
400 - Invalid file format
413 - File too large (> 10MB)
500 - Processing error
```

#### 2. Get Rider Processing Status

```
GET /api/v1/rider/{rider_id}/status

Response (200 OK):
{
  "rider_id": "uuid",
  "status": "completed" | "processing" | "failed",
  "progress": 100,
  "requirements": {
    "technical": [...],
    "hospitality": [...],
    "security": [...],
    "timing": [...],
    "access": [...]
  },
  "extraction_confidence": 0.95,
  "error_message": null
}

Errors:
404 - Rider not found
500 - Server error
```

#### 3. Validate Rider Against Venues

```
POST /api/v1/rider/{rider_id}/validate

Request:
{
  "venue_ids": ["venue-1", "venue-2", "venue-3"]
}

Response (200 OK):
{
  "rider_id": "uuid",
  "validations": [
    {
      "venue_id": "venue-1",
      "venue_name": "Madison Square Garden",
      "score": "green" | "yellow" | "red",
      "match_percentage": 95,
      "matched_requirements": 38,
      "total_requirements": 40,
      "mismatches": [
        {
          "category": "technical",
          "requirement": "Minimum stage depth: 50 feet",
          "venue_capability": "Stage depth: 45 feet",
          "severity": "minor" | "moderate" | "critical",
          "notes": "5 feet short of requirement"
        }
      ],
      "recommendations": "Contact venue about stage extension options"
    }
  ],
  "validation_timestamp": "2025-11-15T10:30:00Z"
}

Errors:
404 - Rider or venue not found
400 - Invalid request
500 - Validation error
```

#### 4. Venue Management

```
GET /api/v1/venues
Response: Array of venue objects with capabilities

GET /api/v1/venues/{venue_id}
Response: Single venue object

POST /api/v1/venues (Admin only)
Request: Venue object with capabilities

PUT /api/v1/venues/{venue_id} (Admin only)
Request: Updated venue object

DELETE /api/v1/venues/{venue_id} (Admin only)
```

**Venue Object Schema:**
```json
{
  "venue_id": "uuid",
  "name": "Madison Square Garden",
  "location": {
    "city": "New York",
    "state": "NY",
    "country": "USA"
  },
  "capabilities": {
    "technical": {
      "stage_width": 80,
      "stage_depth": 45,
      "stage_height": 10,
      "power_capacity": "400A 3-phase",
      "lighting_grid": true,
      "sound_system": "L-Acoustics K2",
      "video_capabilities": ["LED wall", "projectors"]
    },
    "hospitality": {
      "green_rooms": 4,
      "catering_available": true,
      "dietary_options": ["vegetarian", "vegan", "gluten-free"]
    },
    "security": {
      "security_staff": 50,
      "metal_detectors": true,
      "backstage_access_control": true
    },
    "timing": {
      "load_in_hours": 8,
      "load_out_hours": 4,
      "venue_curfew": "23:00"
    },
    "access": {
      "loading_dock": true,
      "truck_parking": 12,
      "bus_parking": 6
    }
  },
  "capacity": 20000,
  "contact": {
    "name": "Jane Smith",
    "email": "jane@msg.com",
    "phone": "+1-555-0100"
  }
}
```

#### 5. Health Check

```
GET /api/v1/health

Response (200 OK):
{
  "status": "healthy",
  "version": "1.0.0",
  "services": {
    "pdf_processor": "ok",
    "nlp_service": "ok",
    "database": "ok"
  }
}
```

### Authentication & Authorization

**MVP (Simple API Keys):**
- API key authentication via `X-API-Key` header
- Keys stored in environment variables
- Frontend includes API key in all requests
- Rate limiting per API key

**Growth (OAuth 2.0):**
- JWT-based authentication
- Role-based access control (RBAC):
  - **Tour Manager:** Upload riders, validate venues, view all data
  - **Venue Manager:** Update venue capabilities, view venue-specific data
  - **Admin:** Full CRUD on all resources
- Refresh token rotation
- Session management

### Data Schemas & Validation

**Requirement Schema (Extracted from Rider):**
```json
{
  "requirement_id": "uuid",
  "category": "technical" | "hospitality" | "security" | "timing" | "access",
  "description": "Minimum stage depth of 50 feet",
  "value": "50 feet",
  "criticality": "critical" | "important" | "nice-to-have",
  "confidence": 0.95,
  "source_text": "Original text from PDF"
}
```

**Scoring Algorithm:**
- Each requirement assigned weight based on criticality
- Critical requirements: 3x weight
- Important requirements: 2x weight
- Nice-to-have requirements: 1x weight
- Match percentage = (matched_weight / total_weight) * 100
- Color thresholds: Green (90-100%), Yellow (70-89%), Red (<70%)

### Error Handling Standards

All errors follow consistent format:
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

**Error Codes:**
- `INVALID_FILE_FORMAT` - Unsupported file type
- `FILE_TOO_LARGE` - File exceeds size limit
- `RIDER_PROCESSING_FAILED` - PDF parsing error
- `NLP_SERVICE_ERROR` - AI extraction failed
- `VENUE_NOT_FOUND` - Invalid venue ID
- `VALIDATION_ERROR` - Invalid request data
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `UNAUTHORIZED` - Invalid API key

---

## Functional Requirements

### FR-1: PDF Rider Document Processing

**Capability:** Accept, parse, and extract structured data from PDF rider documents

**Requirements:**

1.1. **File Upload**
   - Accept PDF files up to 10MB via multipart/form-data POST request
   - Support PDF versions 1.4 through 2.0
   - Validate file type (must be PDF, reject other formats)
   - Generate unique rider_id for each upload
   - Return 202 Accepted with processing status URL
   - **Acceptance Criteria:** Upload 5 different rider PDFs, all return valid rider_id within 2 seconds

1.2. **PDF Parsing**
   - Extract all text content from PDF maintaining structure
   - Handle multi-page documents (up to 50 pages)
   - Preserve section headers and formatting context
   - Detect and handle password-protected PDFs (return error)
   - Handle corrupt/malformed PDFs gracefully (clear error message)
   - **Acceptance Criteria:** Successfully parse 90% of sample rider PDFs, clear error for remaining 10%

1.3. **Text Preprocessing**
   - Clean extracted text (remove artifacts, normalize whitespace)
   - Identify section boundaries (Technical, Hospitality, etc.)
   - Handle common formatting variations (bullets, numbering, tables)
   - **Acceptance Criteria:** Extracted text is readable and properly sectioned

### FR-2: AI-Powered Requirement Extraction

**Capability:** Use NLP to identify and structure requirements from rider text

**Requirements:**

2.1. **Requirement Identification**
   - Send extracted text to OpenAI API (GPT-4 or GPT-3.5-turbo)
   - Use structured prompts to identify requirements in categories:
     - Technical (stage, sound, lighting, power, video)
     - Hospitality (catering, green rooms, dietary)
     - Security (staff, access control, protocols)
     - Timing (load-in, load-out, curfews)
     - Access (loading docks, parking, entrances)
   - Extract specific values (measurements, quantities, specifications)
   - **Acceptance Criteria:** Identify 95%+ of requirements present in test riders

2.2. **Requirement Structuring**
   - Convert identified requirements to structured JSON
   - Assign category, description, value, and criticality to each requirement
   - Generate confidence score (0-1) for each extraction
   - Link to source text from original PDF
   - **Acceptance Criteria:** All requirements have valid structure and confidence scores

2.3. **Criticality Classification**
   - Classify requirements as: critical, important, or nice-to-have
   - Use industry context and language cues (must, required vs. preferred, desired)
   - Allow manual override of criticality in future versions
   - **Acceptance Criteria:** 90%+ agreement with expert manual classification

2.4. **Processing Status**
   - Maintain processing state: queued → processing → completed/failed
   - Update progress percentage during extraction (0-100%)
   - Store extracted requirements for later retrieval
   - Handle API rate limits and retry logic
   - **Acceptance Criteria:** Status endpoint reflects accurate state, processing completes in <10s

### FR-3: Venue Capability Management

**Capability:** Store, retrieve, and manage venue capability profiles

**Requirements:**

3.1. **Venue Data Storage**
   - Store venue profiles in JSON format (MVP)
   - Include venue metadata (name, location, capacity, contact)
   - Structure capabilities by category matching rider categories
   - Support nested data (e.g., technical.sound_system)
   - **Acceptance Criteria:** CRUD operations succeed for venue profiles

3.2. **Venue Retrieval**
   - List all available venues (GET /venues)
   - Filter by location, capacity, capabilities (query parameters)
   - Retrieve single venue by ID (GET /venues/{id})
   - Return structured capability data
   - **Acceptance Criteria:** API returns venue data in <500ms

3.3. **Venue Administration**
   - Create new venue profiles (POST)
   - Update existing profiles (PUT/PATCH)
   - Delete venues (soft delete, maintain history)
   - Validate required fields (name, capabilities)
   - **Acceptance Criteria:** Admin can manage venues via API

3.4. **Seed Data**
   - Provide 10-20 sample venues for testing/demo
   - Include major venue types (arenas, theaters, clubs, outdoor)
   - Realistic capability data based on actual venues
   - **Acceptance Criteria:** Demo works with pre-populated venues

### FR-4: Venue Compatibility Scoring

**Capability:** Compare rider requirements against venue capabilities and generate scored matches

**Requirements:**

4.1. **Requirement Matching**
   - For each rider requirement, check if venue capability exists
   - Compare values (numerical, categorical, boolean)
   - Handle units (convert feet to meters, etc.)
   - Detect partial matches (e.g., 45ft stage vs 50ft requirement)
   - **Acceptance Criteria:** Correctly identifies matches and mismatches for all requirement types

4.2. **Score Calculation**
   - Apply weighted scoring based on requirement criticality:
     - Critical: 3x weight
     - Important: 2x weight
     - Nice-to-have: 1x weight
   - Calculate match percentage: (matched_weight / total_weight) × 100
   - Assign color score:
     - Green: 90-100% match
     - Yellow: 70-89% match
     - Red: <70% match
   - **Acceptance Criteria:** Scores match manual calculation for test cases

4.3. **Mismatch Details**
   - List all unmatched requirements with specifics
   - Show venue capability vs. requirement for comparison
   - Classify mismatch severity: critical, moderate, minor
   - Provide contextual recommendations (contact venue, consider alternative)
   - **Acceptance Criteria:** Mismatch reports are actionable by tour managers

4.4. **Batch Validation**
   - Score rider against multiple venues in single request
   - Return sorted results (best matches first)
   - Process efficiently (parallel scoring where possible)
   - Complete validation for 10 venues in <5 seconds
   - **Acceptance Criteria:** Validate rider against 10 venues, return sorted results <5s

### FR-5: Frontend Integration

**Capability:** Seamlessly integrate with existing React frontend

**Requirements:**

5.1. **API Contract Compliance**
   - Response schemas match TypeScript interfaces in frontend
   - Status codes align with frontend expectations (202, 200, 404, 400, 500)
   - Error responses include actionable messages for UI display
   - **Acceptance Criteria:** Frontend consumes API without modifications

5.2. **CORS Configuration**
   - Allow requests from localhost:8080 (development)
   - Configure production domain when deployed
   - Support preflight OPTIONS requests
   - Include appropriate CORS headers
   - **Acceptance Criteria:** Frontend can call API from different origin

5.3. **Request/Response Format**
   - Accept JSON request bodies (except file uploads)
   - Return JSON responses with consistent structure
   - Use ISO 8601 timestamps
   - Include request_id for tracing
   - **Acceptance Criteria:** All responses parse correctly in frontend

5.4. **Real-time Updates** (Optional for MVP)
   - WebSocket or SSE for processing progress updates
   - Push notifications when processing completes
   - **Acceptance Criteria:** Frontend displays live processing status

### FR-6: Error Handling & Logging

**Capability:** Robust error handling with actionable feedback

**Requirements:**

6.1. **Input Validation**
   - Validate all API inputs (file type, size, required fields)
   - Return 400 Bad Request with specific validation errors
   - Prevent injection attacks (validate/sanitize all inputs)
   - **Acceptance Criteria:** Invalid requests rejected with clear error messages

6.2. **Error Response Format**
   - Consistent error schema (code, message, details, timestamp, request_id)
   - Human-readable error messages
   - Technical details for debugging (in details field)
   - Appropriate HTTP status codes
   - **Acceptance Criteria:** Developers can debug issues from error responses

6.3. **Logging**
   - Log all API requests (method, path, status, duration)
   - Log processing events (PDF uploaded, extraction started, completed)
   - Log errors with full context (stack traces, input data)
   - Structured logging (JSON format)
   - **Acceptance Criteria:** Logs enable debugging of production issues

6.4. **Graceful Degradation**
   - Handle OpenAI API failures (retry, fallback, clear error)
   - Handle file system errors (disk full, permissions)
   - Handle database connection issues
   - Return 503 Service Unavailable when dependencies are down
   - **Acceptance Criteria:** System handles failures without crashing

### FR-7: Development & Deployment

**Capability:** Easy local development and production deployment

**Requirements:**

7.1. **Local Development Setup**
   - README with setup instructions
   - Docker Compose for full stack (Python backend + existing Express + React)
   - Environment variables documented (.env.example)
   - Sample data (riders, venues) for testing
   - **Acceptance Criteria:** New developer can run locally in <15 minutes

7.2. **Docker Containerization**
   - Dockerfile for Python backend
   - Multi-stage build (smaller production image)
   - Health check endpoint for container orchestration
   - **Acceptance Criteria:** Backend runs in Docker container

7.3. **Configuration Management**
   - Environment-based config (dev, staging, production)
   - Secrets management (API keys not in code)
   - Feature flags for gradual rollout
   - **Acceptance Criteria:** Same code runs in all environments with different config

7.4. **API Documentation**
   - Auto-generated OpenAPI/Swagger docs (FastAPI built-in)
   - Interactive API explorer for testing
   - Example requests/responses
   - **Acceptance Criteria:** Developers can explore API via Swagger UI

---

## Non-Functional Requirements

### Performance

**Why it matters:** Tour managers need instant feedback to maintain workflow efficiency. Slow processing breaks the "wow" moment.

**Requirements:**

**NFR-P1: PDF Processing Speed**
- PDF upload and initial parsing: < 2 seconds
- Full requirement extraction (AI processing): < 10 seconds for typical rider (5-10 pages)
- Processing time scales linearly with page count (< 1s per page)
- **Measurement:** 95th percentile processing time for 10-page PDFs
- **Acceptance:** 95% of uploads complete extraction in < 10 seconds

**NFR-P2: Validation Response Time**
- Single venue validation: < 2 seconds
- Batch validation (10 venues): < 5 seconds
- Scoring algorithm execution: < 500ms per venue
- **Measurement:** API response time from request to response
- **Acceptance:** P95 response time under targets

**NFR-P3: API Response Time**
- GET endpoints: < 500ms
- POST endpoints (except file upload): < 1 second
- Health check: < 100ms
- **Measurement:** Server-side processing time
- **Acceptance:** P95 response times under targets

**NFR-P4: Concurrent Request Handling**
- Support 10 concurrent PDF processing jobs
- Support 50 concurrent validation requests
- Queue additional requests beyond capacity
- **Measurement:** Load testing with concurrent users
- **Acceptance:** System remains responsive under concurrent load

**NFR-P5: Resource Efficiency**
- PDF processing memory: < 500MB per document
- API memory footprint: < 2GB base
- OpenAI API calls optimized (batch where possible)
- File cleanup after processing (delete temp files)
- **Measurement:** Memory profiling during processing
- **Acceptance:** No memory leaks, efficient resource usage

### Security

**Why it matters:** Handling uploaded documents and API access requires proper security controls.

**Requirements:**

**NFR-S1: API Authentication**
- All endpoints (except health check) require authentication
- API keys transmitted via X-API-Key header (not URL parameters)
- API keys stored as environment variables, never committed to code
- Rate limiting per API key: 100 requests/hour for processing, 1000/hour for reads
- **Acceptance:** Unauthorized requests receive 401, rate limits enforced

**NFR-S2: File Upload Security**
- Validate file type (magic number check, not just extension)
- Enforce file size limits (10MB max)
- Scan uploaded files for malware (optional for MVP, required for production)
- Store uploaded files in isolated directory with restricted permissions
- Auto-delete uploaded files after 24 hours
- **Acceptance:** Malicious uploads rejected, files properly isolated

**NFR-S3: Data Protection**
- Encrypt sensitive data at rest (API keys, venue contact info)
- Use HTTPS for all API communication (TLS 1.2+)
- Sanitize all user inputs to prevent injection attacks
- Don't log sensitive data (API keys, PII)
- **Acceptance:** Security audit passes, no sensitive data exposure

**NFR-S4: Dependency Security**
- Use latest stable versions of dependencies
- Regularly scan for known vulnerabilities (npm audit, safety)
- Pin dependency versions for reproducible builds
- Update vulnerable dependencies within 7 days of disclosure
- **Acceptance:** No high/critical vulnerabilities in production

**NFR-S5: Error Handling Security**
- Don't expose internal paths or stack traces in API responses
- Log detailed errors server-side only
- Generic error messages to clients (specific codes for debugging)
- Rate limit failed authentication attempts
- **Acceptance:** Error responses don't leak sensitive information

### Scalability

**Why it matters:** System should handle growth without architectural changes.

**Requirements:**

**NFR-SC1: Horizontal Scalability**
- Stateless API design (no server-side sessions)
- Support multiple backend instances behind load balancer
- File uploads use shared storage (S3, not local disk) for multi-instance
- **Acceptance:** 2+ instances handle distributed load

**NFR-SC2: Database Scalability** (Growth phase)
- JSON files work for MVP (< 100 venues)
- Design supports migration to PostgreSQL/MongoDB
- Database queries optimized with indexes
- **Acceptance:** System supports 1000+ venues with database

**NFR-SC3: Processing Queue**
- Implement job queue for PDF processing (Celery, RQ, or similar)
- Handle processing backlog during peak usage
- Retry failed jobs with exponential backoff
- **Acceptance:** System queues and processes 50+ riders concurrently

### Reliability

**Why it matters:** Tour managers depend on the system for critical booking decisions.

**Requirements:**

**NFR-R1: Uptime**
- Target: 99.5% uptime during business hours (8am-8pm local time)
- Maximum planned downtime: 2 hours/month, scheduled off-hours
- Automatic health monitoring and alerting
- **Acceptance:** Uptime SLA met over 30-day period

**NFR-R2: Error Recovery**
- Graceful handling of OpenAI API failures (retry 3x with backoff)
- Fallback error messages when AI service unavailable
- Data consistency: failed uploads don't leave orphaned data
- **Acceptance:** System recovers from transient failures automatically

**NFR-R3: Data Durability**
- Extracted rider data persisted to disk immediately
- Venue data backed up daily
- File uploads retained for 24 hours minimum
- **Acceptance:** Zero data loss from system failures

### Integration

**Why it matters:** Seamless connection with existing React frontend is critical for MVP success.

**Requirements:**

**NFR-I1: API Compatibility**
- RESTful API following industry standards
- JSON request/response format
- Standard HTTP status codes (2xx success, 4xx client error, 5xx server error)
- Consistent error response structure
- **Acceptance:** Frontend integration requires zero modifications

**NFR-I2: CORS Support**
- Allow cross-origin requests from configured domains
- Support preflight OPTIONS requests
- Include appropriate CORS headers (Access-Control-Allow-Origin, etc.)
- **Acceptance:** Browser-based frontend calls API without CORS errors

**NFR-I3: Versioning**
- API versioned in URL path (/api/v1/)
- Backward compatibility maintained within major version
- Deprecation notices 30 days before breaking changes
- **Acceptance:** Frontend continues working when backend updates

**NFR-I4: Express Integration**
- Python backend runs as separate service (different port or container)
- Express server proxies /api/v1/* requests to Python backend
- Existing Express routes (/api/ping, /api/demo) continue working
- **Acceptance:** Existing frontend routes unaffected, new routes functional

### Maintainability

**Why it matters:** Code needs to be maintainable by team and future developers.

**Requirements:**

**NFR-M1: Code Quality**
- Python code follows PEP 8 style guide
- Type hints for all function signatures
- Maximum function complexity: 10 (cyclomatic complexity)
- Minimum 80% code coverage for unit tests
- **Acceptance:** Code passes linters (pylint, flake8, mypy)

**NFR-M2: Testing**
- Unit tests for all business logic functions
- Integration tests for API endpoints
- End-to-end tests with sample riders
- Test fixtures for venues and riders
- **Acceptance:** Test suite runs in < 30 seconds, 80%+ coverage

**NFR-M3: Documentation**
- README with setup instructions
- API documentation (OpenAPI/Swagger)
- Inline code comments for complex logic
- Architecture decision records (ADRs) for key choices
- **Acceptance:** New developer can contribute within 1 day

**NFR-M4: Monitoring & Observability**
- Structured logging (JSON format)
- Request tracing with correlation IDs
- Metrics exposed (Prometheus format): request count, latency, errors
- Health check endpoint for monitoring
- **Acceptance:** Operations team can diagnose issues from logs/metrics

---

## Implementation Planning

### Epic Breakdown Required

This PRD contains 7 functional requirement areas and 6 non-functional requirement categories that must be decomposed into implementable epics and bite-sized stories (200k context limit).

**Recommended Epic Structure:**

1. **Epic 1: Foundation & Infrastructure**
   - FastAPI setup, Docker, environment configuration
   - Health check endpoint, logging, monitoring

2. **Epic 2: PDF Processing Pipeline**
   - File upload endpoint, PDF parsing, text extraction
   - Error handling for malformed PDFs

3. **Epic 3: AI Requirement Extraction**
   - OpenAI integration, requirement identification
   - Structured data extraction, confidence scoring

4. **Epic 4: Venue Management**
   - Venue CRUD operations, seed data
   - JSON storage implementation

5. **Epic 5: Compatibility Scoring Engine**
   - Matching algorithm, weighted scoring
   - Red/yellow/green classification, mismatch reporting

6. **Epic 6: Frontend Integration**
   - API contract alignment, CORS setup
   - Express proxy configuration, end-to-end testing

7. **Epic 7: Production Readiness**
   - Security hardening, performance optimization
   - Documentation, deployment automation

**Next Step:** Run `/bmad:bmm:workflows:create-epics-and-stories` to create the detailed implementation breakdown.

---

## References

**Existing Project Documentation:**
- Complete Documentation Index: `/docs/index.md`
- Architecture Patterns: `/docs/architecture-patterns.md`
- API Contracts (Client): `/docs/api-contracts-client.md`
- API Contracts (Server): `/docs/api-contracts-server.md`
- Technology Stack: `/docs/technology-stack.md`
- Development Guide: `/docs/development-guide.md`
- UI Component Inventory: `/docs/ui-component-inventory-client.md`
- State Management: `/docs/state-management-client.md`

**Architecture Modeling:**
- AppGraph (Complete System): `/.alucify/AppGraph_eventric_demo.json`
- Interface Layer Subgraph: `/.alucify/InterfaceNodeSubgraph.json`
- Logic Layer Subgraph: `/.alucify/LogicNodeSubgraph.json`
- Schema Layer Subgraph: `/.alucify/SchemaNodeSubgraph.json`

**Existing Codebase:**
- React Frontend: `/client/` (pages, components, hooks)
- Express Server: `/server/index.ts` (currently serves React app)
- Shared Types: `/shared/api.ts` (TypeScript interfaces)

---

## Technical Constraints & Considerations

### Integration with Existing System

**Current Architecture:**
- React SPA built with Vite
- Express server on port 8080 (development)
- TanStack Query for API state management
- TailwindCSS + Radix UI component library

**Integration Approach:**
- Python backend runs as separate service (port 8000 or containerized)
- Express server proxies `/api/v1/*` to Python backend
- Existing `/api/ping` and `/api/demo` routes remain unchanged
- Frontend makes API calls to same origin (Express proxies)

**Frontend Changes Required:**
- Add API client functions in `/client/hooks/` or `/client/lib/`
- Update wizard pages to call new endpoints:
  - Index page: Add file upload to `/api/v1/rider/upload`
  - SelectVenues page: Fetch venues from `/api/v1/venues`
  - RiderValidation page: Call `/api/v1/rider/{id}/validate`
  - TourReview page: Display validation results

### Technology Decisions

**Python Framework: FastAPI** (Recommended)
- Reasons: Async support, auto-generated OpenAPI docs, type hints, performance
- Alternative: Flask (simpler but less features)

**PDF Library: pdfplumber** (Recommended)
- Reasons: Better text extraction, table handling, maintained
- Alternative: PyPDF2 (simpler, less accurate)

**AI Service: OpenAI API** (GPT-4 or GPT-3.5-turbo)
- Reasons: Best-in-class NLP, structured output, reliability
- Alternative: Anthropic Claude API, open-source models (cost vs. accuracy tradeoff)

**Data Storage: JSON files** (MVP)
- Reasons: Simple, no database setup, sufficient for < 100 venues
- Migration Path: PostgreSQL or MongoDB for growth (1000+ venues)

**Deployment: Docker**
- Reasons: Consistent environments, easy scaling, portable
- Docker Compose for local development (Python + Express + React)

### Open Questions for Architecture Phase

1. **Processing Model:** Synchronous vs. async job queue?
   - Sync: Simpler, client waits for processing
   - Async: Better UX, requires job queue (Celery/RQ)
   - **Recommendation:** Start sync for MVP, add queue in growth phase

2. **File Storage:** Local disk vs. cloud storage?
   - Local: Simpler for MVP, single instance only
   - S3/Cloud: Required for multi-instance horizontal scaling
   - **Recommendation:** Local for MVP with S3 migration path

3. **Caching Strategy:** Cache extracted requirements?
   - Yes: Faster repeat validations, uses more storage
   - No: Always fresh, re-process on each validation
   - **Recommendation:** Cache for 24 hours, aligns with file retention

4. **AI Prompt Engineering:** How to optimize extraction accuracy?
   - Needs experimentation with real rider documents
   - May require few-shot examples in prompts
   - **Recommendation:** Start with zero-shot, iterate based on accuracy metrics

---

## Success Metrics & KPIs

**Adoption Metrics:**
- Weekly active users (tour managers using the system)
- Riders processed per week
- Venues validated per rider (avg)

**Efficiency Metrics:**
- Time to complete validation (target: < 5 minutes vs. hours manually)
- Reduction in booking mistakes (measure via user feedback)

**Quality Metrics:**
- Extraction accuracy rate (target: 95%+)
- User-reported false positives/negatives
- Confidence score distribution

**Technical Metrics:**
- API response times (P50, P95, P99)
- Error rate (< 1% of requests)
- Uptime percentage (target: 99.5%)

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| AI extraction accuracy below 95% | High | Medium | Iterate on prompts, add few-shot examples, user feedback loop |
| OpenAI API costs higher than expected | Medium | Medium | Monitor usage, implement caching, consider GPT-3.5 vs GPT-4 tradeoff |
| PDF format variations break parsing | High | High | Test with diverse rider samples, graceful error handling, fallback messages |
| Frontend integration requires UI changes | Medium | Low | Define API contracts early, share TypeScript types, coordinate with frontend team |
| Processing time exceeds 10s target | Medium | Medium | Optimize prompts, parallel processing, implement async job queue |
| Venue data management overhead | Low | Low | Simple JSON CRUD for MVP, database migration for scale |

---

## Next Steps

1. **Architecture Decisions** (1-2 days)
   - Run: `/bmad:bmm:workflows:architecture`
   - Finalize tech stack choices
   - Design system architecture diagram
   - Document integration approach

2. **Epic & Story Breakdown** (1 day)
   - Run: `/bmad:bmm:workflows:create-epics-and-stories`
   - Create implementable stories with clear acceptance criteria
   - Prioritize stories for iterative development
   - Estimate story points

3. **Sprint Planning** (Half day)
   - Run: `/bmad:bmm:workflows:sprint-planning`
   - Organize stories into sprints
   - Identify dependencies and blockers
   - Set sprint goals

4. **Development** (4-6 weeks)
   - Implement epics iteratively
   - Run: `/bmad:bmm:workflows:dev-story` for each story
   - Continuous integration and testing
   - Code reviews via: `/bmad:bmm:workflows:code-review`

---

_This PRD captures the essence of the Eventric tour management backend - **the intelligence layer that transforms hours of manual rider comparison into seconds of automated, accurate venue compatibility scoring, giving tour managers confidence and time back**._

_Created through collaborative discovery between Product Builder and AI facilitator._
