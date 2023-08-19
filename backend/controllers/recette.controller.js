const RecetteModel = require("../models/recette.model");
const ObjectID = require("mongoose").Types.ObjectId;
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

//lire une recette
exports.getOneRecette = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;

  RecetteModel.findOne({_id : req.params.id},(err,docs) => {
    console.log(decodedToken.id);
    if (decodedToken.id != docs.posterId && role != "ADMIN") return res.status(403).send("Vous n'avez pas le droit de lire cette recette");
    if (!err) res.status(200).json(docs);
    else console.log("Error to get data : " + err);
  })
};

//lire listes recettes
module.exports.readRecette = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;
  
  RecetteModel.find((err, docs) => {
    if (role != "ADMIN") {
      docs = docs.filter((recette) => recette.posterId == decodedToken.id);
    }
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

//créer recette
module.exports.createRecette = async (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;
  
  const newRecette = new RecetteModel({
    posterId: decodedToken.id,
    menu: req.body.menu,
    composants: req.body.composants,
    etapes: req.body.etapes,
    filtres: req.body.filtres,
    etoile: req.body.etoile,
    temps: req.body.temps,
    video: req.body.video,
    picture: req.body.picture,
    portions: req.body.portions
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
      if (decodedToken.id != theRecette.posterId && role != "ADMIN") return res.status(403).send("Vous n'avez pas le droit de modifier cette recette");
      theRecette.posterId = decodedToken.id;
      theRecette.menu = req.body.menu;
      theRecette.filtres = req.body.filtres;
      theRecette.temps = req.body.temps;
      theRecette.etoile = req.body.etoile;
      theRecette.video = req.body.video;
      theRecette.picture = req.body.picture;
      theRecette.portions = req.body.portions;

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
      if (decodedToken.id != theRecette.posterId && role != "ADMIN") return res.status(403).send("Vous n'avez pas le droit de supprimer cette recette");

      RecetteModel.remove(theRecette, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Delete error : " + err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
