exports.up = function(knex, Promise) {
    knex.schema.createTable('tags', (table) => {
        table.increments('id')
        table.string('value').unique()
    }).then(() => console.log("table created"))
        .catch((err) => { console.log(err); throw err })
        .finally(() => {
            knex.destroy();
        });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('tags')
};
