# المرحلة الأولى: تثبيت الحزم
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# المرحلة الثانية: التشغيل الآمن
FROM node:18-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodegroup && adduser -u 1001 -S nodeuser -G nodegroup
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN chown -R nodeuser:nodegroup /app
USER nodeuser
EXPOSE 5000
CMD ["node", "server.js"]