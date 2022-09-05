const mongoose = require('mongoose');
const Ingredient = require=('../models/ingredient.model.js');
const Etape = require=('../models/etape.model.js');

const RecetteSchema = new mongoose.Schema(
    {
        menu: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100000
        },
        ingredients: {
            type: [Ingredient],
            required: true
        },
        etapes: {
            type: [Etape],
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