
# 🎬 MovieHub – Fullstack Movie Review Platform

MovieHub is a **fullstack MERN project** where users can browse movies, add reviews, maintain watchlists, and admins can manage movies.
Built with **Node.js + Express + MongoDB (backend)** and **React + Tailwind (frontend)**.

---

## 📂 Project Structure

```
MovieHub/
│── backend/       # Node.js + Express + MongoDB API
│── frontend/      # React + Tailwind client app
│── README.md      # Documentation
```

---

## ⚡ Features

* 👤 **Authentication** – Register, Login (JWT-based).
* 🎥 **Movies** – Browse, filter, search, pagination.
* ⭐ **Reviews** – Logged-in users can post reviews with ratings.
* 📌 **Watchlist** – Save movies to personal watchlist.
* 🛠️ **Admin Panel** – Add new movies.
* 🔒 **Security** – Helmet, CORS, Rate limiting, Input sanitization.

---

## 🚀 Setup & Installation

### 1️⃣ Clone Repo

```bash
git clone https://github.com/your-username/moviehub.git
cd moviehub
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in **backend/**:

```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/moviehub
JWT_SECRET=supersecret
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
CORS_ORIGINS=http://localhost:5173
NODE_ENV=development
```

Run backend:

```bash
npm run dev   # uses nodemon
```

Server starts at → `http://localhost:4000`

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` in **frontend/**:

```env
VITE_API_URL=http://localhost:4000/api
```

Run frontend:

```bash
npm run dev
```

Frontend starts at → `http://localhost:5173`

---

## 🗄️ Database Setup (MongoDB)

* Install & run **MongoDB Community Edition** or use **MongoDB Atlas**.
* Create a database `moviehub`.
* Collections will be auto-created:

  * `users`
  * `movies`
  * `reviews`
  * `watchlists`

---

## 📡 API Implementation

### 🔑 Auth Routes

**Register**

```
POST /api/auth/register
Body: { "username": "raj", "email": "raj@example.com", "password": "secret123" }
```

**Login**

```
POST /api/auth/login
Body: { "email": "raj@example.com", "password": "secret123" }
Response: { token, user }
```

---

### 🎥 Movie Routes

**Get Movies**

```
GET /api/movies?limit=12&page=1&q=DDLJ&genre=Romance&year=1995&minRating=4
```

**Get Movie by ID**

```
GET /api/movies/:id
```

**Add Movie (Admin only)**

```
POST /api/movies
Headers: Authorization: Bearer <token>
Body: {
  "title": "DDLJ",
  "genre": ["Romance"],
  "releaseYear": 1995,
  "director": "Aditya Chopra",
  "cast": ["Shah Rukh Khan", "Kajol"],
  "synopsis": "Classic Bollywood romance.",
  "posterUrl": "http://example.com/ddlj.jpg"
}
```

---

### ⭐ Review Routes

**Get Reviews for a Movie**

```
GET /api/movies/:movieId/reviews
```

**Add Review (logged-in user)**

```
POST /api/movies/:movieId/reviews
Headers: Authorization: Bearer <token>
Body: { "rating": 5, "reviewText": "Loved it!" }
```

---

### 📌 Watchlist Routes

**Get Watchlist**

```
GET /api/users/:userId/watchlist
```

**Add to Watchlist**

```
POST /api/users/:userId/watchlist
Headers: Authorization: Bearer <token>
Body: { "movieId": "<movieId>" }
```

---

## 🌐 Frontend Routes

* `/` → Home (Featured + Trending movies)
* `/movies` → Browse all movies with filters
* `/movies/:id` → Movie details + reviews + add review
* `/login` → User login
* `/register` → User registration
* `/profile/:id` → User profile + review history
* `/profile/:id/watchlist` → Watchlist page
* `/admin/add-movie` → Admin add movie

---

## 🔑 Environment Variables Recap

### Backend `.env`

| Variable             | Description               | Example                                        |
| -------------------- | ------------------------- | ---------------------------------------------- |
| PORT                 | Server port               | 4000                                           |
| MONGO\_URI           | MongoDB connection string | mongodb://127.0.0.1:27017/moviehub             |
| JWT\_SECRET          | JWT secret key            | supersecret                                    |
| JWT\_EXPIRES\_IN     | Token expiry duration     | 7d                                             |
| BCRYPT\_SALT\_ROUNDS | Hash salt rounds          | 10                                             |
| CORS\_ORIGINS        | Allowed frontend URLs     | [http://localhost:5173](http://localhost:5173) |
| NODE\_ENV            | Environment mode          | development                                    |

### Frontend `.env`

| Variable       | Description          | Example                                                |
| -------------- | -------------------- | ------------------------------------------------------ |
| VITE\_API\_URL | Backend API base URL | [http://localhost:4000/api](http://localhost:4000/api) |

---

## 📝 Additional Notes & Design Decisions

* **Security**:

  * `helmet`, `cors`, `express-mongo-sanitize`, `express-rate-limit`.
* **Validation**:

  * Used **Zod** for request body validation.
* **State Management**:

  * React Context (`AuthContext`, `MoviesContext`).
* **Styling**:

  * Tailwind CSS for clean UI.
* **Pagination & Filters**:

  * Server-side filtering with query params.
* **Error Handling**:

  * Centralized Express error middleware + ErrorBoundary in React.
* **Extensible**:

  * Can be expanded with trailers, likes, social auth, etc.

---

## ✅ Submission

* Push this project to a GitHub repo.
* Ensure `README.md` (this file) is in the root.
* Example:

  ```
  git init
  git add .
  git commit -m "MovieHub fullstack project"
  git branch -M main
  git remote add origin https://github.com/Anuj-Parihar/movie-review-platform
  git push -u origin main
  ```


