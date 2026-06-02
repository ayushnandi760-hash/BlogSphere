# BlogSphere 🌐

A modern, full-stack blogging platform built with **Spring Boot 3** and **React + Vite**. BlogSphere enables users to register, publish rich blog posts, manage their profile, and discover content from others — all secured behind JWT-based authentication.

> **Live Demo:** *Deploy to Render + Vercel using the guide below.*

---

## ✨ Features

| Feature | Details |
|---|---|
| **JWT Authentication** | Stateless Bearer token auth with BCrypt password hashing |
| **Blog CRUD** | Create, read, update, delete blog posts with authorization guards |
| **Author Profiles** | Custom bio, avatar, and profile editing |
| **Full-text Search** | Keyword search across blog titles and content |
| **Category Filtering** | Browse posts by Technology, Lifestyle, Travel, etc. |
| **Dark Mode** | System-aware dark/light toggle persisted to `localStorage` |
| **Skeleton Loading** | Shimmer card animations during API data fetches |
| **Toast Notifications** | Contextual success/error/warning/info toasts across all flows |
| **Responsive Design** | Mobile-first layout with a hamburger navigation drawer |
| **Protected Routes** | Frontend route guards redirect unauthenticated users to Login |

---

## 🏗️ Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Framework | Spring Boot 3.3 |
| Language | Java 17 |
| Security | Spring Security 6 + JJWT 0.11.5 |
| Database | MySQL 8 (via Spring Data JPA / Hibernate) |
| Build Tool | Maven |
| Utilities | Lombok, Jakarta Validation |

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router DOM v6 |
| HTTP Client | Axios (with request/response interceptors) |
| State | React Context API (AuthContext, ToastContext) |

---

## 📁 Project Structure

```
BlogSphere/
├── backend/                          # Spring Boot application
│   ├── src/main/java/com/blogsphere/
│   │   ├── controller/               # REST API controllers
│   │   │   ├── AuthController.java   # POST /api/auth/login, /register
│   │   │   ├── BlogController.java   # CRUD /api/blogs/**
│   │   │   └── UserController.java   # GET/PUT /api/users/profile
│   │   ├── dto/                      # Data Transfer Objects (request/response)
│   │   ├── entity/                   # JPA entities (User, Blog)
│   │   ├── repository/               # Spring Data JPA repositories
│   │   ├── service/                  # Business logic layer
│   │   ├── security/                 # JWT filter, entry point, UserDetails
│   │   └── exception/                # GlobalExceptionHandler
│   └── src/main/resources/
│       └── application.properties    # Environment-aware configuration
│
├── frontend/                         # React + Vite application
│   ├── src/
│   │   ├── context/                  # AuthContext, ToastContext
│   │   ├── components/               # Navbar, Footer, BlogCard, SkeletonCard...
│   │   ├── layouts/                  # MainLayout, AuthLayout
│   │   ├── pages/                    # Home, BlogList, BlogDetails, Login...
│   │   ├── services/                 # Axios API service modules
│   │   └── hooks/                    # useAuth custom hook
│   └── vite.config.js                # Dev proxy to backend at :8080
│
├── BlogSphere.postman_collection.json # API test collection
└── README.md
```

---

## 🚀 Local Development Setup

