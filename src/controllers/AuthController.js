const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const UserModel = require("../models/User");

const router = express.Router();

const generateToken = (user = {}) =>{
    return  jwt.sign({
        id: user.id,
        name: user.name
    },  authConfig.secret , {  
        expiresIn: 86400
    });

}

// /localhost/auth/register
router.post("/register", async(req, res) => {

    const {email} = req.body;

    if(await UserModel.findOne({email})){
        return res.status(400).json({
            error: true,
            message:"E-mail já existente"
        })
    }

    const user = await UserModel.create(req.body);

    user.password = undefined;

    return res.json({
        user,
        token: generateToken(user)
    });
})

router.post("/autentiate", async(req, res) => {

    const {email, password} = req.body;

    const user = await UserModel.findOne({email}).select("+password");

    console.log(user);

    if(!user){
        return res.status(400).json({
            error: true,
            message: "Usuário não encontrado" 
        })
    }
    if(!await bcrypstjs.compare(password, user.password)){
        return res.status(400).send({
            error: true,
            message: "Usuário e/ou senha inválidos" 
        })
    }

    user.password = undefined;

  
    return res.json({
        user,
        token: generateToken(user)
    });


})

module.exports = router;