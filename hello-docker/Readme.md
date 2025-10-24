docker
# Hello Docker Example

This project demonstrates how to create a minimal Docker image using Node.js. It includes a tiny Node.js script (`hello.js`) and a `Dockerfile` to build and run the container.

---

## Project structure

hello-docker/
├── Dockerfile
├── hello.js
└── README.md

- **Dockerfile** – Defines the steps to build the Docker image.
- **hello.js** – A simple Node.js script that prints `"docker"` to stdout.
- **README.md** – This documentation file.

---

## hello.js

```javascript
// hello.js
console.log("docker");
```

This script prints `docker` to the console when executed by Node.js.

## Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY . .

CMD ["node", "hello.js"]
```

- FROM node:20-alpine
	- Uses the official Node.js 20 image on Alpine Linux (small footprint).
- WORKDIR /app
	- Sets the working directory inside the container.
- COPY . .
	- Copies local project files into the image at `/app`.
- CMD ["node", "hello.js"]
	- Default command executed when the container starts.

## Build and run (PowerShell)

1. Open PowerShell and change into the project folder:

```powershell
cd C:\Users\Welcome\Desktop\StudyMaterials\Devops-one-shot\docker\hello-docker
```

2. Build the image and tag it `hello-docker`:

```powershell
docker build -t hello-docker .
```

Expected: Docker will download the base image (first time), copy files, run the steps in the Dockerfile, and produce a local image.

3. Verify the image is present:

```powershell
docker images
```

Look for `hello-docker` in the REPOSITORY column.

4. Run the image (non-interactive):

```powershell
docker run --rm hello-docker
```

Expected output:

```
docker
```

The `--rm` flag removes the container after it exits.

5. (Optional) Start an interactive shell inside the container to inspect files or run commands manually:

```powershell
docker run -it --rm hello-docker sh
# once inside the container:
/app # node hello.js
```

## Troubleshooting

- Docker Desktop must be running on Windows. Start it before building or running containers.
- The first `docker build` may take longer because it pulls the base image. Subsequent builds are faster.
- If `docker run` produces no output, verify `hello.js` exists and contains `console.log("docker")` and that the `Dockerfile`'s `COPY` step includes the file.

## Summary

This is a minimal example to demonstrate:

- Building a Docker image from a simple Node.js app.
- Running a container to execute the Node.js script.
- Basic Dockerfile instructions: `FROM`, `WORKDIR`, `COPY`, and `CMD`.

If you want, I can also:

- Add a one-line "Try it" snippet to the top of this README.
- Provide a small PowerShell script to automate build + run.
- Add a note about multi-stage builds or smaller base images.