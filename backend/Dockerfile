# Set the base image
FROM node:14-alpine

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies in the package.json
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port that the application runs on
EXPOSE 55588

# Run the application
CMD [ "node", "index.js" ]