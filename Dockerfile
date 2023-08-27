FROM node:16

ENV NODE_ENV=development

WORKDIR /src

COPY package*.json ./

# Install npm dependencies
RUN npm install

COPY . .

RUN npm run build

COPY start.sh .
RUN chmod +x start.sh

EXPOSE 1089

ENTRYPOINT ["sh", "start.sh"]
