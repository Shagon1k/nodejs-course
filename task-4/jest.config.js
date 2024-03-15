module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./src"],
  silent: false,
  verbose: true,
  projects: [
    {
      displayName: "unit-integration",
      preset: "ts-jest",
      testMatch: [
        "**/__tests__/**/*.unit.(spec|test).ts",
        "**/__tests__/**/*.integration.(spec|test).ts",
      ],
      coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/"],
    },
    {
      displayName: "e2e",
      preset: "ts-jest",
      testMatch: ["**/__tests__/**/*.e2e.(spec|test).ts"],
      coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/"],
    },
  ],
  collectCoverageFrom: ["src/**"],
  coverageReporters: ["text"],
  coverageDirectory: "./test-coverage",
  coverageThreshold: {
    global: {
      lines: 85,
    },
  },
};
