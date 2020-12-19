FROM node:12.13-alpine as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12.13-alpine as production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY --from=development /usr/src/app/dist ./dist
CMD ["npm", "run", "start:prod"]