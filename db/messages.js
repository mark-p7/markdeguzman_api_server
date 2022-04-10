const knex = require("./knex");

function createMessage(message) {
    return knex("message").insert(message);
};

function getAllMessages() {
    return knex("message").select("*");
};

module.exports = {
    createMessage,
    getAllMessages
}