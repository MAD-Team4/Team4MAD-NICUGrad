@echo off
echo ========================================
echo  🚀 NICU Grad: Full Project Setup Script
echo ========================================

:: -------- BACKEND SETUP --------
cd nicu_grad_backend
echo ✅ Inside backend folder

echo Installing backend dependencies...
npm install
echo ✅ Backend dependencies installed

echo Writing .env file...
(
  echo DATABASE_URL="postgresql://nicu_db_user:g57MalTGanG8zpFEQdOoJmuAwK5PaqGI@dpg-cvtcfnp5pdvs739lh030-a.oregon-postgres.render.com/nicu_db"
) > .env
echo ✅ .env file written

echo Running Prisma generate...
npx prisma generate
echo ✅ Prisma client generated

echo Running Prisma migration...
npx prisma migrate dev --name init
echo ✅ Prisma migration complete

cd ..

:: -------- FRONTEND SETUP --------
cd nicu_grad_frontend
echo ✅ Inside frontend folder

echo Installing frontend dependencies...
npm install
echo ✅ Frontend dependencies installed

set /p startNow="Do you want to start the Expo app now? (y/n): "
if /i "%startNow%"=="y" (
    npx expo start
)

cd ..
echo ✅ All done.
pause
