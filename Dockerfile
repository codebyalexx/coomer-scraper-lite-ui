### BUILD

FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

RUN npm install -g pnpm@10.11.0

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_API_HOST
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST

RUN pnpm build
RUN pnpm dlx @better-auth/cli@latest generate
RUN pnpm dlx @better-auth/cli@latest migrate

### PRODUCTION

FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache libc6-compat

RUN npm install -g pnpm@10.11.0

RUN pnpm dlx @better-auth/cli@latest generate
RUN pnpm dlx @better-auth/cli@latest migrate

ARG NEXT_PUBLIC_API_HOST
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["pnpm", "start"]
