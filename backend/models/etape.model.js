const mongoose = require('mongoose');

const EtapeSchema = new mongoose.Schema(
    {
        nomEtape: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('etape', EtapeSchema);