## Установка
* `npm i`
* `npx tsc`
## Запуск приложения
### в dev-режиме
* `npm run dev`
### в обычном-режиме
* `npm run start`
## REST API
Примеры работы приложения описан ниже.
#### Создать пользователя
##### Request
`POST /users`

запрос в формате json:
```
  {
    "username": "user 1",
    "password": "password 1"
  }
```

##### Response
```
  {
    "token": "77536060-369f-4ada-aea1-f7408fafb205"
  }
```

#### Авторизировать пользователя
##### Request
`POST /users/sessions`

запрос в формате json:
```
  {
    "username": "user 1",
    "password": "password 1"
  }
```

##### Response
```
  {
    "token": "6557952a-096e-4563-9753-77736440cf02"
  }
```
#### Получение списка постов
##### Request
`GET /post`

##### Response
```
  [
    {
      "id": 1,
      "title": "Some title",
      "image": "",
      "date": "2023-10-09T08:55:44.114Z",
      "user": {
        "username": "user1"
      }
    }
  ], {...}
```
#### Получение полной информации о посте
##### Request
`GET /post/:id`

Параметры пути: id - идентификатор поста
##### Response
```
  {
    "id": 1,
    "title": "Some title",
    "description": "Some description",
    "image": null,
    "date": "2023-10-09T08:55:44.114Z",
    "user": {
      "username": "user1"
    }
  }
```

#### Создание нового поста
##### Request
`POST /post`

Headers 
```
Authorization: "6557952a-096e-4563-9753-77736440cf02"
```

запрос в формате form-data:
```
  {
    "title": "test-title 2",
    "description": "some info 2",
    "image": "0e828268-317c-4fb8-9d6d-e850e7a47b2e.jpg",
    "id": 2,
    "date": "2023-10-09T09:48:15.517Z"
  }
```
##### Response
```
  {
    "title": "test-title 2",
    "description": "some info 2",
    "image": "0e828268-317c-4fb8-9d6d-e850e7a47b2e.jpg",
    "userId": "1",
    "id": 2,
    "date": "2023-10-09T09:48:15.517Z"
  }
```

#### Удаление поста
##### Request
`POST /post/:id`

Headers 
```
Authorization: "6557952a-096e-4563-9753-77736440cf02"
```
Параметры пути: id - идентификатор поста
##### Response
```
  {
    "title": "test-title 2",
    "description": "some info 2",
    "image": "0e828268-317c-4fb8-9d6d-e850e7a47b2e.jpg",
    "userId": "1",
    "id": 2,
    "date": "2023-10-09T09:48:15.517Z"
  }
```

#### Создание нового комментария к посту
##### Request
`POST /post`

Headers 
```
Authorization: "6557952a-096e-4563-9753-77736440cf02"
```

запрос в формате json:
```
{
  "comment: "HDD", 
  "postId":6
}
```
##### Response
```
  {
    "id": 33,
    "comment": "HDD",
    "datetime": "2023-10-09T13:23:44.255Z",
    "post": {
      "id": 6,
      "title": "sadsad",
      "description": "asdasdsad",
      "image": "66ce4375-e9bb-4738-b5a5-84d684be9524.jpg",
      "date": "2023-10-09T13:22:03.395Z",
      "userId": 2
    },
    "user": {
      "username": "user 1"
    }
  }
```

#### Удаление комментария
##### Request
`DELETE /post/:id`

Headers 
```
Authorization: "6557952a-096e-4563-9753-77736440cf02"
```
Параметры пути: id - идентификатор поста
##### Response
Ответ сервера 204 (запрос был успешно обработан, но сервер не возвращает данные.)

#### Получение списка комментариев
##### Request
`GET /comments/?postId=6`

##### Response
```
  [
    {
      "id": 1,
      "comment": "текст",
      "datetime": "2023-10-09T13:22:07.471Z",
      "post": {
        "id": 6,
        "title": "заголовок",
        "description": "описание",
        "image": "66ce4375-e9bb-4738-b5a5-84d684be9524.jpg",
        "date": "2023-10-09T13:22:03.395Z",
        "userId": 2
      },
      "user": {
        "username": "пользователь 2"
      }
    },
  ]
```