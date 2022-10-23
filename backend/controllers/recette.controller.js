const RecetteModel = require("../models/recette.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
require("dotenv").config();
const jwt = require("jsonwebtoken");
const recetteModel = require("../models/recette.model");
const recette = require('../models/recette.model');
const { default: mongoose } = require("mongoose");

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
  const newRecette = new recetteModel({
    menu: req.body.menu,
    ingredients: [],
    etapes: [],
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
      theRecette.menu = req.body.menu;
      theRecette.ingredients = [];
      theRecette.filtres = req.body.filtres;
      theRecette.temps = req.body.temps;
      theRecette.etoile = req.body.etoile;
      theRecette.etapes = [];
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

      RecetteModel.remove(theRecette, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Delete error : " + err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

//créer un nouvel ingrédient
module.exports.createIngredient = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  try {
    return RecetteModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          ingredients: {
            nomIngredient: req.body.nomIngredient,
            quantiteValue: req.body.quantiteValue,
            unite: req.body.unite,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//modifier un ingrédient précis
module.exports.editIngredient = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;

  try {
    return RecetteModel.findById(req.params.id, (err, docs) => {
      const theIngredient = docs.ingredients.find((ingredient) =>
        ingredient._id.equals(req.body._id)
      );

      if (!theIngredient) return res.status(404).send("Comment not found");
      theIngredient.nomIngredient = req.body.nomIngredient;
      theIngredient.quantiteValue = req.body.quantiteValue;
      theIngredient.unite = req.body.unite;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

//supprimer un ingrédient précis
module.exports.deleteIngredient = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;
  try {
    return RecetteModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          ingredients: {
            _id: req.body._id
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//créer une nouvelle étape
module.exports.createEtape = (req, res) => {
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
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};