var express = require('express');
var router = express.Router();
var User = require("../Models/users.js")
// var md5 = require('md5'); // para simples encriptação
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post("/register", async (req,res,next) => {

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    // const hash = md5(req.body.password)

    try {
        const novoUser = new User({
            email: req.body.email,
            password: hash,
            nome: req.body.nome,
            morada: req.body.morada,
            contribuinte: req.body.contribuinte,
        })
        await novoUser.save()
        res.status(200).send("Utilizador criado.")
    } catch (err) {
        next(err);
    }

})

router.post("/login", async (req,res,next) => {

    try {
        const user = await User.findOne({email:req.body.email})
        if (!user) return res.status(400).json("Email incorreto!")

        // const pass = md5({password:req.body.password})
         // const passFind = User.findOne({password:req.body.password})
        
        const passFind = await bcrypt.compare(
            req.body.password,
            user.password
        );
        
        if (!passFind) return res.status(400).json("Palavra-passe errada ou utilizador inexistente!")

        // const token = jwt.sign(
        //   {
        //     id: user._id,
        //     isAdmin: user.isAdmin,
        //   },
        //   process.env.JWT
        // );

        // const { password, isAdmin, ...otherDetails } = user._doc;
        // res
        //   .cookie("access_token", token, {
        //     httpOnly: true,
        //   })
        //   .status(200)
        //   .json({ details: { ...otherDetails }, isAdmin });
        
        res.status(200).json(user)
    } catch (err) {
        next(err);
    }

})

module.exports = router;
