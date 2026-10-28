# المرحلة الأولى: البناء
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# المرحلة الثانية: تجهيز الصور النهائية (خفيفة وآمنة)
FROM node:18-alpine
WORKDIR /app
RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup
COPY --from=builder /app/build ./build
RUN chown -R appuser:appgroup /app
USER appuser
# (ملاحظة: يمكنك خدمة الملفات هنا أو عبر حاوية Nginx المستقلة الموضحة أدناه)