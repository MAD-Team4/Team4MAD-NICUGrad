# Team4MAD — NICU Grad Backend

This is the backend API for the NICU Grad mobile health tracking app. It uses **Node.js**, **Express**, **Prisma**, and **PostgreSQL**, and is deployed on **Render**.

---

## 📦 Tech Stack

- **Node.js** + **Express.js**
- **Prisma ORM**
- **PostgreSQL** (via Render)
- **Hosted on**: [Render.com](https://render.com)

---

## 🚀 Live API URL

> https://nicu-grad-api.onrender.com/

---

## 🧰 Requirements

- Node.js (18+ recommended)
- npm
- GitHub access to the repository
- Access to Render Dashboard (for managing deployments and database)

---

## 🛠 Local Development Setup

1. **Clone the repo:**

   ```bash
   git clone https://github.com/YOUR_ORG/nicu-grad.git
   cd nicu_grad_backend

    Install dependencies:

npm install

Create .env file:

Inside the nicu_grad_backend folder, create a file named .env and paste this:

DATABASE_URL="postgresql://nicu_db_user:g57MalTGanG8zpFEQdOoJmuAwK5PaqGI@dpg-cvtcfnp5pdvs739lh030-a.oregon-postgres.render.com/nicu_db"

Generate Prisma Client:

npx prisma generate

(Optional) Run Local Migrations:

    npx prisma migrate dev --name init

🔄 Keeping in Sync with Render

After schema updates:

npx prisma migrate dev --name some_change
git add .
git commit -m "Updated schema"
git push origin your-branch

Then on Render (via shell):

npx prisma migrate deploy

📂 Project Structure

nicu_grad_backend/
├── prisma/
│   └── schema.prisma
├── index.js
├── .env                # Local database connection
├── package.json
└── render.yaml         # Render deployment config

🔗 Useful Commands
Task	Command
Start dev server	npm start or node index.js
Prisma generate	npx prisma generate
Migrate (local)	npx prisma migrate dev --name init
Migrate (Render)	npx prisma migrate deploy