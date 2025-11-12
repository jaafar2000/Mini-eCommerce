# Mini eCommerce Product Module

**Author:** Jaafar Youssef  
**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Drizzle ORM, PostgreSQL (Neon)  
**Deployment:** Vercel - My AWS account is temporarily restricted due to a **technical issue**, so I used **Vercel** for deployment in this demo.

---

## Overview

This is a simple full-stack Mini eCommerce module that allows users to:
- View products by category
- Add new products
- Filter by category
- Track stock status
- Delete products 

It’s designed as a lightweight production-ready architecture following modern Next.js standards with serverless API routes and a Postgres backend.

---

## Tech Stack Justification

| Layer | Tech | Reason |
|-------|------|--------|
| Frontend | **Next.js 15 + TypeScript** | Modern SSR/ISR capabilities and a clean developer experience. |
| Styling | **Tailwind CSS** | Rapid, responsive UI styling without unnecessary dependencies. |
| Database | **PostgreSQL (Neon)** | Reliable SQL database with free cloud hosting. |
| ORM | **Drizzle ORM** | Typesafe, schema-first ORM optimized for modern frameworks. |
| Hosting | **Vercel** | Perfect for serverless Next.js apps and easy CI/CD integration. |

---

## Architecture Overview

**Frontend:** Next.js App Router + Tailwind  
**Backend:** Next.js API Routes (`/api/products`)  
**Database:** Neon Postgres (connected via Drizzle ORM)  
**Hosting:** Vercel  
**Cloud Suggestion (AWS):**
- API can be hosted on **EC2**
- Product images can be stored in **S3**
- RDS PostgreSQL can be used for the database

**Flow:**
1. User interacts with the product form.
2. API route handles CRUD operations.
3. Data is stored/fetched from Neon PostgreSQL.
4. Frontend re-renders via dynamic fetch.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/products` | Fetch all products |
| POST | `/api/products` | Add a new product |
| DELETE | `/api/products/:id` | Delete a specific product |

---

## Example Product Fields

```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "price": 120.0,
  "category": "Electronics",
  "in_stock": true
}
```
## Live Demo

The project is deployed and running live here:  
**[live demo](https://task-tawny-nu-85.vercel.app/)**  

(Deployed on **Vercel** due to temporary AWS technical restrictions.  
The code remains fully compatible with AWS EC2, RDS, and S3.)

