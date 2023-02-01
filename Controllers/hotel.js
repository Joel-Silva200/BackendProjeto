var express = require('express')
var router = express.Router();
var hotel = require("../Models/hotel.js")

//
// verificações de user
//

const tokenVerify = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("Não autenticado!")
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(403).json("Token inválida!")
    req.user = user;
    next();
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

router.get("/:id", async (req,res,next) => {

    try {
        const hotel1 = await hotel.findById(req.params.id);
        res.status(200).json(hotel1);
    } catch (err) {
        next(err);
    }

})

router.get("/", async (req,res,next) => {

    try {
        const hoteis = await hotel.find();
        res.status(200).json(hoteis);
    } catch (err) {
        next(err);
    }

})

router.post("/",adminVerify, async (req,res,next) => {

    const novoHotel = new hotel(req.body);
    
    try {
        const hotelGuardado = await novoHotel.save();
        res.status(200).json(hotelGuardado);
    } catch (err) {
        next(err);
    }

})

router.put("/",adminVerify, async (req,res,next) => {

    try {
        const hotelAtualizado = await hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(hotelAtualizado);
    } catch (err) {
        next(err);
    }

})

router.delete("/:id",adminVerify, async (req,res,next) => {

    try {
        await hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel apagado com sucesso!");
    } catch (err) {
        next(err);
    }

})

module.exports = router;
