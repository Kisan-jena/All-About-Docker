# React + Docker Frontend Setup

This project demonstrates how to **containerize a React frontend** using Docker and Vite, with hot-reloading support.

---

## Prerequisites

* [Node.js](https://nodejs.org/) (for local development, optional if only using Docker)
* [Docker](https://www.docker.com/) installed and running
* Basic knowledge of React and Vite

---

## Project Structure

```
react-docker/
│
├─ package.json
├─ vite.config.js
├─ Dockerfile
├─ .dockerignore
└─ src/
   └─ main React app files
```

---

## 1️⃣ Dockerfile

Example Dockerfile for React + Vite:

```dockerfile
# Use Node.js official image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start Vite in development mode
CMD ["npm", "run", "dev"]
```

---

## 2️⃣ .dockerignore

```text
node_modules
dist
.git
```

---

## 3️⃣ Vite Configuration

Update `vite.config.js` for Docker-friendly development:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // Bind to 0.0.0.0 for Docker
    port: 5173,
    watch: {
      usePolling: true, // Enable hot reload with mounted volumes
    },
  },
})
```

---

## 4️⃣ Build & Run with Docker

### Step 1: Build Docker image

```bash
docker build -t react-docker .
```

### Step 2: Run container with port mapping and volume for hot reload

```bash
docker run -p 5173:5173 -v "$(pwd):/app" -v react-node-modules:/app/node_modules react-docker
```

**Explanation:**

* `-p 5173:5173` → Map container port 5173 to host port 5173
* `-v "$(pwd):/app"` → Mount project folder for live code changes
* `-v react-node-modules:/app/node_modules` → Keep container `node_modules` separate to avoid conflicts

---

## 5️⃣ Access the App

* Open your browser and go to:

```
http://localhost:5173
```

* Changes in `src/` files should hot-reload automatically.

---

## 6️⃣ Tips

* Always use `host: true` in `vite.config.js` to expose the server.
* Use `usePolling: true` for file watching, especially on Windows or Docker Desktop.
* You can add `.env` variables in your project as usual; Docker will pick them up.

---

## 7️⃣ Optional: Production Build

For production, you can build the React app and serve it with Nginx inside Docker:

```bash
npm run build
# Then use Nginx Docker image to serve /dist folder
```

---

✅ This setup gives you **fast development with hot reload** and a **fully containerized React frontend** ready for Docker environments.
