
exports.up = function(knex, Promise) {
    knex.schema.createTable('emails', (table) => {
        table.increments('id')
        table.string('email').unique()
        table.timestamps();
    }).then(() => console.log("table created"))
        .catch((err) => { console.log(err); throw err })
        .finally(() => {
            knex.destroy();
        });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('emails')
};
