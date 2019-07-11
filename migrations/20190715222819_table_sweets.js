exports.up = async function(knex, Promise) {
    await knex.schema.hasTable("sweets_add");

    return await knex.schema.createTable("sweets_add", table => {
      table.increments("id").primary(),
        table.string("title"),
        table.string("price"),
        table.string("image"),
        table.string("description")
    });
    
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable("sweets_add");

};

