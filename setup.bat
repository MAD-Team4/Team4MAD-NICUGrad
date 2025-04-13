@echo off
echo.
echo ========================================
echo  🚀 NICU Grad: Full Project Setup Script
echo ========================================

:: -------- BACKEND SETUP --------
echo 🔧 Setting up backend...
cd nicu_grad_backend

:: Step 1: Install backend dependencies
echo 📦 Installing backend packages...
npm install

:: Step 2: Write .env file
echo 📝 Setting up .env file...
(
  echo # Environment variables for Prisma
  echo DATABASE_URL="postgresql://nicu_db_user:g57MalTGanG8zpFEQdOoJmuAwK5PaqGI@dpg-cvtcfnp5pdvs739lh030-a.oregon-postgres.render.com/nicu_db"
) > .env

echo ✅ .env configured for Render PostgreSQL.

:: Step 3: Run Prisma generate + migrate
echo 🔄 Generating Prisma client...
npx prisma generate

echo 🔁 Running Prisma migration (dev)...
npx prisma migrate dev --name init

cd ..

:: -------- FRONTEND SETUP --------
echo 🔧 Setting up frontend...
cd nicu_grad_frontend

:: Step 1: Install frontend dependencies
echo 📦 Installing frontend packages...
npm install

:: Step 2: Prompt to start Expo
set /p startNow="✅ Setup complete! Do you want to start the Expo app now? (y/n): "
if /i "%startNow%"=="y" (
    npx expo start
)

cd ..

echo 🎉 All done! Your local setup is ready.
pause
