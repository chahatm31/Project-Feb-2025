const AIModelHandler = require("./core.js");
const fs = require("fs");
const path = require("path");

const chat = new AIModelHandler();

function extractJavaScript(markdownText) {
  const jsRegex = /```(?:js|javascript)\n([\s\S]*?)```/g;
  let match,
    extractedCode = "";

  while ((match = jsRegex.exec(markdownText)) !== null) {
    extractedCode += match[1] + "\n";
  }

  return extractedCode.trim();
}

const getResponses = async (prompt) => {
  for (let i = 1; i <= 5; i++) {
    try {
      const response = await chat.ask(prompt);
      const responseContent = response.choices[0].message.content;

      const filePath = path.join(`response-${i}.js`);
      fs.writeFileSync(filePath, extractJavaScript(responseContent), "utf-8");
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  }

  console.log("Responses saved in the current root folder.");
};

const prompt = `create a CurrencyConverter() utility function in javascript that will allow me to convert between multiple currencies and it should support converting between USD, EUR, GBP and INR with real time conversion rates. Input should accept amounts in one currency, convert to other currencies, and return the result. The following features need to be implemented - Currency Conversion to convert between USD, EUR, GBP, and INR. Rate Updates to automatically fetch updated exchange rates from a fixed data set every time the user performs a conversion. Input Validation to make sure that the user inputs valid positive numbers and throw an error for invalid inputs. Fee Deduction to apply a conversion fee like 2% on the converted amount. donot use any api. give only the complete function implementation without example usage and do module.exports in end`;

getResponses(prompt);
