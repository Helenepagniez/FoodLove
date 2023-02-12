const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema(
    {
        nomIngredient: {
            type: String,
            required: true
        },
        categorie:{
            type: String
        },
        picture : {
            type: String
        },
        posterId: {
            type: String
        }
    }
);

const Ingredient = mongoose.model('ingredient', IngredientSchema);
module.exports = Ingredient;