### Prerequisites
- **Java 17+** — [Download](https://adoptium.net/)
- **Maven 3.9+** — [Download](https://maven.apache.org/download.cgi)
- **Node.js 18+** — [Download](https://nodejs.org/)
- **MySQL 8** — [Download](https://dev.mysql.com/downloads/)

---

### 1. Database Setup

Open MySQL and run:

```sql
CREATE DATABASE blogsphere_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Hibernate will auto-create all tables on first boot (`ddl-auto=update`).

---

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Configure environment variables (or edit application.properties directly)
# Default values: localhost:3306, root/password

# Build and run
./mvnw spring-boot:run
```

The backend will start on **http://localhost:8080**.

**Environment Variables** (override `application.properties` defaults):

| Variable | Default | Description |
|---|---|---|
| `DB_HOST` | `localhost` | MySQL host |
| `DB_PORT` | `3306` | MySQL port |
| `DB_NAME` | `blogsphere_db` | Database name |
| `DB_USERNAME` | `root` | MySQL username |
| `DB_PASSWORD` | `password` | MySQL password |

> ⚠️ **For production**, set a strong `blogsphere.app.jwtSecret` value (256-bit hex string).

---

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on **http://localhost:3000** and proxy all `/api` requests to the backend at port 8080.

---

## 🔌 API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new account |
| `POST` | `/api/auth/login` | Public | Obtain JWT token |

### Blogs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/blogs` | Public | List all blog posts |
| `GET` | `/api/blogs/{id}` | Public | Get a single post |
| `GET` | `/api/blogs/search?keyword=` | Public | Full-text search |
| `GET` | `/api/blogs/author/{authorId}` | Public | Posts by author |
| `POST` | `/api/blogs` | 🔒 Bearer | Create new post |
| `PUT` | `/api/blogs/{id}` | 🔒 Bearer (author only) | Update post |
| `DELETE` | `/api/blogs/{id}` | 🔒 Bearer (author only) | Delete post |

### User Profile

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/users/profile` | 🔒 Bearer | Get own profile |
| `PUT` | `/api/users/profile` | 🔒 Bearer | Update profile |

**Authorization Header format:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🧪 Testing with Postman

1. Open **Postman** and click **Import**.
2. Import `BlogSphere.postman_collection.json` from the project root.
3. Set the `base_url` collection variable to `http://localhost:8080` (already set by default).
4. Run the **Login** request — the JWT is automatically saved to the `jwt_token` collection variable via the test script.
5. All protected requests will now auto-include the `Authorization: Bearer ...` header.

---

## ☁️ Deployment Guide

### Backend → Render (Free Web Service)

1. Push your repository to GitHub.
2. Go to [render.com](https://render.com) → **New → Web Service**.
3. Connect your GitHub repo and select the `backend/` directory.
4. Configure the service:

| Setting | Value |
|---|---|
| **Environment** | `Java` |
| **Build Command** | `./mvnw clean package -DskipTests` |
| **Start Command** | `java -jar target/blogsphere-0.0.1-SNAPSHOT.jar` |
| **Root Directory** | `backend` |

5. Add the following **Environment Variables** in the Render dashboard:

```
DB_HOST         = <your_mysql_host>
DB_PORT         = 3306
DB_NAME         = blogsphere_db
DB_USERNAME     = <your_db_user>
DB_PASSWORD     = <your_db_password>
blogsphere.app.jwtSecret = <your_256bit_hex_secret>
blogsphere.app.jwtExpirationMs = 86400000
```

> **MySQL on Render:** Use [Render's managed MySQL (paid)](https://render.com/docs/databases) or a free external provider like [PlanetScale](https://planetscale.com/) or [Railway](https://railway.app/).

Your backend API will be available at: `https://blogsphere-api.onrender.com`

---

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project → Import Git Repository**.
2. Select your GitHub repo and configure:

| Setting | Value |
|---|---|
| **Root Directory** | `frontend` |
| **Framework Preset** | `Vite` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

3. Add the following **Environment Variable** in the Vercel dashboard:

```
VITE_API_BASE_URL = https://blogsphere-api.onrender.com
```

4. Update `frontend/src/services/api.js` to use the env variable for production:

```js
// In api.js — replace the hardcoded baseURL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});
```

5. Add a `vercel.json` in the `frontend/` root to handle SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Your frontend will be live at: `https://blogsphere.vercel.app`

---

## 🔒 Security Considerations for Production

- **Change the JWT Secret:** Replace the default hex secret in `application.properties` with a strong, randomly generated 256-bit key.
- **Restrict CORS:** Change `@CrossOrigin(origins = "*")` on all controllers to your specific Vercel frontend URL.
- **Disable SQL Logging:** Set `spring.jpa.show-sql=false` and remove `TRACE` logging in production.
- **Use HTTPS Only:** Ensure both Render and Vercel services enforce HTTPS (both do by default).
- **Environment Variables:** Never commit secrets to Git. Use `.env` files locally and platform environment variables in production.

---

## 🧩 Key Design Decisions

**Why Stateless JWT?**
Stateless tokens eliminate the need for a session store, making the backend horizontally scalable — any instance can validate any token.

**Why DTOs?**
DTOs (`BlogDTO`, `UserDTO`, etc.) decouple the API contract from the JPA entity model, preventing internal implementation details (like passwords or database IDs) from leaking into responses.

**Why Context API over Redux?**
The app's global state is minimal (auth session + toasts). React Context API handles this cleanly without the boilerplate overhead of Redux.

**Why DiceBear Avatars?**
Provides instant, unique, beautiful default avatars without requiring users to upload a photo during registration — reducing friction.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

*Built with ❤️ using Spring Boot 3 & React.*
