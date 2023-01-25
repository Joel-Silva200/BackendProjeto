const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    morada: {
        type: String,
        required: true,
    },

    contribuinte: {
        type: Number,
        required: true,
        unique: true,
    },

    foto: {
        type: [String],
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", UserSchema, "Users")