const mongoose = require('mongoose');

const RecetteSchema = new mongoose.Schema(
    {
        menu: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100000
        },
        ingredients: {
            type: [String],
            required: true
        },
        quantites: {
            type: [Number],
            required: true
        },
        etapes: {
            type: [String],
            required: true
        },
        portions: {
            type: Number
        },
        filtres: {
            type: [String],
        },
        temps: {
            type: String,
        },
        unites: {
            type: [String],
        },
        picture : {
            type: String
        },
        video: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('recette', RecetteSchema);