FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app files
COPY . .

# Expose port (use 3001 since PostgREST uses 3000)
EXPOSE 3001

# Run dev server
CMD ["npm", "run", "dev", "--", "-p", "3001"]
