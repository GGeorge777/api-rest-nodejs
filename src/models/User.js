const mongoose = require("../database");

const bcrypstjs = require("bcryptjs");

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    telefone: {
        type: String,
        required: true,
        unique: true,
    },
    ddd: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,   
    },
    ultimo_login: {
        type: Date,
        default: null,
    }
});

UserSchema.pre("save", async function(next) {
    const hash = await bcrypstjs.hash(this.password, 10);
    this.password = hash;
})

const User = mongoose.model("User", UserSchema);

module.exports = User;