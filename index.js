
const { Telegraf, Markup } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN is missing!");
}

const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
  await ctx.reply(
    `أهلاً بيك في Zezo Bot 🤖❤️

اختار الخدمة اللي محتاجها:`,
    Markup.inlineKeyboard([
      [Markup.button.callback("📚 منصات التعليم", "platforms")],
      [Markup.button.callback("📊 متابعة التقدم", "progress")],
      [Markup.button.callback("🧠 مساعد الدراسة", "study")],
      [Markup.button.callback("ℹ️ معلومات البوت", "about")]
    ])
  );
});

bot.action("platforms", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
    "📚 منصات التعليم\n\nاختار المنصة:",
    Markup.inlineKeyboard([
      [Markup.button.callback("💻 Qureo", "qureo")],
      [Markup.button.callback("💰 الثقافة المالية", "finance")],
      [Markup.button.callback("⬅️ الرئيسية", "home")]
    ])
  );
});

bot.action("qureo", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply("💻 منصة Qureo\nسيتم إضافة متابعة الدروس والتقدم قريباً.");
});

bot.action("finance", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply("💰 منصة الثقافة المالية\nسيتم إضافة متابعة الدروس والتقدم قريباً.");
});

bot.action("progress", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply("📊 قسم متابعة التقدم\nسيتم ربط قاعدة البيانات لاحقاً.");
});

bot.action("study", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply("🧠 مساعد الدراسة جاهز لمساعدتك في فهم الأسئلة والتدريب عليها.");
});

bot.action("about", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply("🤖 Zezo Bot\nإصدار 1.0\nبوت تعليمي لمتابعة التقدم.");
});

bot.action("home", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply("🏠 القائمة الرئيسية", Markup.inlineKeyboard([
    [Markup.button.callback("📚 منصات التعليم", "platforms")],
    [Markup.button.callback("📊 متابعة التقدم", "progress")],
    [Markup.button.callback("🧠 مساعد الدراسة", "study")]
  ]));
});

bot.launch().then(() => {
  console.log("Zezo Bot is running!");
}).catch(console.error);

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
