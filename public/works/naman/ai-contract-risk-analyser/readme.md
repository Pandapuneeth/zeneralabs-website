# AI Contract Analysis & Risk Detection

[![Python](https://img.shields.io/badge/Python-3.11%2B-blue)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115%2B-green)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Docker-ready-blue)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Assistive AI-powered contract review and risk detection system.**

---

## ⚠️ Legal Disclaimer

> **This system provides contract analysis assistance and does not provide legal advice.**  
> Findings should be reviewed by a qualified legal professional.  
> This tool is designed to assist, not replace, licensed legal practitioners.

---

## About

**AI Contract Analysis & Risk Detection** is an assistive document-intelligence system that enables legal reviewers to upload contracts, automatically extract and normalize content, identify clauses and sections, retrieve relevant passages, detect predefined contract risk categories, and present structured findings with direct evidence from the source document.

The system is built as a modern full-stack application with a FastAPI backend and a React frontend, designed for modularity, testability, and security.

---

## Problem Statement

Contract review is one of the most time-consuming and repetitive tasks in legal practice. Reviewers must manually read dense legal documents to identify:

- Unfavorable or one-sided terms
- Missing critical protections
- Ambiguous liability or IP clauses
- Unfavorable governing law or jurisdiction terms
- Payment and termination risks

An AI-assisted system can accelerate this process by automatically extracting key information, identifying common risk patterns, and providing evidence-backed findings—all while maintaining traceability to the original source document.

---

## Core Workflow

```text
User Upload
  → Document Validation
  → Text Extraction (page-preserving)
  → Text Normalization
  → Document Chunking
  → Clause / Section Identification
  → Vector Indexing
  → Retrieve Relevant Evidence
  → Risk Detection
  → Evidence Verification
  → Structured Analysis Output
  → Reviewer Interface
  → Source Passage Inspection
```

### Retrieval-Based Question Answering

```text
User Question
  → Query Processing
  → Retriever (Vector Search)
  → Relevant Contract Chunks
  → LLM Analysis
  → Answer + Evidence
  → Source Reference
```

---

## Key Features

### ✅ Implemented
- PDF upload with file validation (type, size, MIME)
- Text extraction with page boundary preservation (`pdfplumber` + `PyPDF2` fallback)
- Text normalization and clause-aware chunking
- Clause and section identification
- ChromaDB vector store with `sentence-transformers` embeddings
- Retrieval-based question answering via OpenRouter LLM
- Risk detection for 12 predefined categories
- Evidence tracing with page, section, and chunk references
- Structured JSON analysis output with Pydantic validation
- React reviewer dashboard with drag-and-drop upload
- Legal disclaimer prominently displayed
- Comprehensive test suite (32 tests)
- Docker Compose deployment
- Security hardening (path traversal prevention, filename sanitization, safe temp storage, prompt injection defense)

### 🚧 Planned
- Multi-contract search and comparison
- Contract version diffing
- Clause rewrite suggestions
- Export analysis as PDF and JSON
- Additional risk categories and severity tuning
- Multi-language support

### 🔮 Stretch
- OCR support for scanned PDFs
- Multi-user collaboration and annotations
- Contract template recommendations
- Integration with CLM platforms

---

## Architecture

![Architecture](Architecture.png)

### System Components

```text
                    ┌─────────────────┐
                    │     Reviewer    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    Frontend     │
                    │   (React/Vite)  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Backend API   │
                    │   (FastAPI)     │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌───────────┐  ┌────────────┐  ┌─────────────┐
        │ Document  │  │ Retrieval  │  │ Risk        │
        │ Pipeline  │  │ System     │  │ Detection   │
        └─────┬─────┘  └─────┬──────┘  └──────┬──────┘
              │              │                │
              ▼              ▼                ▼
        ┌───────────┐  ┌────────────┐  ┌─────────────┐
        │ Extraction│  │ Vector     │  │ LLM /       │
        │ & Chunking│  │ Store      │  │ Analysis    │
        └───────────┘  └────────────┘  └─────────────┘
                             │
                             ▼
                       ┌────────────┐
                       │ Evidence   │
                       │ References │
                       └────────────┘
```

---

## Technology Stack

### Backend
| Component | Technology |
|-----------|-----------|
| Language | Python 3.11+ |
| Framework | FastAPI |
| Document Processing | `pdfplumber`, `PyPDF2` |
| Embeddings | `sentence-transformers` (`all-MiniLM-L6-v2`) |
| Vector Database | ChromaDB |
| LLM Provider | OpenRouter API |
| Validation | Pydantic v2 |
| Testing | pytest, pytest-asyncio, httpx |

### Frontend
| Component | Technology |
|-----------|-----------|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Routing | React Router v6 |

### DevOps
| Component | Technology |
|-----------|-----------|
| Containerization | Docker, Docker Compose |
| Process Manager | Uvicorn |

---

## Project Structure

```
ai-contract-risk-analyzer/
├── README.md
├── SYSTEM_REQUIRMENTS.MD
├── SECURITY.MD
├── FEATURE_REQUIRMENT.MD
├── SKILLS.md
├── .gitignore
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── Architecture.png
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── health.py
│   │   │   │   ├── documents.py
│   │   │   │   └── analysis.py
│   │   │   └── dependencies/
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── logging.py
│   │   ├── models/
│   │   │   └── document.py
│   │   ├── schemas/
│   │   │   └── analysis.py
│   │   ├── services/
│   │   │   ├── document.py
│   │   │   ├── retrieval/
│   │   │   │   └── vector_store.py
│   │   │   ├── risk/
│   │   │   │   └── detector.py
│   │   │   ├── llm/
│   │   │   │   └── openrouter.py
│   │   │   └── analysis/
│   │   │       └── engine.py
│   │   ├── security/
│   │   └── utils/
│   │       └── text.py
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── security/
│   ├── requirements.txt
│   └── pyproject.toml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── Dockerfile
│   └── nginx.conf
├── data/
│   └── sample/
│       ├── sample_contract.pdf
│       ├── low_risk_contract.pdf
│       └── high_risk_contract.pdf
└── scripts/
    ├── generate_sample_contract.py
    ├── generate_low_risk_contract.py
    └── generate_high_risk_contract.py
```

---

## Installation & Setup

### Prerequisites

- **Python** 3.11 or higher
- **Node.js** 18 or higher
- **Git**
- **Docker** and Docker Compose (optional, for containerized deployment)
- **OpenRouter API Key` for LLM access

### Local Development

#### 1. Clone the Repository

```bash
git clone https://github.com/Zenera-Labs/ai-contract-risk-analyzer.git
cd ai-contract-risk-analyzer
```

#### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn app.main:app --reload
```

The backend will be available at `http://localhost:8000`.

#### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### Docker Deployment

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build
```

Services:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- API Docs (Swagger): `http://localhost:8000/docs`

---

## Configuration

Create a `.env` file in the project root based on `.env.example`:

```env
# OpenRouter Configuration
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=openai/gpt-4o-mini

# Embedding Configuration
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2

# Upload Configuration
UPLOAD_MAX_SIZE_MB=20
UPLOAD_ALLOWED_EXTENSIONS=pdf

# Chunking Configuration
CHUNK_SIZE=500
CHUNK_OVERLAP=100

# Retrieval Configuration
RETRIEVAL_TOP_K=5

# Application Configuration
APP_NAME=AI Contract Analysis
APP_VERSION=0.1.0
DEBUG=false
LOG_LEVEL=INFO

# CORS Configuration
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENROUTER_API_KEY` | API key for OpenRouter LLM provider | *(required)* |
| `OPENROUTER_MODEL` | Model identifier for analysis | `openai/gpt-4o-mini` |
| `EMBEDDING_MODEL` | Sentence-transformers model for chunk embeddings | `sentence-transformers/all-MiniLM-L6-v2` |
| `UPLOAD_MAX_SIZE_MB` | Maximum upload file size in MB | `20` |
| `CHUNK_SIZE` | Target chunk size in characters | `500` |
| `CHUNK_OVERLAP` | Character overlap between chunks | `100` |
| `RETRIEVAL_TOP_K` | Number of chunks to retrieve for QA | `5` |

---

## Usage Guide

### 1. Upload a Contract

Navigate to the home page and upload a PDF contract using the drag-and-drop zone or file picker.

Supported formats: **PDF only** (MVP).

### 2. Automatic Analysis

Once uploaded, the system will:
- Extract text while preserving page numbers
- Normalize and chunk the document
- Identify clauses and sections
- Index chunks for retrieval
- Detect predefined risk categories
- Verify evidence for each finding

### 3. Review Findings

The analysis dashboard displays:
- **Summary** — overview, total risk count, severity breakdown
- **Identified Clauses** — presence/absence of standard contract sections
- **Risk Findings** — title, severity, description, evidence snippet, page number, section, confidence score

### 4. Inspect Evidence

Every risk finding includes:
- Exact evidence quote from the source document
- Page number
- Section / clause identifier
- Source chunk ID for traceability

### 5. Ask Questions

Use the Q&A interface to ask questions about the uploaded contract. The system will:
- Retrieve relevant contract passages
- Generate an evidence-grounded answer
- Cite the source page and section

---


## API Reference

### Base URL

```
http://localhost:8000/api
```

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/documents/upload` | Upload a PDF contract |
| `POST` | `/analysis/analyze` | Run full analysis on a document |
| `POST` | `/analysis/question` | Ask a question about a document |

### Example: Upload Document

```bash
curl -X POST "http://localhost:8000/api/documents/upload" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@contract.pdf"
```

### Example: Analyze Document

```bash
curl -X POST "http://localhost:8000/api/analysis/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "document_id": "uuid",
    "filename": "contract.pdf",
    "file_path": "/tmp/uploads/...",
    "content_type": "application/pdf",
    "size": 12345
  }'
```

### Example: Ask Question

```bash
curl -X POST "http://localhost:8000/api/analysis/question" \
  -H "Content-Type: application/json" \
  -d '{
    "document_id": "uuid",
    "question": "What is the termination notice period?"
  }'
