# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies

# Bundle app source
COPY . .
RUN npm install
RUN npm rebuild bcrypt --build-from-source

# Creates a "dist" folder with the production build
RUN npm run build

RUN npx prisma generate

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
