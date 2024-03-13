module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./src"],
  silent: false,
  verbose: true,
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).[tj]s"],
  collectCoverageFrom: ["src/**"],
  coverageReporters: ["text"],
  coverageDirectory: "./test-coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageThreshold: {
    global: {
      lines: 85,
    },
  },
};
