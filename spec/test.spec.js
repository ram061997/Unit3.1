const frisby = require('frisby');
const { PORT } = require('../server');

const Joi = frisby.Joi
const URL = `http://localhost:${PORT}`

frisby.globalSetup({
    headers : {
        "Accept": "application/json", 
        "content-type" : "application/json",
    }
});

// Unit Test Case for main index page
it('GET `/` returns index page', () => {
    return frisby
        .get(URL + '/')
        .expect('status', 200)
        .expect("header", "content-type", "application/json; charset=utf-8")
        .expect("json", "message", "Hello World!");
});

// Unit Test Case for /list api
it('GET `/list` returns list of basketball players', () => {
    return frisby
        .get(URL + '/list')
        .expect('status', 200)
        .expect("header", "content-type", "application/json; charset=utf-8")
        .expect("jsonTypes", "*", {
            '_id': Joi.string(),
            'name': Joi.string(),
            'position': Joi.string(),
            'jersey_number': Joi.number(),
            'age': Joi.number(),
            'assists': Joi.number(),
            'points_per_game': Joi.number(),
        });
});

// Unit Test Case for /update api
it('PATCH `/update` to update a basketball player information', () => {
    return frisby
        .patch(URL + '/update/64284fc96dc28ea937d1b767', {
            body: {
                "name": "Lebron James",
                "position": "Small",
                "jersey": 89,
                "age": 37,
                "assists": 12,
                "points": 12
            }
        })
        .expect('status', 200);
});

// Unit Test Case for /update api
it('PATCH `/delete` to delete a basketball player', () => {
    return frisby
        .del(URL + '/delete/64284fc96dc28ea937d1b767')
        .expect('status', 400);
});

// Unit Test Case for /add api
it('POST `/add` to add a basketball player', () => {
    return frisby
        .post(URL + '/add', {
            body: {
                "name": "Lebron James",
                "position": "Small Forward",
                "jersey": 23,
                "age": 37,
                "assists": 8,
                "points": 27
            }
        })
        .expect('status', 201);
});