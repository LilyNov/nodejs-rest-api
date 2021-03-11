require("dotenv").config();
const uriDb = process.env.URI_DB;

process.on("SIGINT", async () => {
  const client = await db;
  client.close();
  console.log("Connection for db closed and app termination");
  process.exit(1);
});

module.exports = db;
