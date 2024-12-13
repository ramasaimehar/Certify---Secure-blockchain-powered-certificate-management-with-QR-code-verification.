# Use the official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port that the Express server listens on
EXPOSE 3000

# Set the command to run the Express server
CMD ["npm", "run","start"]
