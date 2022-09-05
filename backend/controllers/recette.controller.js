const RecetteModel = require("../models/recette.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
require("dotenv").config();
const jwt = require("jsonwebtoken");
const recetteModel = require("../models/recette.model");
const recette = require('../models/recette.model');

//lire une recette
exports.getOneRecette = (req, res) => {
  recette.findOne({_id : req.params.id})
  .then( recette => res.status(200).json(recette))
  .catch( error => res.status(400).json({ error }))
};

//lire listes recettes
module.exports.readRecette = (req, res) => {
  RecetteModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

//créer recette
module.exports.createRecette = async (req, res) => {
  /*const newIngredient = new ingredientModel({
    nomIngredient: req.body.nomIngredient,
    quantiteValue: req.body.quantiteValue,
    unite: req.body.unite,
  });

  const newEtape = new EtapeModel({
    nomEtape: req.body.nomEtape
  });*/

  const newRecette = new recetteModel({
    menu: req.body.menu,
    ingredients: req.body.ingredients,
    etapes: req.body.etapes,
    filtres: req.body.filtres,
    temps: req.body.temps,
    video: req.body.video,
    picture: req.body.picture,
  });
  
  try {
    const recette = await newRecette.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//modifier recette
module.exports.updateRecette = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;

  try {
    return RecetteModel.findById(req.params.id, (err, docs) => {
      const theRecette = docs;

      if (!theRecette) return res.status(404).send("Recette non trouvée");
      theRecette.menu = req.body.menu;
      theRecette.ingredients = req.body.ingredients;
      theRecette.quantites = req.body.quantites;
      theRecette.filtres = req.body.filtres;
      theRecette.temps = req.body.temps;
      theRecette.unites = req.body.unites;
      theRecette.etapes = req.body.etapes;
      theRecette.video = req.body.video;
      theRecette.picture = req.body.picture;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

//supprimer recette
module.exports.deleteRecette = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;

  try {
    return RecetteModel.findById(req.params.id, (err, docs) => {
      const theRecette = docs;

      if (!theRecette) return res.status(404).send("Recette non trouvée");

      RecetteModel.remove(theRecette, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Delete error : " + err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
