const { OpenAI } = require("openai");
const { config } = require("dotenv");

config();

class AIModelHandler {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async ask(prompt) {
    try {
      const response = await this.client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });
      return response;
    } catch (error) {
      throw new Error(`Error fetching response: ${error.message}`);
    }
  }
}

module.exports = AIModelHandler;
