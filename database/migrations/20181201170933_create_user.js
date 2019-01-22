
exports.up = function(knex, Promise) {
    knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('username')
        table.string('email').unique()
        table.string('password')
        table.timestamps()
    }).then(() => console.log("table created"))
        .catch((err) => { console.log(err); throw err })
        .finally(() => {
            knex.destroy();
        });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('users')
};
