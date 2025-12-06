# Step 1 — Base image
FROM node:18

# Step 2 — Set working directory
WORKDIR /app

# Step 3 — Copy package files first (better Docker caching)
COPY package*.json ./

# Step 4 — Install dependencies
RUN npm install

# Step 5 — Copy all source files
COPY . .

# Step 6 — Expose backend port
EXPOSE 4000

# Step 7 — Start the app
CMD ["node", "index.js"]
