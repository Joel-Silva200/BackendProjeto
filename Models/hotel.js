const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },

    categoria: {
        type: String,
        required: true,
    },

    cidade: {
        type: String,
        required: true,
    },

    endereco: {
        type: String,
        required: true,
    },

    distancia: {
        type: String,
        required: true,
    },

    fotos: {
        type: [String],
    },

    titulo: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        min: 0,
        max: 5,
    },

    quartos: {
        type: [String],
    },

    preco: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model("Hoteis", HotelSchema, "Hoteis")