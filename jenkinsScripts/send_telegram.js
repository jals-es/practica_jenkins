const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: false });

bot.sendMessage(process.env.MY_TELEGRAM_ID, "Jenkinsfile ejecutado correctamente tras el último commit. Saludos " + process.env.ejecutor).then(() => {
    process.exit(0);
}).catch(() => {
    process.exit(1);
});