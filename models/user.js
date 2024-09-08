let mongoose = require("mongoose")
const { generate_random_number } = require("../functions")

let schema = new mongoose.Schema({
    "id": {
        type: Number,
        unique: true,
        default: generate_random_number(),
    },
    "email": String,
    "password": String,
    "mobile": Number,
    "full_name": String,
    "user_type": String,
    "post": String,
    "created_on": String
})

let models = mongoose.model("users", schema)
module.exports = models