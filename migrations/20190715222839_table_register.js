exports.up = async function(knex, Promise) {
    await knex.schema.hasTable("register");

    return await knex.schema.createTable("register", table => {
      table.increments("id").primary(),
        table.string("name"),
        table.string("phone"),
        table.string("address"),
        table.string("email"),
        table.string("password");
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable("register");
  
};
