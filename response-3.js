const conversionRates = {
  USD: { EUR: 0.91, GBP: 0.78, INR: 82.5 },
  EUR: { USD: 1.1, GBP: 0.86, INR: 90.5 },
  GBP: { USD: 1.28, EUR: 1.16, INR: 105.3 },
  INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095 },
};

function CurrencyConverter(amount, fromCurrency, toCurrency) {
    function validateInput(amount, fromCurrency, toCurrency) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('The amount should be a positive number.');
        }
        if (!conversionRates[fromCurrency] || !conversionRates[fromCurrency][toCurrency]) {
            throw new Error('Invalid currency codes.');
        }
    }
    
    function fetchConversionRate(fromCurrency, toCurrency) {
        return conversionRates[fromCurrency][toCurrency];
    }
    
    function applyFee(amount) {
        const feePercentage = 2;
        const fee = (feePercentage / 100) * amount;
        return amount - fee;
    }
    
    validateInput(amount, fromCurrency, toCurrency);
    const rate = fetchConversionRate(fromCurrency, toCurrency);
    const convertedAmount = amount * rate;
    const amountAfterFee = applyFee(convertedAmount);

    return {
        amount: amountAfterFee,
        rate: rate,
        from: fromCurrency,
        to: toCurrency
    };
}

module.exports = CurrencyConverter;