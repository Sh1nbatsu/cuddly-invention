### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
4. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
5. Выполните команду `yarn dev --scope=server` чтобы запустить только server

### Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Dev окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose -f docker-compose.dev.yml up --build -d` - Работа с hot reload

После успешного запуска приложение будет доступно по адресу `http://localhost:PORT`, где `PORT` — это значение `SERVER_PORT` из вашего `.env` файла.

Приложение запускается в одном контейнере app, который объединяет клиентскую и серверную часть


## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up --build -d` - Эта команда соберет образ вашего приложения и запустит все необходимые сервисы в фоновом режиме.

После успешного запуска приложение будет доступно по адресу `http://localhost:PORT`, где `PORT` — это значение `SERVER_PORT` из вашего `.env` файла.

Приложение запускается в одном контейнере app, который объединяет клиентскую и серверную часть

## Механика игры

1. Осуществите нажатие
2. Повторите первый шаг
3. Купите улучшение
4. Повторяйте шаги 1-3
5. ???
6. Профит

## Ссылка на видео с демонстрацией

(https://disk.yandex.com/i/wsDtyJmkG2rKRg)
