exports.up = function(knex, Promise) {
    knex.schema.createTable('pages', (table) => {
        table.increments('id')
        table.string('title').unique()
        table.string('description')
        table.string('content')
        table.string('slug').unique()
        table.integer('author').unsigned().notNullable();
        table.foreign('author').references('id').inTable('users');
        table.enu('category', ['tecnica','licenciatura','capacitacion','blog','diplomad','equipo','ofertas'])
    }).then(() => console.log("table created"))
        .catch((err) => { console.log(err); throw err })
        .finally(() => {
            knex.destroy();
        });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('pages')
};
