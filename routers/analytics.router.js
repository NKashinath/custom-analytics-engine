const express = require('express');

const router = express.Router();
const Log = require('../model/log.model');

router.get('/summary', async (_, res) => {
    try {
        const summary = await Log.aggregate([
            {$group: {_id: "$endpoint", totalRequests : {$sum: 1} }},
            {$project: {_id:0, endpoint: "$_id", totalRequests: 1}},
            {$sort:{totalRequests: -1}}
        ]);
        const mostAccessed = summary.length >0 ? summary[0] : null;
        result = [{summary}, {mostAccessed}]
        res.status(200).json({message: "Success", data: result});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", err: error})
    }

})

router.get('/user/:userId', async (req, res)=> {
    try {
        const {userId} = req.params;
        const userSessions = await Log.aggregate([
            {$match: {userId}},
            {$group: {_id: "$userId", totalRequests:{$sum:1}, accessedEndpoints:{$addToSet: "$endpoint"}}}
        ]);
        result = userSessions ? userSessions : `Specified user ${userId} No activity`;
        res.status(200).json({message:"Success", data : result})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", err: error})
    }
})

module.exports = router;