
exports.up = function(knex, Promise) {
    knex.schema.createTable('newsletters', (table) => {
        table.increments('id')
        table.integer('emailId').unsigned().notNullable();
        table.foreign('emailId').references('id').inTable('emails').onDelete('CASCADE').onUpdate('CASCADE');
    }).then(() => console.log("table created"))
        .catch((err) => { console.log(err); throw err })
        .finally(() => {
            knex.destroy();
        });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('newsletters')
};
