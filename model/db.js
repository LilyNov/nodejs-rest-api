const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./modal/contacts.json");
const db = low(adapter);

// Set some defaults
db.defaults({ contacts: [] }).write();

module.exports = db;
