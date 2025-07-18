### Отчёт по утечкам памяти для куки-кликера 

# Общая информация

1) Проведён анализ потребления памяти приложения с целью выявления возможных утечек.
2) Использовались инструменты Chrome DevTools: вкладки Memory и Performance.
3) Использовались типы снимков в виде Heap Snapshot, а также запись событий во вкладке Perfomance
4) Тестировалось основные пользовательские сценарии, связанные с функционалом приложения (создание топика на форуме, комментарий к топику, начало игры, покупка бустов и клик по кнопке)

При запуске приложения наблюдается однократный рост памяти — он объясняется инициализацией интерфейса, загрузкой стилей, созданием анимаций и инициализацией canvas.

# Ход проверки утечек памяти

1) Первый снимок сделан при первичном запуске приложения. Объём памяти - 27,4MB
2) После перехода на страницу форума объём памяти увеличивается (до 33MB), что связано с первичным рендером и получением информации о количестве топиков и комментриев к ним (для проверки утечек было создано 5 топиков и по комментарию к ним). Увеличение объёма памяти после повторной записи не наблюдается.
3) Переход на страницу профиля вызывает небольшой увеличение объёма памяти (на 100kb) из-за подгрузки данных о пользователе.
4) Переход на игровую страницу увеличивает объём памяти на 1 MB - загружаются текущие очки и приобретённые улучшения пользователя. 

При добавлении топика и комментария фиксируется рост объёма памяти, связанный с обновлением состояния и повторным рендерингом списка топиков и комментариев.



Во время игрового процесса наблюдается постепенный рост использования памяти. Причины:

1. Периодическое обновление состояния - счёт увеличивается каждую секунду (пассивный доход) и при кликах пользователя.
2. Интенсивная отрисовка canvas и реактивные обновления компонентов вызывают частое создание JS-объектов.

На остальных страницах рост памяти отсутствует. Увеличение количества паяти замечено только при первичном переходе на страницу и получении данных. 

Увеличение объёма памяти при добавлении топика и комментария на странице форума связано с обновлением состояния и повторной отрисовкой данных форума.

####  Итог:
Рост памяти объясняется увеличением количества операций и взаимодействий, а также созданием большого количества краткоживущих JavaScript-объектов в процессе игры. Утечек памяти не обнаружено.
