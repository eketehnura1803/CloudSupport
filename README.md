# CloudSupport

Serverless Helpdesk and Support Ticket Management System on AWS

---

## Overview

CloudSupport is a serverless ticket management system built on AWS.

The system allows users to:

- Create support tickets
- View all existing tickets
- Update ticket status
- Delete tickets

The project demonstrates a complete cloud-native architecture using AWS services, GitHub, GitHub Actions, CI/CD automation, monitoring, HTTPS, and DNS management.

---

## Features

### User Features

- Create support tickets
- View submitted tickets
- Track ticket status

### Admin Features

- View all tickets
- Update ticket status
- Delete tickets

---

## Architecture

### Frontend

- HTML
- CSS
- JavaScript
- Amazon S3
- Amazon CloudFront

### Backend

- Amazon API Gateway
- AWS Lambda
- Amazon DynamoDB

### Infrastructure

- Amazon Route 53
- AWS Certificate Manager (ACM)
- Amazon CloudWatch

### CI/CD

- GitHub
- GitHub Actions

---

## AWS Services Used

| Service | Purpose |
|----------|----------|
| Amazon S3 | Static website hosting |
| Amazon CloudFront | Global content delivery and HTTPS |
| Amazon Route 53 | DNS and domain management |
| AWS Certificate Manager (ACM) | SSL/TLS certificate |
| Amazon API Gateway | REST API management |
| AWS Lambda | Serverless backend processing |
| Amazon DynamoDB | Ticket storage |
| Amazon CloudWatch | Monitoring and logs |
| IAM | Access and permission management |

---

## API Endpoints

### Get Tickets

```http
GET /tickets
```

Returns all support tickets.

### Create Ticket

```http
POST /tickets
```

Creates a new support ticket.

### Update Ticket

```http
PATCH /tickets/{ticketId}
```

Updates an existing ticket.

### Delete Ticket

```http
DELETE /tickets/{ticketId}
```

Deletes a ticket.

---

## CI/CD Pipeline

GitHub Actions automatically performs:

1. Frontend file validation
2. Backend Python syntax validation
3. Deployment of frontend files to Amazon S3
4. CloudFront cache invalidation

Deployment is triggered automatically whenever changes are pushed to the main branch.

---

## Repository Structure

```text
CloudSupport
│
├── .github
│   └── workflows
│       └── deploy-frontend.yml
│
├── frontend
│   ├── index.html
│   ├── admin.html
│   ├── css
│   └── js
│
├── backend
│   └── lambda_function.py
│
└── README.md
```

---

## Monitoring

The application is monitored using Amazon CloudWatch.

CloudWatch provides:

- Lambda invocation metrics
- Execution duration metrics
- Error monitoring
- Log management
- Performance visibility

---

## Security

The project uses:

- IAM Roles for AWS Lambda
- IAM User for GitHub Actions deployment
- HTTPS via ACM Certificate
- Route 53 DNS management
- Secure access to AWS resources

No AWS secrets are stored in the source code.

GitHub Secrets are used for deployment credentials.

---

## Live Demo

https://cloudsupport-nura.proj.rotem.click

---

## Development Workflow

1. Create feature branch
2. Implement changes
3. Create Pull Request
4. Review and merge into main
5. GitHub Actions deploys automatically
6. CloudFront serves updated website

---

## Team Members

- Nura Eketeh
- Team Project Members

---

## Course

Cloud Computing and Development

Final AWS Serverless Project