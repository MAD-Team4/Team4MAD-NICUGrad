# Team4MAD — NICU Grad App

NICU Grad is a mobile health tracking app designed to help parents transition their infants from the NICU to home. This repository includes:

- 🖥️ **Backend** (Express + Prisma + PostgreSQL)
- 📱 **Frontend** (React Native with Expo Go)

---

## 🚀 Quick Start (Local Dev)

```bash
git clone  https://github.com/MAD-Team4/Team4MAD-NICUGrad.git
cd nicu-grad
```

Then follow these setup steps:

---

## 🔧 Backend Setup (Node.js + Prisma + PostgreSQL)

1. Navigate to the backend folder:

```bash
cd nicu_grad_backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with this content:

```env
DATABASE_URL="postgresql://nicu_db_user:g57MalTGanG8zpFEQdOoJmuAwK5PaqGI@dpg-cvtcfnp5pdvs739lh030-a.oregon-postgres.render.com/nicu_db"
```

4. Generate the Prisma client:

```bash
npx prisma generate
```

5. (Optional) Run local migration:

```bash
npx prisma migrate dev --name init
```

> ✅ Your backend API should now be ready.

---

## 🌐 Render Deployment

The backend is deployed via [Render](https://render.com/).

- **Live API URL**:

  ```
  https://nicu-grad-api.onrender.com/
  ```

If you update your Prisma schema:

```bash
npx prisma migrate dev --name some_change
git add .
git commit -m "Updated schema"
git push origin your-branch
```

Then deploy to Render:

```bash
npx prisma migrate deploy
```

---

## 📱 Frontend Setup (React Native + Expo)

1. Navigate to the frontend folder:

```bash
cd ../nicu_grad_frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the Expo development server:

```bash
npx expo start
```

4. Scan the QR code with the **Expo Go app** on your mobile device.

---

## 📂 Project Structure

```
nicu-grad/
├── nicu_grad_backend/   # Express backend with Prisma
│   ├── index.js
│   ├── prisma/
│   └── .env
├── nicu_grad_frontend/  # Expo + React Native frontend
│   ├── app/
│   ├── index.js
└── README.md
```

---

## 🧰 Commands Reference

| Task                        | Command                              |
|----------------------------|--------------------------------------|
| Start backend              | `cd nicu_grad_backend && node index.js` |
| Start frontend (Expo)      | `cd nicu_grad_frontend && npx expo start` |
| Install backend packages   | `npm install` (in backend folder)    |
| Install frontend packages  | `npm install` (in frontend folder)   |
| Prisma generate            | `npx prisma generate`                |
| Prisma migrate (local)     | `npx prisma migrate dev --name init` |
| Prisma migrate (Render)    | `npx prisma migrate deploy`          |

---

## ✅ You're All Set

Once both backend and frontend are installed, you can:

- Start your backend via `node index.js`
- Run your frontend with `npx expo start`
- Develop fully locally, with the backend connected to your Render PostgreSQL instance
