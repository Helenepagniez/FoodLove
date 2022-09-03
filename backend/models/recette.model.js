const mongoose = require('mongoose');

const RecetteSchema = new mongoose.Schema(
    {
        menu: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100000
        },
        ingredient: {
            type: String,
            required: true
        },
        quantite: {
            type: Number,
            required: true
        },
        etapes: {
            type: String,
            required: true
        },
        portions: {
            type: Number
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