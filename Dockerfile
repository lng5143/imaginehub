FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

RUN npm install -g pm2

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pm2.config.cjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./next.config.*

EXPOSE 3000

CMD ["pm2-runtime", "start", "pm2.config.cjs"]