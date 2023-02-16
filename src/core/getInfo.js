const TelegramBot = require('node-telegram-bot-api');

const token = "6204161622:AAHmUiKijW1ztyiN9k09Wx_xbxFzI1kaFN4"

const bot = new TelegramBot(token, { polling: true })

module.exports = function () {
    const ytdl = require("ytdl-core");
const fs = require('fs')

module.exports = async function (videoURL) {
    // dawnload audio from url
    const videoDetails = await ytdl.getInfo(videoURL)

    return videoDetails

};
}