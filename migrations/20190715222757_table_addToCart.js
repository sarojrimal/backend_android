exports.up = async function(knex, Promise) {
    await knex.schema.hasTable("add_to_cart");

    return await knex.schema.createTable("add_to_cart", table => {
      table.increments("id").primary(),
        table.string("title"),
        table.string("price"),
        table.string("image"),
        table.string("email"),
        table.string("remarks")

    });
    
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable("add_to_cart");

};
