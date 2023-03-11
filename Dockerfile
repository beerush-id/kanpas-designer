# Dockerfile

FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN ls -la

RUN pnpm install --frozen-lockfile

RUN pnpm build
RUN pnpm prune --prod
RUN pnpm store prune

EXPOSE 3000
CMD ["node", "dist"]
