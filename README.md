# 🚀 TodoList API

**Управляйте задачами с легкостью!**  
Простое и мощное API для управления задачами, построенное на современных технологиях.

---

## 🛠 Технологии

<div align="left">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Bcrypt-000000?style=for-the-badge&logo=bcrypt&logoColor=white" alt="Bcrypt">
</div>

---

## 📦 Установка

1. **Клонируйте репозиторий**:

   ```bash
   git clone https://github.com/DenDevCoder/Todo--Nest-.git
   ```

2. **Установка зависимостей**

   ```bash
   npm install
   ```

3. **Настройка окружения**

   - Создайте файл .env в корне проекта
   - Заполните его по примеру

   ```bash

     # Connect to Supabase via connection pooling with Supavisor.
     DATABASE_URL=DATABASE_URL

     # Direct connection to the database. Used for migrations.
     DIRECT_URL=DIRECT_URL

     PORT = 3000

     SUPABASE_URL = SUPABASE_URL
     SUPABASE_KEY = SUPABASE_KEY
   ```

## 🚦 Запуск

1. **Запустите миграции prisma**

```bash
  npx prisma migrate dev --name init
```

2. **Запустите сервер**

```bash
  npm run start:dev
```

## 📂 Структура проекта

````bash
todolist-api/
├── src/
│   ├── auth/          # Модуль аутентификации
│   ├── task/          # Модуль управления задачами
│   ├── user/          # Модуль пользователей
│   ├── supabase/      # Модуль supabase
│   ├── types/         # Пользовательские типы
│   └── prisma/        # Конфигурация Prisma
├── .env               # Шаблон переменных окружения
└── README.md          # Этот файл```
````
