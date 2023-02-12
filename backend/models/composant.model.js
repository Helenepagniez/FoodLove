const mongoose = require('mongoose');

const ComposantSchema = new mongoose.Schema(
    {
        quantiteValue: {
            type: Number,
            required: true
        },
        unite:{
            type: String,
            required: true
        },
        ingredientId: {
            type: String,
            required: true
        }
    }
);

const Composant = mongoose.model('composant', ComposantSchema);
module.exports = Composant;