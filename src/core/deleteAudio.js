const fs = require('fs');

module.exports = (filePath) => {
    fs.unlink(filePath, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('File deleted');
        }
    })
}