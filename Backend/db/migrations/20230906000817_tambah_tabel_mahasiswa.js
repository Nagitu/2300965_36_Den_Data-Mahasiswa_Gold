/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('mahasiswa', table =>{
        table.uuid('id').primary()
        // table.string('nim').notNullable()
        table.string('full_name').notNullable()
        table.string('alamat').notNullable()
        table.uuid('id_jurusan').references('id').inTable('jurusan').onDelete('CASCADE')
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('mahasiswa')
};
