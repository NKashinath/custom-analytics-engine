const tokenGen = require('../helpers/jwtTokenGenerator');
const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    try {
        const {userId} = req.body;
        res.status(201).json({message: "Success", token: `Bearer ${tokenGen(userId)}`})
    } catch (error) {
        res.status(500).json({message:"Failed to generate", err: error})
    }
})
module.exports = router;