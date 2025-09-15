# DOCKER.md

This file provides guidance to Claude Code for dockerizing this application for both development and production-like testing. We will follow the step-by-step workflow defined in `CLAUDE.md`.

## Project Overview

**Goal:** To create a consistent Docker environment for two scenarios:
1.  **Development:** A fast environment with live-reloading for coding.
2.  **Production Test:** A production-like environment using Nginx to serve the optimized, built application. This allows us to test the final product before deployment.

---

## The Slice Plan for Dockerization

### Slice 1: Create the Multi-Stage Frontend Dockerfile

**Goal:** Create a single, powerful `Dockerfile` in the `/frontend` directory that can build an image for both development and production.

**Key Steps:**
1.  **Define Stage 1 (The "Builder"):**
    - Start from a base Node.js image (e.g., `node:20-alpine`).
    - Set a working directory (e.g., `/app`).
    - Copy `package.json` and run `npm install`.
    - Copy the rest of the source code.
    - Run the build command (`npm run build`) to generate the static files in the `/app/dist` folder.
2.  **Define Stage 2 (The "Final/Production" Image):**
    - Start from a fresh, lightweight Nginx image (e.g., `nginx:alpine`).
    - **Copy the built files from the "Builder" stage:** Take the content from `/app/dist` (from Stage 1) and place it in Nginx's HTML directory (`/usr/share/nginx/html`).
    - Copy a custom Nginx configuration file (`nginx.conf`) into the image.
    - Expose port 80.
    - Set the command to start the Nginx server.

### Slice 2: Create the Docker Compose File

**Goal:** Create a `docker-compose.yml` file to easily manage and run both our development and production-test environments.

**Key Steps:**
1.  **Define the Development Service (`frontend-dev`):**
    - This service will *only* use the "Builder" stage of our `Dockerfile`.
    - It will *not* run `npm run build`. Instead, it will run `npm run dev`.
    - It will map our local source code as a **volume** to enable live-reloading.
    - It will map the development port (e.g., `5173:5173`).
2.  **Define the Production-Test Service (`frontend-prod`):**
    - This service will build the entire `Dockerfile`, resulting in the final Nginx image.
    - It will *not* use a volume for the source code, as it serves the already-built static files.
    - It will map the Nginx port (e.g., `8080:80`).
3.  **Define Named Volumes and a Custom Network:**
    - Create a custom bridge network (`nginx-network`) so containers can communicate by name.
    - We will not use named volumes for the frontend code in this stage, but the network is a good practice to establish.

### Slice 3: Create Nginx Configuration

**Goal:** Create a custom `nginx.conf` file to ensure our React app works correctly with routing.

**Key Steps:**
1.  Create a file named `nginx.conf` inside the `/frontend` directory.
2.  Configure it to serve `index.html` as the entry point.
3.  Add a `try_files` directive. This is crucial for single-page applications (SPAs) like React, as it ensures that refreshing the page on a route like `/cart` still loads the main `index.html` file.

### Slice 4: Update Documentation

**Goal:** Update the `README.md` to explain how to run both the development and the production-test environments.

**Key Steps:**
1.  Explain the difference between the two environments.
2.  Provide the command for development: `docker-compose up frontend-dev`.
3.  Provide the command for testing the production build: `docker-compose up --build frontend-prod`.

---
## Technical Information & Context for Claude
(This section is based on the new information provided)

When building the Nginx stage, please adhere to these modern practices:

- **Base Image:** Use `nginx:alpine` for a minimal footprint.
- **Security:** Run Nginx as a non-root user. Create a dedicated user and group (`nginxuser`, `nginxgroup`) and ensure correct file permissions are set for cache and log directories.
- **Healthcheck:** Implement a `HEALTHCHECK` using `curl` to ensure the Nginx server is responsive within the container.
- **Configuration:** The `nginx.conf` should be simple, defining `worker_processes`, `events`, and a single `server` block listening on port 80. The server block must include an `access_log`, `error_log`, and a `location /` block with the `try_files $uri $uri/ /index.html;` directive for SPA routing.