# AI-DATA-ANALYST-BI-AGENT

### AI-Powered Data Analyst & Business Intelligence Platform

An AI-assisted business intelligence application that accepts structured business data, performs deterministic analysis, generates meaningful visualizations, and answers natural-language business questions using computed evidence.

---

## Overview

**AI-DATA-ANALYST-BI-AGENT** is being developed as a practical AI-powered analytics system for structured business data.

The application is designed to combine deterministic analytics with an LLM interpretation layer so that business users can move from raw data to meaningful insights and recommendations.

### Core principle

> **Analytics calculates the numbers. The LLM interprets the evidence.**

The LLM is not treated as the source of numerical truth. Business metrics are calculated from the underlying dataset before results are provided to the AI for interpretation.

---

## Problem Statement

Businesses often store valuable information in spreadsheets and structured datasets. Extracting useful answers from this data can require manual preparation, analysis, and interpretation.

This project aims to provide a practical analytics assistant that can:

* Accept structured business datasets
* Validate and clean data
* Profile dataset structure and quality
* Perform descriptive and business analysis
* Generate useful visualizations
* Answer natural-language business questions
* Interpret computed results using an LLM
* Generate insights and recommendations
* Export a summary report

---

## Objective

The objective is to build an AI-assisted analytics application that:

1. Accepts structured business data.
2. Validates and cleans the input.
3. Profiles columns and data quality.
4. Performs deterministic analysis.
5. Generates charts and analytical tables.
6. Answers business questions using computed evidence.
7. Uses an LLM to explain the results.
8. Generates practical insights and recommendations.
9. Provides a downloadable analytical report.

---

## MVP Scope

The required MVP includes:

* CSV/XLSX upload or sample dataset ingestion
* Data cleaning and validation
* Automated descriptive analysis
* At least four useful visualizations
* Natural-language question interface
* LLM-assisted interpretation grounded in computed results
* Insight and recommendation generation
* Downloadable summary/report
* Clear data dictionary

---

## System Architecture

![AI Analyst Architecture](docs/AI%20structure.png)

---



### Numerical source of truth

The analytics layer uses deterministic calculations with Pandas/NumPy.

The LLM receives computed evidence and is instructed to:

* Use only the supplied evidence
* Avoid inventing metrics
* Avoid fabricating values
* Clearly state when information is unavailable
* Explain results in practical business language
* Provide recommendations supported by the available analysis

This design directly addresses the project's acceptance criteria around numerical correctness and preventing unsupported metrics.

---

## Technology Stack

| Area                 | Technology   |
| -------------------- | ------------ |
| Programming Language | Python       |
| Web Application      | Streamlit    |
| Data Processing      | Pandas       |
| Numerical Analysis   | NumPy        |
| Visualization        | Plotly       |
| LLM                  | OpenAI API   |
| Report Generation    | ReportLab    |
| Testing              | Pytest       |
| Version Control      | Git / GitHub |

---
## Setup
Prerequisites

Before running the application locally, make sure you have:

Python 3.10 or later
Git
An OpenAI API key for the LLM functionality
1. Clone the repository
git clone <repository-url>
cd ai-data-analyst-bi-agent
2. Create a virtual environment
python -m venv .venv
3. Activate the virtual environment

Windows

.venv\Scripts\activate

macOS / Linux

source .venv/bin/activate
4. Install dependencies
pip install -r requirements.txt
5. Configure environment variables

Create a local .env file from the provided example:

copy .env.example .env

For macOS / Linux:

cp .env.example .env

Add the required API configuration to .env.

Never commit .env, API keys, tokens, or other secrets to GitHub.

6. Run the application
streamlit run app.py

The Streamlit application will start locally and provide the AI Data Analyst interface.

7. Run tests

Once the test suite is implemented, run:

pytest

Test execution will be used to validate data ingestion, cleaning, analytics, question answering, edge cases, and other critical application behavior.

## Example Usage

The Zenera BI Agent is designed around a simple business-analysis workflow.

### 1. Upload a Dataset

Upload a structured business dataset in CSV or XLSX format through the application.

Example dataset:

```text
Order_ID
Order_Date
Customer_ID
Product
Category
Region
Quantity
Unit_Price
Revenue
Cost
Profit
Payment_Method
```

### 2. Validate and Profile the Data

The application validates the uploaded dataset and provides information about:

* Number of rows and columns
* Data types
* Missing values
* Duplicate records
* Unique values
* Basic descriptive statistics
* Data dictionary information

### 3. Explore Business Metrics

The analytics layer calculates business metrics from the dataset, such as:

* Total revenue
* Total profit
* Number of orders
* Number of customers
* Average order value
* Profit margin
* Revenue by category
* Profit by region
* Revenue over time

### 4. Ask a Business Question

A user can ask a question using natural language.

Example:

> Which product category generated the highest revenue?

The system processes the question, performs the required deterministic calculation, and creates an evidence bundle containing the computed result.

### 5. Receive a Grounded AI Explanation

The computed evidence is passed to the LLM for interpretation.

Example workflow:

```text
User Question
      ↓
Question Parsing
      ↓
Deterministic Analytics
      ↓
Computed Evidence
      ↓
LLM Interpretation
      ↓
Business Answer
```

The LLM is instructed to use the supplied evidence and avoid inventing unsupported values.

### 6. Generate Insights and Recommendations

The system can turn analytical results into practical business observations and recommendations.

Example:

> The South region generated the highest profit among the available regions. Management could investigate the products and customer segments contributing to this performance and evaluate whether similar strategies can be applied to lower-performing regions.

Recommendations are based on the available computed analysis rather than unsupported assumptions.

### Example Business Questions