```

Interactive API documentation is available at `http://localhost:8000/docs` when the backend is running.

---

## Risk Categories

The system detects risks across 12 predefined categories:

| # | Category | Description |
|---|----------|-------------|
| 1 | `missing_termination_protection` | No termination clause or unclear termination rights |
| 2 | `unfavorable_termination_terms` | One-sided termination rights, short notice, immediate termination |
| 3 | `automatic_renewal` | Contract automatically renews without explicit consent |
| 4 | `broad_indemnification` | Overly broad indemnification obligations |
| 5 | `unlimited_liability` | No cap on liability or unlimited damages |
| 6 | `unclear_liability_limitation` | Vague or ambiguous liability limitations |
| 7 | `ip_ambiguity` | Unclear intellectual property ownership or licensing |
| 8 | `confidentiality_concerns` | Overly broad confidentiality obligations or weak protections |
| 9 | `governing_law_concerns` | Unfavorable jurisdiction or governing law |
| 10 | `payment_risks` | Unfavorable payment terms, unclear schedule, or late payment penalties |
| 11 | `unfavorable_notice_periods` | Unreasonably short or long notice requirements |
| 12 | `data_privacy_concerns` | Weak data protection, unclear data handling, or compliance gaps |

### Severity Levels

| Level | Criteria |
|-------|----------|
| **HIGH** | Significant financial or legal exposure, one-sided terms, missing critical protections |
| **MEDIUM** | Moderate concern, could be negotiated, unclear terms that create ambiguity |
| **LOW** | Minor concern, standard industry term but worth noting |

