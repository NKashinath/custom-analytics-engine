const express = require('express');
const logRateLimiter = require ('../helpers/rateLimiter.js');
const Log = require('../model/log.model');
const validateUser = require('../helpers/validateUser.js');

const router = express.Router();


router.post('/', logRateLimiter, validateUser, async (req, res) => {
    try {
        const {endpoint, method, userId, timestamp} = req.body;
        if(userId == 'AnalyticsEngineUser'){
            res.status(400).json({message: "invalid userId"});
        }
        const log = new Log({endpoint, method, userId, timestamp});
        await log.save();
        res.status(201).json({message: 'Log created!'})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error})
    }    
})

router.get('/', async (req, res)=>{
    try {
        const {startDate, endDate, endpoint, userId, page=1, limit =20} = req.query;
        
        const filterLogs = {}

        if(startDate && endDate){
            filterLogs.timestamp = {
                $gte: new Date(`${startDate}T00:00:00.000Z`), 
                $lte: new Date(`${endDate}T23:59:59.999Z`)}
        };
        if(endpoint) {
            filterLogs.endpoint = endpoint
        }
        if(userId){
            filterLogs.userId = userId
        }

        const Logs = await Log.find(filterLogs)
        .sort({timestamp: -1})
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
        res.status(200).json({message: "Success", data: Logs})
    } catch (error) {   
        res.status(500).json({message: "Internal Server Error", error: error})
    }
})

module.exports = router;
