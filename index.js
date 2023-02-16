// process.env["NTBA_FIX_350"] = 1;
// const express = require("express");
// const app = express();
// const TelegramBot = require('node-telegram-bot-api');
// const getAudio = require("./src/core/getAudio");
// const deleteAudio = require("./src/core/deleteAudio");
// const { getInfo } = require("ytdl-core");

// const port = process.env.PORT || 5000;
// const token = "6204161622:AAHmUiKijW1ztyiN9k09Wx_xbxFzI1kaFN4"
// const bot = new TelegramBot(token, { polling: true })

// const filePath = './src/audio';

// bot.on('callback_query', function (query) {
//   const chatId = query.message.chat.id;
//   const messageId = query.message.message_id;
//   const data = query.data;

//   console.log(`Received callback query: ${data}`);
//   const audioPath = filePath + '/' + data + '.mp3'

//   bot.sendAudio(chatId, audioPath, {})
//     .finally(() => { deleteAudio(audioPath) })

// });



// bot.on("message", async function onAudio(msg) {
//   const chatId = msg.chat.id
//   const text = msg.text
//   // console.log(text);
//   // console.log(file)

//   // if (text === '/start') {
//   //   bot.sendMessage(chatId, 'Welcome to Tune Bot')
//   // }

//   if (text) {
//     const { videoDetails } = await getInfo(text)
//     getAudio(text)
//     // bot.sendPhoto(
//     //   chatId,
//     //   videoDetails.thumbnails[0].url,
//     //   {
//     //     caption: `${videoDetails.title}`,
//     //     reply_markup: {
//     //       inline_keyboard: [[
//     //         { text: "Dawnload", callback_data: `${videoDetails.title}` }
//     //       ]]
//     //     }
//     //   }
//     // )
//     bot.sendMessage(
//       chatId,
//       `${videoDetails.title}`,
//     )
//   }

// })

// bot.on('polling_error', (error) => {
//   console.log(error.code);  // => 'EFATAL'
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });



const TelegramBot = require('node-telegram-bot-api');
const ytdl = require('ytdl-core');
const fs = require('fs');

// Replace TELEGRAM_BOT_TOKEN with your actual Telegram bot token
const token = "6204161622:AAHmUiKijW1ztyiN9k09Wx_xbxFzI1kaFN4"

const bot = new TelegramBot(token, {polling: true});

// When the bot receives a message containing a YouTube URL, download the audio and send it to the user
bot.onText(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.*/, async (msg, match) => {
  try {
    // Get the chat ID and message ID
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    // Get the YouTube video ID from the URL
    const videoId = ytdl.getURLVideoID(match[0]);

    // Download the audio from the YouTube video
    const stream = ytdl(`https://www.youtube.com/watch?v=${videoId}`, {filter: "audioonly", quality: 'highestaudio' });
    const audioData = await streamToBuffer(stream);

    // Send the audio to the user
    bot.sendAudio(chatId, audioData, {
      title: `Audio from YouTube video ${videoId}`,
      filename: `${videoId}.mp3`,
      reply_to_message_id: messageId
    });
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, 'Error: Could not download audio from YouTube video.');
  }
});


// Helper function to convert a ReadableStream to a Buffer
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    stream.on('error', reject);
  });
}
