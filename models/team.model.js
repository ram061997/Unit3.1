var mongoose = require('mongoose');

var basketballTeamSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        position: {
            type: String,
            required: true,
            trim: true
        },
        jersey_number: {
            type: Number,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        assists: {
            type: Number,
            required: true
        },
        points_per_game: {
            type: Number,
            required: true
        }
    },
    {
        versionKey: false
    })

module.exports = mongoose.model('BasketBall Team', basketballTeamSchema, 'team');