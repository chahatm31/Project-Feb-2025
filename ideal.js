const exchangeRates = {
  USD: { EUR: 0.91, GBP: 0.78, INR: 82.5 },
  EUR: { USD: 1.1, GBP: 0.86, INR: 90.5 },
  GBP: { USD: 1.28, EUR: 1.16, INR: 105.3 },
  INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095 },
};

const CONVERSION_FEE_PERCENT = 2;

function CurrencyConverter(amount, fromCurrency, toCurrency) {
  if (typeof amount !== "number" || amount <= 0) {
    throw new Error("Invalid amount. Please enter a positive number.");
  }

  fromCurrency = fromCurrency.toUpperCase();
  toCurrency = toCurrency.toUpperCase();

  if (
    !exchangeRates[fromCurrency] ||
    !exchangeRates[fromCurrency][toCurrency]
  ) {
    throw new Error(
      "Invalid currency pair. Supported currencies: USD, EUR, GBP, INR."
    );
  }

  let convertedAmount = amount * exchangeRates[fromCurrency][toCurrency];
  let fee = (convertedAmount * CONVERSION_FEE_PERCENT) / 100;
  convertedAmount -= fee;

  return (Math.round((convertedAmount + Number.EPSILON) * 100) / 100).toFixed(
    2
  );
}

describe("CurrencyConverter", () => {
  test("Converts USD to EUR correctly", () => {
    expect(CurrencyConverter(100, "USD", "EUR")).toBe("89.18");
  });

  test("Converts EUR to GBP correctly", () => {
    expect(CurrencyConverter(100, "EUR", "GBP")).toBe("84.28");
  });

  test("Converts GBP to INR correctly", () => {
    expect(CurrencyConverter(100, "GBP", "INR")).toBe("10319.40");
  });

  test("Converts INR to USD correctly", () => {
    expect(CurrencyConverter(1000, "INR", "USD")).toBe("11.76");
  });

  test("Throws error for invalid amount (negative value)", () => {
    expect(() => CurrencyConverter(-50, "USD", "EUR")).toThrow(
      "Invalid amount. Please enter a positive number."
    );
  });

  test("Throws error for invalid amount (zero)", () => {
    expect(() => CurrencyConverter(0, "USD", "EUR")).toThrow(
      "Invalid amount. Please enter a positive number."
    );
  });

  test("Throws error for invalid currency code", () => {
    expect(() => CurrencyConverter(100, "ABC", "USD")).toThrow(
      "Invalid currency pair. Supported currencies: USD, EUR, GBP, INR."
    );
  });

  test("Throws error for same currency conversion", () => {
    expect(() => CurrencyConverter(100, "USD", "USD")).toThrow(
      "Invalid currency pair. Supported currencies: USD, EUR, GBP, INR."
    );
  });

  test("Handles very large amounts correctly", () => {
    expect(CurrencyConverter(1000000, "USD", "INR")).toBe("80850000.00");
  });

  test("Handles floating-point precision issues correctly", () => {
    expect(CurrencyConverter(99.99, "EUR", "GBP")).toBe("84.27");
  });
});
