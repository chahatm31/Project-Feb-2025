function CurrencyConverter() {
  // Fixed dataset for exchange rates
  let exchangeRates = {
    "USD": {"EUR": 0.85, "GBP": 0.76, "INR": 74.55},
    "EUR": {"USD": 1.18, "GBP": 0.89, "INR": 87.53},
    "GBP": {"USD": 1.32, "EUR": 1.13, "INR": 98.16},
    "INR": {"USD": 0.013, "EUR": 0.011, "GBP": 0.010}
  };

  // Internal function to simulate real-time rate updates
  function updateRates() {
    // Here you might update the rates, for this example we're keeping them constant.
    // In practice, this would fetch new rates from a database or other source.
  }

  // Function to convert currency
  this.convertCurrency = function(amount, fromCurrency, toCurrency) {
    updateRates(); // Refresh rates each conversion

    // Validate input
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error("Invalid input: Amount must be a positive number.");
    }
    
    if (!exchangeRates[fromCurrency] || !exchangeRates[fromCurrency][toCurrency]) {
      throw new Error("Invalid currency code.");
    }

    // Perform conversion
    let rate = exchangeRates[fromCurrency][toCurrency];
    let convertedAmount = amount * rate;

    // Apply conversion fee of 2%
    const fee = 0.02 * convertedAmount;
    convertedAmount -= fee;

    return {
      amount: convertedAmount,
      fee: fee
    };
  };
}

module.exports = CurrencyConverter;