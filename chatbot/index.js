const { onRequest } = require('firebase-functions/v2/https');
const { setGlobalOptions } = require('firebase-functions/v2/options');
const { defineSecret } = require('firebase-functions/params');
const { Telegraf } = require('telegraf');

setGlobalOptions({ maxInstances: 10 });

const telegramBotToken = defineSecret('TELEGRAM_BOT_TOKEN');

let botInstance = null;

function getBot() {
  const token = telegramBotToken.value();
  if (!token) {
    throw new Error('Missing TELEGRAM_BOT_TOKEN secret');
  }

  if (!botInstance) {
    botInstance = new Telegraf(token);
    botInstance.start((ctx) => ctx.reply('oi migo'));
    botInstance.command('ping', (ctx) => ctx.reply('pong'));
  }

  return botInstance;
}

exports.telegramWebhook = onRequest(
  { region: 'us-central1', secrets: [telegramBotToken] },
  async (req, res) => {
    try {
      await getBot().handleUpdate(req.body, res);
    } catch (error) {
      console.error('telegramWebhook error:', error);
      if (!res.headersSent) {
        res.status(500).send({ ok: false, error: 'Internal Server Error' });
      }
    }
  }
);

exports.setWebhook = onRequest(
  { region: 'us-central1', secrets: [telegramBotToken] },
  async (_req, res) => {
    try {
      const url = 'https://portfoliodanilo.com/telegram/webhook';
      await getBot().telegram.setWebhook(url);
      res.send({ ok: true, url });
    } catch (error) {
      console.error('setWebhook error:', error);
      res.status(500).send({ ok: false, error: 'Internal Server Error' });
    }
  }
);
