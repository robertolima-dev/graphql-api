
exports.up = function(knex) {
    return knex.schema.createTable('organizations', table => {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
        table.string('name').notNull()
        table.string('document_cnpj').notNull()
        table.string('document_inscricao_estadual')
        table.string('city').notNull()
        table.string('state').notNull()
        table.string('zip_code')
        table.text('logo', 'mediumtext')
        table.text('about', 'mediumtext')
        table.boolean('deleted').defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('organizations')
};
