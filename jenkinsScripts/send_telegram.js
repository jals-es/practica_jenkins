const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.sendMessage(process.env.MY_TELEGRAM_ID, "Jenkinsfile ejecutado correctamente tras el último commit. Saludos " + process.env.ejecutor);

process.exit(0);