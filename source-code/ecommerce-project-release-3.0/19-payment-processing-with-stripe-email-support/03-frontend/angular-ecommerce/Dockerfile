# Stage 1: Base image with Node.js
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port used by ng serve (default: 4200)
EXPOSE 4200

ENV HOST=0.0.0.0
# Serve the app using SSL (expects the cert and key at ./ssl-localhost/)
CMD ["npm", "start"]
