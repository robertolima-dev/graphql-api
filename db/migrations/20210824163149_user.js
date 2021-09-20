
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
        table.string('name').notNull()
        table.string('email').notNull()
        table.string('password', 60).notNull()
        table.enu('language', ['pt', 'en', 'es']).defaultTo('pt')
        table.enu('status', ['ACTIVE', 'INACTIVE', 'BLOCKED']).defaultTo('ACTIVE')
        table.boolean('deleted').defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
