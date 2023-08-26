# Use an appropriate base image
FROM node:18-alpine

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

COPY start.sh .
RUN chmod +x start.sh

EXPOSE 1089

# Set the entry point
ENTRYPOINT ["sh", "start.sh"]
