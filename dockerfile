FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN corepack enable && pnpm install --frozen-lockfile

COPY . .

EXPOSE 4321

CMD ["pnpm", "dev"]
