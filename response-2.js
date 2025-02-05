const currencyRates = {
  USD: { EUR: 0.91, GBP: 0.78, INR: 82.5 },
  EUR: { USD: 1.1, GBP: 0.86, INR: 90.5 },
  GBP: { USD: 1.28, EUR: 1.16, INR: 105.3 },
  INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095 },
};

function CurrencyConverter(amount, fromCurrency, toCurrency) {
  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('Invalid amount, please enter a positive number');
  }
  
  if (!currencyRates[fromCurrency] || !currencyRates[toCurrency]) {
    throw new Error('Invalid currency, supported currencies are: USD, EUR, GBP, INR');
  }
  
  // Convert the amount to the target currency
  const convertedAmount = amount * currencyRates[fromCurrency][toCurrency];
  
  // Apply a 2% conversion fee
  const fee = 0.02 * convertedAmount;
  
  // Deduct the fee from the converted amount
  const finalAmount = convertedAmount - fee;

  return finalAmount.toFixed(2);
}

module.exports = CurrencyConverter;