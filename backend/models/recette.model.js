const mongoose = require('mongoose');

const RecetteSchema = new mongoose.Schema(
    {
        menu: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100000
        },
        etapes: {
            type: [
                {
                nomEtape: String
                }
            ]
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
        },
        ingredients: {
            type: [
                {
                    nomIngredient: String,
                    quantiteValue: Number,
                    unite: String
                }
            ]
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('recette', RecetteSchema);