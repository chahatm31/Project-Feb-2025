function CurrencyConverter() {
  const conversionFees = 0.02; // 2% fee
  const exchangeRates = {
    USD: { EUR: 0.91, GBP: 0.78, INR: 82.5 },
    EUR: { USD: 1.1, GBP: 0.86, INR: 90.5 },
    GBP: { USD: 1.28, EUR: 1.16, INR: 105.3 },
    INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095 },
  };

  this.convertCurrency = function (amount, fromCurrency, toCurrency) {
    // Input validation
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Amount must be a positive number');
    }
    if (!exchangeRates[fromCurrency]) {
      throw new Error(`Unsupported "from" currency: ${fromCurrency}`);
    }
    if (!exchangeRates[fromCurrency][toCurrency]) {
      throw new Error(`Unsupported "to" currency: ${toCurrency}`);
    }

    // Get exchange rate
    const rate = exchangeRates[fromCurrency][toCurrency];

    // Convert amount
    const convertedAmount = amount * rate;

    // Deduct fee
    const fee = convertedAmount * conversionFees;
    const finalAmount = convertedAmount - fee;

    return finalAmount;
  };
}

module.exports = CurrencyConverter;