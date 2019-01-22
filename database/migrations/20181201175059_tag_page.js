
exports.up = function(knex, Promise) {
    knex.schema.createTable('tag_page', (table) => {
        table.increments('id')
        table.integer('pageId').unsigned()
        table.foreign('pageId').references('id').inTable('pages').onDelete('CASCADE').onUpdate('CASCADE');

    }).then(() => console.log("table created"))
        .catch((err) => { console.log(err); throw err })
        .finally(() => {
            knex.destroy();
        });
    knex.schema.table('tag_page', function (table) {
        table.integer('tagId').unsigned()
        table.foreign('tagId').references('id').inTable('tags').onDelete('CASCADE').onUpdate('CASCADE');
        }).then(() => console.log("table created"))
        .catch((err) => { console.log(err); throw err })
        .finally(() => {
            knex.destroy();
        });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('tage_page')
};
