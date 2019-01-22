exports.up = function(knex, Promise) {
    
    knex.schema.createTable('images', (table) => {
        table.increments('id')
        table.string('path').unique()
        table.string('title')
        table.string('description')
        table.enu('tipo', ['slide', 'resource'])
       
    }).then(() => console.log("table created"))
        .catch((err) => { console.log(err); throw err })
        .finally(() => {
            knex.destroy();
        });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('images')
};
