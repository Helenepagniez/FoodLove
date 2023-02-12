const RecetteModel = require('../models/recette.model');
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const ObjectID = require("mongoose").Types.ObjectId;

//créer un nouveau composant
module.exports.createComposant = (req, res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const role = decodedToken.role;
    if (!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknow : " + req.params.id);
    try {
      return RecetteModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            composants: {
              ingredientId: req.body.ingredientId,
              quantiteValue: req.body.quantiteValue,
              unite: req.body.unite,
            },
          },
        },
        { new: true },
        (err, docs) => {
          if (decodedToken.id != docs.posterId && role != "ADMIN") return res.status(403).send("Vous n'avez pas le droit de créer un composant dans cette recette");
          if (!err) return res.send(docs);
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  };
  
  //modifier un composant précis
  module.exports.editComposant = (req, res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const role = decodedToken.role;
  
    try {
      return RecetteModel.findById(req.params.id, (err, docs) => {
        const theComposant = docs.composants.find((composant) =>
          composant._id.equals(req.body._id)
        );
  
        if (!theComposant) return res.status(404).send("composant non trouvé");
        theComposant.ingredientId = req.body.ingredientId;
        theComposant.quantiteValue = req.body.quantiteValue;
        theComposant.unite = req.body.unite;
  
        return docs.save((err) => {
          if (decodedToken.id != docs.posterId && role != "ADMIN") return res.status(403).send("Vous n'avez pas le droit de modifier ce composant");
          if (!err) return res.status(200).send(docs);
          return res.status(500).send(err);
        });
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  };
  
  //supprimer un composant précis
  module.exports.deleteComposant = (req, res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const role = decodedToken.role;
    try {
      return RecetteModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            composants: {
              _id: req.body._id
            },
          },
        },
        { new: true },
        (err, docs) => {
          if (decodedToken.id != docs.posterId && role != "ADMIN") return res.status(403).send("Vous n'avez pas le droit de supprimer ce composant");
          if (!err) return res.send(docs);
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  };
  