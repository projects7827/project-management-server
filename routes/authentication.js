let express = require('express');
let router = express.Router();
let user_model = require('../models/user.js');
const { find_document } = require('../functions.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.use((req, res, next) => {
    try {
        jwt.verify(req.cookies.user_token, process.env.SRCRET_KEY, (err) => {
            if (err) {
                // if (err.name === 'TokenExpiredError') {
                //     return res.status(403).send({ "status": "error", "message": "Token Expired" });
                // }
                // return res.status(403).send({ "status": "error", "message": "Invalid Token" });
                res.redirect('/login');
                return
            }
            next();
        });
    }
    catch (err) {
        return res.status(500).send({ "status": "error", "message": "Internal Server Error" });
    }
})
router.post("/login", () => {
    try {
        let email = req.body.email
        let password = req.body.email

        if (email === undefined || email === undefined) {
            return res.status(400).send({ "message": "email not found" })
        }
        else if (password === undefined || password.trim() === "") {
            return res.status(400).send({ "message": "password not found" })
        }
        else {
            find_document({ email }, user_model).then(async (data) => {
                if (data.email === undefined) {
                    return res.status(401).send({ "message": "wrong credentials" })
                }
                else if (!await bcrypt.compare(password, data.password)) {
                    return res.status(401).send({ "message": "wrong password entered" })
                }
                else {
                    const token = jwt.sign(data, process.env.SRCRET_KEY, { expiresIn: '1h' });
                    data['user_token'] = token
                    return res.status(200).send({ "status": "success", data })
                }
            }).catch((err) => {
                return res.status(500).send({ "message": err })
            })
        }
    }
    catch (err) {
        return res.status(500).send({ "message": err })

    }
})
router.post("/sign-up", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let body = { email, password: hashedPassword }

        await add_document(body, user_model)
        return res.status(200).send({ "status": "success" })
    }

    catch (err) {
        return res.status(500).send({ "status": "error", "message": err })
    }
})
module.exports = router