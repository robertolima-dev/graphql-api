
exports.up = function(knex) {
    return knex.schema.createTable('courses', table => {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
        table.string('title').notNull()
        table.string('description').notNull()
        table.enu('status', ['ACTIVE', 'INACTIVE', 'DELETED']).defaultTo('ACTIVE')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('courses')
};
