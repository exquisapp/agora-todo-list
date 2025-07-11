# Stage 1: Build React App using Node.js
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install ALL dependencies (needed to build)
COPY package*.json ./
RUN npm i

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built app to Nginx default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]