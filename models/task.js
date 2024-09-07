let mongoose = require("mongoose")
const { generate_random_number } = require("../functions")

let details_schema = new mongoose.Schema({
    "name": String,
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
    "subject": String,
    "duration_from": String,
    "duration_to": String,
    "created_on": String,
    "details": [details_schema],
    "assigned_to": [assigned_to_schema]
})


let models = mongoose.model("tasks", schema)
module.exports = models