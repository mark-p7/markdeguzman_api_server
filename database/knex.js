const knex = require("knex");

const connectedKnex = knex({
    client: 'sqlite3',
    connection: {
        filename: `./messages.db`
    }
});

module.exports = connectedKnex;