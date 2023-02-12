const mongoose = require('mongoose');

const EtapeSchema = new mongoose.Schema(
    {
        nomEtape: {
            type: String,
            required: true
        } 
    }
);

const Etape = mongoose.model('etape', EtapeSchema);
module.exports = Etape;