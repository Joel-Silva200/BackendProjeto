var express = require('express')
var router = express.Router();
var users = require("../Models/users.js");
var jwt = require("jsonwebtoken");

//
// verificações de user
//

const tokenVerify = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("Não autenticado!")
  }

  jwt.verify(token, "8H2nd01nd091283J987AF823", (err, user) => {
    if (err) return res.status(403).json("Token inválida!")
    req.user = user;
    next();
  });
};

const userVerify = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
        return res.status(403).json("Não autorizado!")
    }
  });
};

const adminVerify = (req, res, next) => {
  tokenVerify(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
        return res.status(403).json("Não autorizado!")
    }
  });
};


//
////
//


router.get("/:id",userVerify, async (req,res,next) => {

    try {
        const user = await users.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }

})

router.get("/", async (req,res,next) => {

    try {
        const allUsers = await users.find();
        res.status(200).json(allUsers);
    } catch (err) {
        next(err);
    }

})

router.put("/:id",userVerify, async (req,res,next) => {

    try {
        const userAtualizado = await users.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(userAtualizado);
    } catch (err) {
        next(err);
    }

})

router.delete("/:id",userVerify, async (req,res,next) => {

    try {
        await users.findByIdAndDelete(req.params.id);
        res.status(200).json("Utilizador apagado com sucesso!");
    } catch (err) {
        next(err);
    }

})

module.exports = router;


