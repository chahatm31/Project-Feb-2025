function CurrencyConverter() {
    // Hardcoded exchange rates as an example
    const exchangeRates = {
        USD: { EUR: 0.91, GBP: 0.78, INR: 82.5 },
  EUR: { USD: 1.1, GBP: 0.86, INR: 90.5 },
  GBP: { USD: 1.28, EUR: 1.16, INR: 105.3 },
  INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095 },
    };

    const conversionFeePercentage = 2; // 2% conversion fee

    // Validate user input
    function validateAmount(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Invalid amount. Please enter a positive number.');
        }
    }

    // Validate currency
    function validateCurrency(currency) {
        if (!exchangeRates[currency]) {
            throw new Error('Invalid currency. Supported currencies are USD, EUR, GBP, and INR.');
        }
    }

    // Convert amount from one currency to another
    this.convert = function(amount, fromCurrency, toCurrency) {
        validateAmount(amount);
        validateCurrency(fromCurrency);
        validateCurrency(toCurrency);

        const rate = exchangeRates[fromCurrency][toCurrency];
        let convertedAmount = amount * rate;

        // Apply conversion fee
        const fee = (convertedAmount * conversionFeePercentage) / 100;
        convertedAmount -= fee;

        return convertedAmount.toFixed(2);
    };

    // Update rates - placeholder for manual rate update
    this.updateRates = function(newRates) {
        for (let currency in newRates) {
            if (exchangeRates[currency]) {
                exchangeRates[currency] = {
                    ...exchangeRates[currency],
                    ...newRates[currency]
                };
            }
        }
    };
}

module.exports = CurrencyConverter;