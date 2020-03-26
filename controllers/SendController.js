require('dotenv').config()
import express from 'express'
import jwt from 'jsonwebtoken'
const _ = require('lodash');
const router = express.Router();
const sendFromSAPI = require('../lib/sapi');
const calculateFee = require('../lib/sapi_fee');
const decrypt = require('../lib/decrypt');


//This method will create a token and send only IF it is a valid TOKEN. This is just to prevent any non Authorized APP to use it.
//You can create your own way. I just need a quick way to send without saving anything
router.post('/send', async (req, res) => {
    try {
        if (_.isUndefined(req.body) || _.isNull(req.body) || req.body.api_key != process.env.JWT_API_KEY || req.body.api_secret != process.env.JWT_API_SECRET) {
            return res.status(403).send(`You must have an API KEY and an API Secret in order to get the TOKEN`);
        }
        const app = {
            api_key: process.env.JWT_API_KEY,
            api_secret: process.env.JWT_API_SECRET
        }
        jwt.sign({
            user: app
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        }, async (err, token) => {
            if (err) {
                return res.status(403).send(`It was not possible to SIGN this TOKEN. This method is protected by TOKEN.`);
            } else {
                jwt.verify(token, process.env.JWT_SECRET, async (err, authData) => {
                    if (err) {
                        return res.status(403).send(`This method is protected by TOKEN.`);
                    } else {

                        let decryptedPK = decrypt(req.body.key);

                        if (_.isUndefined(decryptedPK) || _.isNull(decryptedPK))
                            return res.status(403).send(`Your PK could not be decrypted.`);

                        let payLoad = {
                            amount: req.body.amount,
                            from: req.body.from,
                            key: decryptedPK,
                            to: req.body.to
                        };
                        try {
                            //OK your APP is now authorized to SEND
                            return res.json(await sendFromSAPI(payLoad.to, payLoad.amount, payLoad.key));
                        } catch (err) {
                            console.error(err);
                            return res.status(400).send(`Error while trying to SEND -> ${err.message}`);
                        }
                    }
                });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(400).send(`${err.message}`);
    }
});

//This method will create a token and send only IF it is a valid TOKEN. This is just to prevent any non Authorized APP to use it.
//You can create your own way. I just need a quick way to send without saving anything
router.post('/fee', async (req, res) => {
    try {
        if (_.isUndefined(req.body) || _.isNull(req.body) || req.body.api_key != process.env.JWT_API_KEY || req.body.api_secret != process.env.JWT_API_SECRET) {
            return res.status(403).send(`You must have an API KEY and an API Secret in order to get the TOKEN`);
        }
        const app = {
            api_key: process.env.JWT_API_KEY,
            api_secret: process.env.JWT_API_SECRET
        }
        jwt.sign({
            user: app
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        }, async (err, token) => {
            if (err) {
                return res.status(403).send(`It was not possible to SIGN this TOKEN. This method is protected by TOKEN.`);
            } else {
                jwt.verify(token, process.env.JWT_SECRET, async (err, authData) => {
                    if (err) {
                        return res.status(403).send(`This method is protected by TOKEN.`);
                    } else {

                        let decryptedPK = decrypt(req.body.key);

                        if (_.isUndefined(decryptedPK) || _.isNull(decryptedPK))
                            return res.status(403).send(`Your PK could not be decrypted.`);

                        let payLoad = {
                            amount: req.body.amount,
                            from: req.body.from
                        };
                        try {
                            //OK your APP is now authorized to SEND
                            return res.json({
                                fee: await calculateFee(payLoad.amount, payLoad.from)
                            });
                        } catch (err) {
                            console.error(err);
                            return res.status(400).send(`Error while trying to calculate the FEE -> ${err.message}`);
                        }
                    }
                });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(400).send(`${err.message}`);
    }
});

//This method will create a token and send only IF it is a valid TOKEN. This is just to prevent any non Authorized APP to use it.
//You can create your own way. I just need a quick way to send without saving anything
/*router.post('/decrypt', async (req, res) => {
    try {
        if (_.isUndefined(req.body)) {
            return res.status(403).send(`You must have an API KEY and an API Secret in order to get the TOKEN`);
        }
        return res.json(decrypt(req.body.key));
    } catch (err) {
        console.error(err);
        return res.status(400).send(`Error while getting the TOKEN`);
    }
});*/
module.exports = router;