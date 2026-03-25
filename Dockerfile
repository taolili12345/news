# 使用官方 Node.js 20 Alpine 镜像（轻量）
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm ci

# 复制项目文件
COPY . .

# 构建 Next.js
RUN npm run build

# 生产环境镜像
FROM node:20-alpine

# 安装 iconv-lite 依赖（处理 GBK 编码）
RUN apk add --no-cache python3 g++ make

WORKDIR /app

# 复制构建产物
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content
COPY --from=builder /app/src ./src
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/postcss.config.js ./

# 暴露端口
EXPOSE 3000

# 启动 Next.js 生产服务器
CMD ["npm", "start"]
