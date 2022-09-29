import "dotenv/config"

import config from "./config";

import app from "./app";

const port = config.PORT;

app.listen(port, () => {
  console.log(`[server]: server is running at http://localhost:${port}`);
});
