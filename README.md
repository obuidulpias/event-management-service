--------------Event Management service----------------

Instruction about how to run the project:
* Create mysql database and DB_NAME: em_servise
* First need to import em_servise.sql on mysql database
* Then, npm start
* PORT = 8000

All API Endpoints, Req Body and Response format given below:

1. Event List API, where we can get all active events with pagination.

GET  http://localhost:8000/apis
Response:
{
  "events": [
    {
      "id": 1,
      "title": "Show case",
      "start_at": "2022-11-17T18:00:00.000Z",
      "end_at": "2022-11-23T18:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "per_page": 10,
    "total_pages": 1,
    "current_page": 1
  }
}

2. Event Details API, where we can get single event information
GET http://localhost:8000/apis/1
Response:
{
  "data": {
    "id": 1,
    "title": "Show case",
    "start_at": "2022-11-17T18:00:00.000Z",
    "end_at": "2022-11-23T18:00:00.000Z",
    "total_workshops": 2
  }
}

3. Workshop List API, where we can get all the active workshops of a single
event
GET http://localhost:8000/apis/allWSBySV/1
Response:
{
  "data": {
    "id": 1,
    "title": "Show case",
    "start_at": "2022-11-17T18:00:00.000Z",
    "end_at": "2022-11-23T18:00:00.000Z",
    "workshops": [
      {
        "id": 1,
        "title": "robotic show",
        "description": "robotic details",
        "start_at": "2022-11-17T18:00:00.000Z",
        "end_at": "2022-11-29T18:00:00.000Z"
      }
    ]
  }
}

4. Workshop Details API, where we can get single workshop information
GET http://localhost:8000/apis/wsDetails/1
Response:
{
  "data": {
    "id": 1,
    "title": "robotic show",
    "description": "robotic details",
    "start_at": "2022-11-17T18:00:00.000Z",
    "end_at": "2022-11-29T18:00:00.000Z",
    "total_workshops": 2
  }
}

5. Make a workshop reservation API
POST http://localhost:8000/apis
POST Body:
{
    "name": "pias",
    "email": "pias@gmail.com"
}
Response:
{
    "reservation": [
        {
            "id": 1,
            "name": "pias",
            "email": "pias@gmail.com"
        }
    ],
    "event": [
        {
            "id": 1,
            "title": "Show case",
            "start_at": "2022-11-17T18:00:00.000Z",
            "end_at": "2022-11-23T18:00:00.000Z"
        }
    ],
    "workshop": [
        {
            "id": 1,
            "title": "robotic show",
            "description": "robotic details",
            "start_at": "2022-11-17T18:00:00.000Z",
            "end_at": "2022-11-29T18:00:00.000Z"
        }
    ]
}


