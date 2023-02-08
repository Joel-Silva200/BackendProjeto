var express = require('express')
var router = express.Router();
var quarto = require("../Models/quarto.js")
var hotel = require("../Models/hotel.js")

router.post("/:idHotel", async (req,res,next) => {
    const idHotel = req.params.idHotel;
    const novoQuarto = new quarto(req.body);
  
    try {
      const quarto = await novoQuarto.save();
      try {
        await hotel.findByIdAndUpdate(idHotel, {
          $push: { quartos: quarto._id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json(quarto);
    } catch (err) {
      next(err);
    }
});
  
router.put("/:id", async (req,res,next) => {
    try {
      const quartoAtualizado = await quarto.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(quartoAtualizado);
    } catch (err) {
      next(err);
    }
});

router.put("/disponibilidade/:id", async (req,res,next) => {
    try {
      await quarto.updateOne(
        { "nQuartos._id": req.params.id },
        {
          $push: {
            "nQuartos.$.datasIndisponiveis": req.body.dates
          },
        }
      );
      res.status(200).json("Estado do quarto atualizado.");
    } catch (err) {
      next(err);
    }
});

router.delete("/:id/:idHotel", async (req,res,next) => {
    const idHotel = req.params.idHotel;
    try {
      await quarto.findByIdAndDelete(req.params.id);
      try {
        await hotel.findByIdAndUpdate(idHotel, {
          $pull: { quartos: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Quarto apagado.");
    } catch (err) {
      next(err);
    }
});

router.delete("/:id", async (req,res,next) => {
    try {
      await quarto.findByIdAndDelete(req.params.id);
      res.status(200).json("Quarto apagado.");
    } catch (err) {
      next(err);
    }
});

router.get("/:id", async (req,res,next) => {
    try {
      const quarto1 = await quarto.findById(req.params.id);
      res.status(200).json(quarto1);
    } catch (err) {
      next(err);
    }
});

router.get("/", async (req,res,next) => {
    try {
      const quartos = await quarto.find();
      res.status(200).json(quartos);
    } catch (err) {
      next(err);
    }
});

module.exports = router;
