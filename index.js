const express = require('express');
require('dotenv').config();
const logRouter = require('./routers/log.router.js');
const analyticsRouter =require('./routers/analytics.router.js');
const dbConnection = require('./helpers/dbConnection.js');
const cors = require('cors');
const authenticate = require('./routers/user.auth.js');
const archiveLogs =  require('./helpers/archiveLogs.js');

const app = express();
app.use(cors());
app.use(express.json())

// Setting archivelogs to run every day. 30 here is the # of days 
setInterval(() => archiveLogs(30), 24 * 60 * 60 * 1000);

dbConnection()
.then(()=> {
    app.listen(process.env.PORT || 3000, ()=>{    
        console.log(`Server listening on port: ${process.env.PORT}`)
    })
})

app.use('/logs', logRouter);

app.use('/analytics', analyticsRouter);

app.use('/generatetoken', authenticate);

app.use('/', (_, res)=>{
    res.send('Test API');
})

