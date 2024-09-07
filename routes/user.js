let express = require('express');
let router = express.Router();
let user_model = require('../models/user.js');
const { find_document } = require('../functions.js');
router.get("/", (req, res) => {
    try {
        let id = req.query.id;
        let filter_data = {}
        if (id !== undefined) {
            if (id) {
                filter_data["id"] = id
            }
            else {
                return res.status(200).send({ "message": "invalid id mentioned" })
            }
        }
        find_document(filter_data, user_model).then((data) => {
            return res.status(200).send(data)
        }).catch((err) => {
            return res.status(500).send(err)
        })
    }
    catch (err) {
        return res.status(500).send({ "message": "error", "err": err })
    }
})
router.post("/", (req, res) => {
    try {
        let body = req.body;
        user_model.insertMany(body).then(() => {
            res.status(200).send({ "message": "success" })
        }).catch((err) => {
            console.log(err)
            res.status(500).send({ "message": "error", "err": err })
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})



router.put("/", (req, res) => {
    try {
        let body = req.body;
        let id = body.id
        let input_query = {};
        if (id !== undefined) {
            if (id) {
                input_query["id"] = id
            }
            else {
                return res.status(200).send({ "message": "invalid id mentioned" })
            }
        }
        find_document(input_query, user_model).then(() => {
            user_model.updateOne(input_query, body).then(() => {// used to updating document
                return res.status(200).send({ "message": "success" })
            }).catch((err) => {
                console.log(err)
                return res.status(500).send({ "message": "error", "err": err })
            })
        }).catch((err) => {
            console.log(err)
            return res.status(500).send({ "message": "error", "err": err })
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

router.delete("/", (req, res) => {

    let body = req.body;
    let id = body.id
    let input_query = {};
    if (id !== undefined) {
        if (id) {
            input_query["id"] = id
        }
        else {
            return res.status(200).send({ "message": "invalid id mentioned" })
        }
    }
    find_document().then(() => {
        user_model.deleteOne(input_query, user_model).then(() => {// used to updating document
            return res.status(200).send({ "message": "success" })
        }).catch((err) => {
            console.log(err)
            return res.status(500).send({ "message": "error", "err": err })
        })
    }).catch(() => {
        console.log(err)
        return res.status(500).send({ "message": "error", "err": err })
    })


})
module.exports = router