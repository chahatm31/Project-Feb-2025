const responseFile = process.env.JEST_CURRENCY_MODULE || "response-1.js";
const CurrencyConverter = require(`./${responseFile}`);

describe(`CurrencyConverter - ${responseFile}`, () => {
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
