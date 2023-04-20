var express = require('express');
var model = require('./models/team.model');

var router = express.Router();

router.get('/', async function (req, res) {
    res.send({
        "message": "Hello World!"
    })
});

router.get('/list', async function (req, res) {
    try {
        var players = await model.find();
        res.json(players)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/add', async (req, res) => {
    const player = new model({
        name: req.body.name,
        position: req.body.position,
        jersey_number: req.body.jersey,
        age: req.body.age,
        assists: req.body.assists,
        points_per_game: req.body.points,
    })

    try {
        const data = await player.save();
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const player = await model.findByIdAndDelete(req.params.id)
        res.send(`Player "${player.name}" has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const player = await model.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        )
        res.send(player)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;