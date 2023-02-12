const RecetteModel = require('../models/recette.model');
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const ObjectID = require("mongoose").Types.ObjectId;

//créer une nouvelle étape
  module.exports.createEtape = (req, res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const role = decodedToken.role;
  
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknow : " + req.params.id);
      
    try {
      return RecetteModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            etapes: {
              nomEtape: req.body.nomEtape
            },
          },
        },
        { new: true },
        (err, docs) => {
          if (decodedToken.id != docs.posterId && role != "ADMIN") return res.status(403).send("Vous n'avez pas le droit de créer une étape dans cette recette");
          if (!err) return res.send(docs);
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  };
  
//modifier une étape précise
  module.exports.editEtape = (req, res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const role = decodedToken.role;
  
    try {
      return RecetteModel.findById(req.params.id, (err, docs) => {
        const theEtape = docs.etapes.find((etape) =>
          etape._id.equals(req.body._id)
        );
  
        if (!theEtape) return res.status(404).send("Comment not found");
        if (decodedToken.id != docs.posterId && role != "ADMIN") return res.status(403).send("Vous n'avez pas le droit de modifier cette étape");
        theEtape.nomEtape = req.body.nomEtape;
  
        return docs.save((err) => {
          if (!err) return res.status(200).send(docs);
          return res.status(500).send(err);
        });
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  };
  
//supprimer une étape précise
  module.exports.deleteEtape = (req, res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const role = decodedToken.role;
    try {
      return RecetteModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            etapes: {
              _id: req.body._id
            },
          },
        },
        { new: true },
        (err, docs) => {
          if (decodedToken.id != docs.posterId && role != "ADMIN") return res.status(403).send("Vous n'avez pas le droit de supprimer cette étape");
          if (!err) return res.send(docs);
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  };