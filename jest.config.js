module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  clearMocks: true,
  setupFilesAfterEnv:  ["./src/lib/prisma/client.mock.ts"]
};
