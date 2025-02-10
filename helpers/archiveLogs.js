const Logs =  require('../model/log.model');
const ArchiveLog = require('../model/archiveLogs.model');

const archiveLogs = async (archiveDays) => {
    const toBeArchived = new Date();
    toBeArchived.setDate(toBeArchived.getDate() - archiveDays);

    const filterLogs = await Logs.find({timestamp: {$lt: toBeArchived}})
    if (filterLogs.length > 0){
            await ArchiveLog.insertMany(filterLogs);
            await Logs.deleteMany({timestamp: {$lt: toBeArchived}});
            console.log(`Archived ${filterLogs.length} logs`);
    }
}

module.exports = archiveLogs;
