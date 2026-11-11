
const express = require("express");
const { Telegraf } = require("telegraf");

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Zezo Bot is running!");
});

app.post("/telegram", (req, res, next) => {
  bot.handleUpdate(req.body)
    .then(() => res.sendStatus(200))
    .catch(next);
});

bot.start((ctx) => {
  ctx.reply(
    "أهلاً بيك في Zezo Bot 🤖❤️\n\nاختار الخدمة اللي محتاجها:",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "📚 منصات التعليم", callback_data: "platforms" }],
          [{ text: "📊 متابعة التقدم", callback_data: "progress" }],
          [{ text: "🧠 مساعد الدراسة", callback_data: "study" }]
        ]
      }
    }
  );
});

bot.action("platforms", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("📚 قسم منصات التعليم");
});

bot.action("progress", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("📊 قسم متابعة التقدم");
});

bot.action("study", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("🧠 مساعد الدراسة");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Zezo Bot server started!");
});
