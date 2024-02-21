const fs = require('fs');
const moment = require('moment');
const file = './server/db/stats.json';
const logger = (name, action) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const log = JSON.parse(data);
            log.contents.push({
                prod_name: name,
                action: action,
                time: moment().format('MMMM Do YYYY, h:mm:ss a')
            });
            fs.writeFile(file, JSON.stringify(log, null, 4), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    })
};

module.exports = logger;