The application is designed to support questions such as:

* Which category generated the highest revenue?
* Which region generated the highest profit?
* How has monthly revenue changed over time?
* Which products have low profit margins?
* What business recommendations can be made from the available data?


## Project Structure

```text
AI-DATA-ANALYST-BI-AGENT/
│
├── app.py
├── config.py
├── requirements.txt
├── .env.example
├── .gitignore
│
├── src/
│   ├── ingestion/
│   │   ├── loader.py
│   │   └── validator.py
│   │
│   ├── cleaning/
│   │   └── cleaner.py
│   │
│   ├── profiling/
│   │   └── profiler.py
│   │
│   ├── analytics/
│   │   ├── descriptive.py
│   │   └── metrics.py
│   │
│   ├── visualization/
│   │   └── charts.py
│   │
│   ├── nlq/
│   │   ├── query_parser.py
│   │   └── evidence_builder.py
│   │
│   ├── llm/
│   │   ├── client.py
│   │   ├── prompts.py
│   │   └── interpreter.py
│   │
│   ├── reporting/
│   │   └── report_builder.py
│   │
│   ├── state/
│   │   └── session_state.py
│   │
│   └── utils/
│       ├── logging_config.py
│       └── exceptions.py
│
├── ui/
│   ├── components.py
│   └── pages/
│       ├── 1_Upload.py
│       ├── 2_Explore.py
│       ├── 3_Ask.py
│       └── 4_Report.py
│
├── data/
│   ├── sample/
│   └── uploads/
│
├── outputs/
│   └── reports/
│
├── docs/
│   └── data_dictionary_template.md
│
└── tests/
```

---

## Analytical Workflow

```text
1. Upload Dataset
        ↓
2. Validate Data
        ↓
3. Clean Data
        ↓
4. Profile Dataset
        ↓
5. Calculate Metrics
        ↓
6. Generate Charts & Tables
        ↓
7. Ask Business Question
        ↓
8. Calculate Evidence
        ↓
9. LLM Interpretation
        ↓
10. Generate Insights
        ↓
11. Generate Recommendations
        ↓
12. Export Report
```

---

## Example Business Questions

The system will be designed to answer realistic business questions such as:

1. **Which product category generated the highest revenue?**
2. **Which region generated the highest profit?**
3. **How has monthly revenue changed over time?**
4. **Which products have low profit margins?**
5. **What business recommendations can be made from the available data?**

The project brief requires at least three realistic business questions to be answered end-to-end.

---

## Planned Visualizations

The MVP will include at least four useful business visualizations:

### 1. Revenue Trend

Shows how revenue changes over time.

### 2. Revenue by Category

Compares performance across product categories.

### 3. Profit by Region

Highlights regional profitability.

### 4. Profit Margin by Product

Identifies products with stronger or weaker margins.

Charts will be labelled and designed to support business interpretation rather than simply display data.

---

## Data Quality & Validation

The application will be tested against representative scenarios including:

* Valid CSV input
* Valid XLSX input
* Missing values
* Duplicate records
* Empty datasets
* Invalid or unsupported files
* Invalid data structures
* Questions involving unavailable metrics
* Numerical answer verification

A reproducible validation/test set will be maintained to demonstrate both successful workflows and failure handling.

---

## Security

The project will follow basic security practices:

* API keys stored through environment variables
* No credentials committed to GitHub
* `.env` excluded through `.gitignore`
* `.env.example` provided as a configuration template
* Only authorized, owned, or sandboxed data used during development

The project brief explicitly requires that credentials, API keys, tokens, and sensitive company data are not committed.

---

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd AI-DATA-ANALYST-BI-AGENT
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

### 3. Activate the environment

**Windows**

```bash
.venv\Scripts\activate
```

**macOS/Linux**

```bash
source .venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure environment variables

Create a `.env` file using `.env.example` as the template.

Do not commit `.env`.

### 6. Run the application

```bash
streamlit run app.py
```

---

## Testing

Testing will cover:

### Happy Path

* Dataset upload
* Validation
* Cleaning
* Profiling
* Analytics
* Visualization
* Business questions
* Grounded AI interpretation
* Report generation

### Failure & Edge Cases

* Empty files
* Unsupported file types
* Missing values
* Duplicate records
* Invalid data
* Missing analytical metrics
* Unsupported questions
* LLM/API failures

The goal is to demonstrate that the system remains reliable when inputs or requested information are incomplete.

---

## Limitations

The initial MVP focuses on structured business datasets.

The following features are considered optional stretch functionality:

* Multiple datasets
* Automatic chart selection
* Forecasting
* Anomaly detection
* Conversational follow-up questions
* SQL database support

The project prioritizes a reliable core workflow before implementing these additional capabilities.

---

## Future Improvements

Potential future improvements include:

* Forecasting
* Anomaly detection
* Automatic chart recommendations
* Multiple dataset analysis
* Conversational follow-up questions
* SQL database integration
* Additional business domains

---

## Project Status

**Status: In Development**

The project is being developed as a practical AI-powered analytics application with emphasis on:

* Correctness
* Meaningful analysis
* Reliable outputs
* Usability
* Maintainability
* Testing and validation

---

## Delivery

The planned project deliverables include:

* GitHub repository
* Working MVP
* Architecture diagram
* README and setup documentation
* Data dictionary
* Reproducible validation/test set
* Technical report
* 5–10 minute demonstration
* Technical handover preparation

These deliverables follow the submission requirements in the project brief.

---

## Development Principle

> **Build the reliable analytics foundation first. Add AI on top of verified evidence.**

The project prioritizes a working, understandable, and testable core system over unnecessary feature complexity.
