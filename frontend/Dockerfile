# Stage 1: Build Stage
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the React Vite application
RUN npm run build

# Stage 2: Production Stage
FROM nginx:stable-alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static files
RUN rm -rf ./*

# Copy the built files from the builder stage
COPY --from=builder /app/dist .

# Copy a custom Nginx configuration file for React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
