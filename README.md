# 📘 Sistema de Votaciones – API REST

API REST para gestionar un sistema de votaciones que incluye candidatos, votantes y votos.  
Construida con **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, **Prisma ORM** y autenticación mediante **JWT**.

---

## 🚀 Tecnologías utilizadas

- Node.js + Express  
- TypeScript  
- PostgreSQL  
- Prisma ORM  
- JSON Web Tokens (JWT)  
- Swagger (OpenAPI 3.0)

---

## 📦 Requisitos previos

Asegúrate de tener instalado:

- **Node.js**
- **npm** o **yarn**
- **PostgreSQL**
- **Git**

---

## 📁 Clonar el repositorio

```
git clone https://github.com/Kevinsqm/APIVotacionesNodeJS.git
cd tu-repo
```

---

## ⚙️ Instalar dependencias

```
npm install
```
---

## 🔧 Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto:

```
PORT=3000
JWT_SECRET=tu_secreto_super_seguro

DATABASE_URL=postgresql://usuario:password@localhost:5432/votaciones
```
Asegúrate de que la base de datos **votaciones** exista previamente.

---

## 🗄️ Configurar la base de datos

### 1. Generar el cliente de Prisma:
```
npx prisma generate
```

### 2. Ejecutar las migraciones:
```
npx prisma migrate dev
```

---

## ▶️ Ejecutar el proyecto en desarrollo
```
npm run dev
```
El servidor iniciará en
```
http://localhost:3000
```

---

## 📚 Documentación de la API (Swagger)
La documentación se encuentra disponible en:
```
http://localhost:3000/api-docs
```

---

## 🔐 Autenticación
El proyecto utiliza JWT para proteger rutas.

Los endpoints de /api/v1/auth/register y /api/v1/auth/login son públicos.
Los demás requieren incluir un **Authorization Header**:
```
Authorization: Bearer <token>
```

--- 

## Algunos ejemplos con Postman


![candidates](imagenes/candidates.png)

![voters](imagenes/voters.png)

![votes](imagenes/votes.png)

Estadisticas:

![estadisticas](imagenes/statistics.png)
