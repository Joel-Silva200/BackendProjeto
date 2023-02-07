var express = require('express')
var router = express.Router();
var users = require("../Models/users.js");
var jwt = require("jsonwebtoken");

router.get("/:id", async (req,res,next) => {

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

router.put("/:id", async (req,res,next) => {

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

router.delete("/:id", async (req,res,next) => {

    try {
        await users.findByIdAndDelete(req.params.id);
        res.status(200).json("Utilizador apagado com sucesso!");
    } catch (err) {
        next(err);
    }

})

module.exports = router;


