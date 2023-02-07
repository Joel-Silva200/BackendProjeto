const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuartoSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    preco: {
      type: Number,
      required: true,
    },
    maxLotacao: {
      type: Number,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    nQuartos: [{ 
        required: true,
        number: Number, 
        datasIndisponiveis: {type: [Date]}
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quartos", QuartoSchema, "Quartos");
