const ytdl = require("ytdl-core");
const fs = require('fs')

module.exports = async function (videoURL) {
    // dawnload audio from url
    const directory = './src/audio/'
    var stream = await ytdl(videoURL, {
        quality: "highestaudio",
        filter: "audioonly",
    }).on('end', ()=> {
        console.log('stream !!!');
    })

};