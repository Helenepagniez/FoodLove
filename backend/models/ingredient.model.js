const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema(
    {
        nomIngredient: {
            type: String,
            required: true
        },
        quantiteValue: {
            type: Number,
            required: true
        },
        unite: {
            type: String,
            required: true
        },
    }
);

module.exports = mongoose.model('ingredient', IngredientSchema);