# Use the official Node.js image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the development server port (default is 3000)
EXPOSE 3000

# Start the React app in development mode
CMD ["npm", "start"]
