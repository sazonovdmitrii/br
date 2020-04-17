## Instashop для Symfony 4 Flex

### Доступное REST API

##### Сохранение клика на картинку (количества кликов)

Метод: POST

URL: /api/v1/instashop/click/save

```
Content-Type: application/x-www-form-urlencoded
id - (integer) идентификатор изображения
```
##### Сохранение количества покупок по картинке

Метод: POST

URL: /api/v1/instashop/click/save
```
Content-Type: application/x-www-form-urlencoded
id - (integer) идентификатор изображения (не обязательно)
ids - (array) список идентификаторов изображений  (не обязательно)
```

##### Получение изображений по тегу

Метод: GET

URL: /api/v1/instashop/images/find?tag=brillenhof
```
tag - (string) идентификатор изображения. Можно указывать без символа #
```