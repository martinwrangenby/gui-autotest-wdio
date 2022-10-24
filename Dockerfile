FROM node:16.18

# Setup wdio repos
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .

CMD ["npm", "run", "wdio:headless"]
