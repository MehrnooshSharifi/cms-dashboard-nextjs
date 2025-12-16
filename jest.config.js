const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  // مهم: به Jest اجازه می‌دهد فایل‌های ESModule مثل recharts را بخواند
  transformIgnorePatterns: [
    "/node_modules/(?!recharts|d3|internmap|delaunator|robust-predicates)/",
  ],
};

module.exports = createJestConfig(config);
