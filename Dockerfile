FROM --platform=linux/arm64/v8 node:12.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install pnpm globally
RUN npm install -g pnpm

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY . .

# use pnpm to install dependencies
RUN pnpm install

# set timezone
ENV TZ Asia/India

# add app
COPY . .

# start app
CMD ["pnpm", "start"]