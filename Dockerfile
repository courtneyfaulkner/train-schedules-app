# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Expose a port (if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
