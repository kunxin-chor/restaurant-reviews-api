# Reviews RESTful API Documentation

## Overview

This API provides a simple interface for storing and retrieving restaurant reviews. It connects to a MongoDB database where the reviews are stored.

## Base URL

`https://kcx-rest-reviews-api.onrender.com/`

## Endpoints

### GET /reviews

Retrieve a list of all reviews.

#### Request

- Method: GET
- URL: `/reviews`

#### Response

- Status Code: 
  - 200 OK for a successful fetch.
  - 500 Internal Server Error if there is an error fetching reviews.
- Body: Array of reviews (in JSON).

#### Example

```http
GET /reviews
```

### POST /reviews

Add a new review to the database.

#### Request

- Method: POST
- URL: `/reviews`
- Headers:
  - Content-Type: application/json
- Body (JSON):
  - `restaurant`: The name of the restaurant (string).
  - `review`: The text of the review (string).
  - `rating`: The rating (number).

#### Response

- Status Code:
  - 200 OK for successful insertion.
  - 400 Bad Request if the payload is invalid.
  - 500 Internal Server Error if there is an error inserting the review.
- Body: Inserted review object.

#### Example

```http
POST /reviews
Content-Type: application/json

{
  "restaurant": "Taco Bell",
  "review": "Great tacos!",
  "rating": 4
}
```

### PUT /reviews/:id

Update an existing review.

#### Request

- Method: PUT
- URL: `/reviews/:id`
- Headers:
  - Content-Type: application/json
- URL Parameters:
  - `id`: The ObjectID of the review to be updated.
- Body (JSON):
  - `restaurant`: The updated name of the restaurant (string).
  - `review`: The updated text of the review (string).
  - `rating`: The updated rating (number).

#### Response

- Status Code:
  - 200 OK for successful update.
  - 400 Bad Request if the payload is invalid.
  - 500 Internal Server Error if there is an error updating the review.
- Body: Updated review object.

#### Example

```http
PUT /reviews/60b6c4a12e8fb814b8f7e3f6
Content-Type: application/json

{
  "restaurant": "Taco Bell",
  "review": "Amazing tacos!",
  "rating": 5
}
```

### DELETE /reviews/:id

Delete a review from the database.

#### Request

- Method: DELETE
- URL: `/reviews/:id`
- URL Parameters:
  - `id`: The ObjectID of the review to be deleted.

#### Response

- Status Code:
  - 200 OK for successful deletion.
  - 500 Internal Server Error if there is an error deleting the review.
- Body: Deleted review object.

#### Example

```http
DELETE /reviews/60b6c4a12e8fb814b8f7e3f6
```

## Error Handling

The API responds with appropriate HTTP status codes to indicate the success or failure of an API request. For example, `400 Bad Request` for client errors and `500 Internal Server Error` for server errors. 

Please handle these errors gracefully in your client application.