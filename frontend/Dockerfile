# Use the official lightweight Node.js image as the base image
FROM node:alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
ADD package*.json ./

# Install only production dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "build"]