# --- Этап 1: Сборщик (Builder) ---
# Устанавливаем все зависимости и собираем проект
FROM node:20-buster AS builder
WORKDIR /app

# Копируем корневой package.json и lock-файл
COPY package.json yarn.lock ./

# Устанавливаем корневые зависимости, ВКЛЮЧАЯ LERNA
RUN yarn install --frozen-lockfile

# Теперь, когда lerna установлена, копируем остальные конфиги и package.json пакетов
COPY lerna.json ./
COPY packages/client/package.json ./packages/client/package.json
COPY packages/server/package.json ./packages/server/package.json

# Запускаем bootstrap, чтобы связать зависимости между пакетами
RUN yarn lerna bootstrap

# Копируем все исходники
COPY . .

# Собираем и клиент, и сервер
RUN yarn build


# --- Этап 2: Финальный образ (Production) ---
# Собираем готовое к запуску приложение
FROM node:20-buster-slim AS production
WORKDIR /app

ENV NODE_ENV=production

# Копируем корневой package.json для информации
COPY package.json ./

# Копируем УЖЕ ГОТОВЫЕ node_modules из builder-а.
# Это самый надежный способ, который избавляет нас от проблем с lerna в production.
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/packages/client/node_modules/ ./packages/client/node_modules/
COPY --from=builder /app/packages/server/node_modules/ ./packages/server/node_modules/

# Копируем скомпилированные артефакты
COPY --from=builder /app/packages/server/dist/ ./packages/server/dist/
COPY --from=builder /app/packages/client/dist/ ./packages/client/dist/

# Копируем package.json от сервера, чтобы было понятно, что это за папка
COPY --from=builder /app/packages/server/package.json ./packages/server/package.json


EXPOSE ${SERVER_PORT}

# Запускаем главный сервер
CMD [ "node", "packages/server/dist/index.js" ]