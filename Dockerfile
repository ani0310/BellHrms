FROM --platform=linux/arm64/v8 node:16.14.0-alpine

# Install the latest version of pnpm
RUN npm install -g pnpm@latest

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN pnpm install

ENV TZ Asia/India

COPY . .

CMD ["pnpm", "start"]