---

## Testing

The project includes a reproducible test suite covering unit, integration, security, and edge-case scenarios.

```bash
cd backend
pytest
```

### Test Coverage

| Category | Tests |
|----------|-------|
| Unit | Text normalization, chunking, document validation, clause detection, hallucination checks |
| Integration | Health check, upload validation, analysis pipeline, question answering |
| Security | Path traversal, malicious filenames, unsupported extensions, oversized uploads, prompt injection, sensitive data leakage |
| Edge Cases | Valid/empty/corrupted PDFs, missing document handling |

---

## Security

Security is a first-class concern. Key measures include:

- **File Validation** — Type, size, and MIME validation before processing
- **Safe Storage** — Uploaded files stored with random, non-guessable names in temporary directories
- **Path Traversal Prevention** — Strict filename sanitization
- **Prompt Injection Defense** — Clear separation of system instructions, document content, and user questions
- **Secret Management** — No credentials in version control; environment variables only
- **Structured Logging** — Sensitive data excluded from logs
- **Input Validation** — All API endpoints validate input via Pydantic schemas

See [SECURITY.MD](SECURITY.MD) for the full security policy.

---

## Limitations

- This system **does not provide legal advice** and is intended for assistive use only
- Analysis is limited to the uploaded document(s)
- Risk detection covers predefined categories only
- LLM-based analysis may have inherent limitations and should be verified by a human reviewer
- Not a substitute for professional legal review
- PDF is the only supported format in the current MVP

---

## Roadmap

| Phase | Milestone | Status |
|-------|-----------|--------|
| 1 | Project Foundation | ✅ Complete |
| 2 | Document Pipeline | ✅ Complete |
| 3 | Retrieval & QA | ✅ Complete |
| 4 | Risk Detection | ✅ Complete |
| 5 | Frontend & UX | ✅ Complete |
| 6 | Testing & Docker | ✅ Complete |
| 7 | Multi-Contract Search | 🚧 Planned |
| 8 | Contract Comparison | 🚧 Planned |
| 9 | Clause Rewrite Suggestions | 🚧 Planned |
| 10 | Export (PDF/JSON) | 🚧 Planned |

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure all tests pass before submitting a PR.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*This README was generated for the AI Contract Analysis & Risk Detection system. For questions or issues, please open a GitHub issue.*