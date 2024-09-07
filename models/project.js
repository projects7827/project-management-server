let mongoose = require("mongoose")
const { generate_random_number } = require("../functions")

let task_schema = new mongoose.Schema({
    "id": { type: Number, default: generate_random_number() },
    "subject": String,
    "status": String
})

let schema = new mongoose.Schema({
    "id": {
        type: Number,
        default: generate_random_number()
    },
    "status": String,
    "name": String,
    "details": String,
    "created_on": {
        type: String,
        immutable: true,
    },

    "duration_from": String,
    "duration_to": String,
    "tasks": [task_schema]
})

let models = mongoose.model("projects", schema)
module.exports = models