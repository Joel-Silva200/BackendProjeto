var express = require('express')
var router = express.Router();
var hotel = require("../Models/hotel.js")
var Quarto = require("../Models/quarto.js")

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

router.get("/quartos/:id", async (req,res,next) => {
  
  try {
    const hotel1 = await hotel.findById(req.params.id);
    const lista = await Promise.all(
      hotel1.quartos.map((quarto) => {
        return Quarto.findById(quarto);
      })
    );
    res.status(200).json(lista);
  } catch (error) {
    next(error);
  }
  
})

router.post("/", async (req,res,next) => {

    const novoHotel = new hotel(req.body);
    
    try {
        const hotelGuardado = await novoHotel.save();
        res.status(200).json(hotelGuardado);
    } catch (err) {
        next(err);
    }

})

router.put("/:id", async (req,res,next) => {

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

router.delete("/:id", async (req,res,next) => {

    try {
        await hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel apagado com sucesso!");
    } catch (err) {
        next(err);
    }

})

module.exports = router;
