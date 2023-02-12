const mongoose = require('mongoose');
const EtapeSchema = require('./etape.model').schema;
const ComposantSchema = require('./composant.model').schema;

const RecetteSchema = new mongoose.Schema(
    {
        posterId: {
            type: String
        },
        menu: {
            type: String,
            required: true,
            maxlength: 100000
        },
        etapes: [EtapeSchema],
        portions: {
            type: Number,
            required: true
        },
        filtres: [String],
        temps: {
            type: String,
        },
        etoile: {
            type: Number
        },
        picture: {
            type: String
        },
        video: {
            type: String
        },
        composants: [ComposantSchema]
    },
    {
        timestamps: true,
    }
);

const Recette = mongoose.model('recette', RecetteSchema)
module.exports = Recette;