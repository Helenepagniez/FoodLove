const ingredientModel = require("../models/ingredient.model");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const ObjectID = require("mongoose").Types.ObjectId;

//lire un ingrédient
module.exports.getOneIngredient = (req, res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const role = decodedToken.role;
  
    ingredientModel.findOne({_id : req.params.id},(err,docs) => {
      console.log(decodedToken.id);
      if ((docs.posterId != null && decodedToken.id != docs.posterId && role != "ADMIN")) return res.status(403).send("Vous n'avez pas le droit de lire cet ingrédient");
      if (!err) res.status(200).json(docs);
      else console.log("Error to get data : " + err);
    })
};

//lire listes ingrédients
module.exports.readIngredient = (req, res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const role = decodedToken.role;
    
    ingredientModel.find((err, docs) => {
      for (let ingredient of docs) {
        if ((docs.posterId != null && decodedToken.id != ingredient.posterId && role != "ADMIN")) docs = docs.filter((ingredient) => ingredient.posterId == decodedToken.id || ingredient.posterId == null);
      }
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    }).sort({ createdAt: -1 });
};

//créer un nouvel ingrédient
module.exports.createIngredient = async (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;
  
  const newIngredient = new ingredientModel({
    posterId: decodedToken.id,
    nomIngredient: req.body.nomIngredient,
    categorie: req.body.categorie,
    picture: req.body.picture
  });
  try {
    const ingredient = await newIngredient.save();
    return res.status(201).json(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};

//modifier un ingrédient précis
module.exports.editIngredient = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;

  try {
    return ingredientModel.findById(req.params.id, (err, docs) => {
      const theIngredient = docs;

      if (!theIngredient) return res.status(404).send("ingrédient non trouvé");
      if (decodedToken.id != theIngredient.posterId && role != "ADMIN") return res.status(403).send("Vous n'avez pas le droit de modifier cet ingrédient");
      theIngredient.nomIngredient = req.body.nomIngredient;
      theIngredient.categorie = req.body.categorie;
      theIngredient.picture = req.body.picture;

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
    return ingredientModel.findById(req.params.id, (err, docs) => {
        const theIngredient = docs;

        if (!theIngredient) return res.status(404).send("Ingrédient non trouvé");
        if (decodedToken.id != theIngredient.posterId && role != "ADMIN") return res.status(403).send("Vous n'avez pas le droit de supprimer cet ingrédient");
        
        ingredientModel.remove(theIngredient, (err, docs) => {
          if (!err) res.send(docs);
          else console.log("Delete error : " + err);
        });
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
