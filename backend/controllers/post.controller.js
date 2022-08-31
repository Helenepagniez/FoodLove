const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
require("dotenv").config();
const jwt = require("jsonwebtoken");

//lire post
module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

//créer post
module.exports.createPost = async (req, res) => {
  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    picture: req.body.picture,
    likers: [],
    comments: [],
  });
  
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//modifier post
module.exports.updatePost = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const thePost = docs;

      if (!thePost) return res.status(404).send("Post not found");
      if (decodedToken.id != thePost.posterId && role != "ADMIN") return res.status(403).send("Vous n'avez pas le droit de modifier cette publication");
      thePost.message = req.body.message;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

//supprimer post
module.exports.deletePost = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const thePost = docs;

      if (!thePost) return res.status(404).send("Post not found");
      if (decodedToken.id != thePost.posterId && role != "ADMIN") return res.status(403).send("Vous n'avez pas le droit de supprimer ce post");

      PostModel.remove(thePost, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Delete error : " + err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
