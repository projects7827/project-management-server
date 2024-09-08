let express = require('express');
let router = express.Router();
let project_model = require('../models/project.js');
const { find_document, update_document, assign_data } = require('../functions.js');
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
        find_document(filter_data, project_model).then((data) => {
            return res.status(200).send(data)
        }).catch((err) => {
            return res.status(500).send(err)
        })
    }
    catch (err) {
        return res.status(500).send({ "message": "error", "err": err })
    }
})
router.put("/assign-project", (req, res) => {
    let user_name = req.cookies['UN']
    let user_id = req.cookies['UID']
    let user_image = req.cookies['UIM']
    let project_id = req.body.id;
    if (id !== undefined) {
        if (id) {
            project_id = id
        }
        else {
            return res.status(200).send({ "message": "invalid project id mentioned" })
        }
    }
    let update_data = { user_id, user_name, user_image }
    assign_data(update_data, project_id, project_model).then(() => {
        return res.status(200).send({ "status": "success" })
    }).catch((err) => {
        console.log(err)
        return res.status(500).send({ "message": "error", "err": err })
    })
})
router.post("/", (req, res) => {
    try {
        let body = req.body;
        add_document(body, project_model).then(() => {
            res.status(200).send({ "status": "success" })
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
        update_document(input_query, body, project_model).then(() => {// used to updating document
            return res.status(200).send({ "status": "success" })
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
    project_model.deleteOne(input_query, project_model).then(() => {// used to updating document
        return res.status(200).send({ "status": "success" })
    }).catch((err) => {
        console.log(err)
        return res.status(500).send({ "message": "error", "err": err })
    })
})
module.exports = router