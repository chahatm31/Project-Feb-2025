const { execSync } = require("child_process");

const testFiles = [
  "response-1.js",
  "response-2.js",
  "response-3.js",
  "response-4.js",
  "response-5.js",
];

const runTests = (file) => {
  console.log(`\nRunning tests with ${file}...\n`);
  try {
    execSync(`npx cross-env JEST_CURRENCY_MODULE=${file} npx jest`, {
      stdio: "inherit",
      shell: true,
    });
  } catch (error) {
    console.error(`Tests failed for ${file}`);
  }
};

// Run tests for each file
testFiles.forEach(runTests);
