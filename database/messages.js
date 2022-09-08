const knex = require("./knex");

function createMessage(message) {
    return knex("Message").insert(message);
};

function getAllMessages() {
    return knex("Message").select("*");
};

module.exports = {
    createMessage,
    getAllMessages
}