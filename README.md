# 🚀 DevOps Task Manager Platform

Production-ready microservices platform built to demonstrate end-to-end DevOps practices.

## 🏗️ Architecture

- **Frontend** — React + Vite (nginx)
- **Backend** — Python FastAPI
- **Database** — PostgreSQL
- **Cache** — Redis
- **AI Service** — Groq LLM (coming soon)

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Containers | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Orchestration | Kubernetes (EKS) |
| IaC | Terraform |
| Monitoring | Prometheus, Grafana |
| Cloud | AWS (EKS, ECR, RDS, SQS, VPC) |

## 🚦 Quick Start

```bash
git clone https://github.com/UrsusVeritas/devops-task-manager
cd devops-task-manager
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/docs

## 📦 Project Status

- [x] Docker & Docker Compose
- [ ] GitHub Actions CI/CD
- [ ] Kubernetes (EKS)
- [ ] Terraform Infrastructure
- [ ] AI Service (Groq)
- [ ] Monitoring (Prometheus + Grafana)
