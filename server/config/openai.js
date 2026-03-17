const openai = require("openai");
const client = new openai.OpenAI({apiKey:process.env.openAi_key3});
module.exports = client;