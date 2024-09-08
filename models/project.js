let mongoose = require("mongoose")
const { generate_random_number } = require("../functions")

let task_schema = new mongoose.Schema({
    "id": { type: Number, default: generate_random_number() },
    "subject": String,
    "status": String
})

let assigned_to_schema = new mongoose.Schema({
    "id": {
        type: Number,
        default: generate_random_number()
    },
    "name": String,
    "image": String
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
    "tasks": [task_schema],
    "assigned_to": [assigned_to_schema]
})

let models = mongoose.model("projects", schema)
module.exports = models