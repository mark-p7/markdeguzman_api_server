const knex = require("knex");

const connectedKnex = knex({
    client: 'sqlite3',
    connection: {
        filename: "markdeguzman_server/messages.db"
    }
})

module.exports = connectedKnex;