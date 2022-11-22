FROM node:14-alpine
WORKDIR /front-end-app
COPY package.json ./
COPY package-lock.json ./
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["npm", "start"]