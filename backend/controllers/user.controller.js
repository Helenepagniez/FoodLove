const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
require("dotenv").config();
const jwt = require("jsonwebtoken");

// voir infos d'un utilisateur(profil)
module.exports.userInfo = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;
  if (decodedToken.id != req.params.id && role != "ADMIN")
    return res.status(403).send("Vous n'avez pas accès au profil");
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknow: " + err);
  }).select("-password");
};

//mettre à jour ou modifier un utilisateur
module.exports.updateUser = async (req, res) => { 
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;
  if (decodedToken.id != req.params.id && role != "ADMIN")
    return res.status(403).send("Vous n'avez pas le droit de modifier le profil");

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          firstname: req.body.firstname,
          email: req.body.email,
          picture: req.body.picture
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).send({ message: err });
      }
    ).clone();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//supprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;
  if (decodedToken.id != req.params.id && role != "ADMIN")
    return res.status(403).send("Vous n'avez pas le droit de supprimer cet utilisateur");

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

