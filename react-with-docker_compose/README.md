# 🚀 React + Docker Compose (using `docker init`)

This project shows how to containerize and run a **React (Vite + TypeScript)** app using **Docker Compose** with the new `docker init` command.

---

## 🧱 Project Overview

When you run `docker init` inside your React project, Docker automatically creates:

```
.
├── Dockerfile
├── compose.yaml
├── .dockerignore
├── package.json
└── src/...
```

These files define how your app is built, run, and ignored by Docker.

---

## ⚙️ Prerequisites

* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [Node.js](https://nodejs.org/) (optional for local dev)
* A React + Vite project (like yours)

---

## 🧩 1. Initialize Docker Setup

Run this inside your project folder:

```bash
docker init
```

Docker will ask a few questions:

| Prompt                        | Answer        |
| ----------------------------- | ------------- |
| Application platform          | **Node.js**   |
| How does your app start?      | `npm run dev` |
| Which port does it listen on? | `5173`        |
| Add a .dockerignore file?     | **Yes**       |
| Add Docker Compose support?   | **Yes**       |

This generates a `Dockerfile`, `.dockerignore`, and `compose.yaml`.

---

## 🐳 2. Build and Run with Compose

Start your app using:

```bash
docker compose up --build
```

Then open your browser and visit:

👉 **[http://localhost:5173](http://localhost:5173)**

If you make code changes, restart Docker or enable bind mounts for live reload (see below).

---

## 🔁 3. Enable Hot Reload (Optional)

To reflect code changes instantly without rebuilding, edit your **`compose.yaml`**:

```yaml
services:
  react-app:
    build:
      context: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev
```

This mounts your local code into the container — now edits in `src/` auto-reload your app.

---

## 🧹 4. Stop the Containers

Stop everything cleanly:

```bash
docker compose down
```

---

## ☁️ 5. Deploying to the Cloud

To build and push your image:

```bash
docker build -t myapp .
docker tag myapp myregistry.com/myapp
docker push myregistry.com/myapp
```

If deploying to a different architecture (e.g., M1 → amd64):

```bash
docker build --platform=linux/amd64 -t myapp .
```

Then deploy from your registry.

---

## 📚 References

* 🐳 [Docker Init Documentation](https://docs.docker.com/compose/intro/init/)
* ⚡ [Docker’s Node.js Guide](https://docs.docker.com/language/nodejs/)
* ⚛️ [Vite Documentation](https://vitejs.dev/)
