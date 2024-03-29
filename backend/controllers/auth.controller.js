const UserModel =  require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');
const userValidation = require("../utils/userValidation.utils");

const maxAge =  3 * 24 * 60 * 60 * 1000;
const createToken = (id, role) => {
    return jwt.sign({id, role}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

//inscription
module.exports.signUp = async (req, res) => {
    const { body } = req.body;
    const { error } = userValidation(body);
    if (error){
    return res.status(500).json({msg: error.details[0].message});
    };
    const {name, firstname, email, password, role} = req.body
    try{
        const user = await UserModel.create({name, firstname, email, password, role});
        res.status(201).json({user: user._id});
    }
    catch(err) {
        const errors = signUpErrors(err);
        res.status(200).send({errors})
    }
};

//connexion
module.exports.signIn = async (req, res) => {
    const {email, password, role} = req.body
    try{
        const user = await UserModel.login(email, password, role);
        const token = createToken(user._id, user.role);
        res.cookie('jwt', token,{httpOnly: true, maxAge});
        res.status(200).json({user: user._id})
    } catch (err){
        const errors = signInErrors(err);
        res.status(400).json({errors});
    }
};

//déconnexion
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.clearCookie('jwt');
    res.status(200).json({message:'Réussi'});
};