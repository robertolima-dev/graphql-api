
exports.up = function(knex) {
    return knex.schema.createTable('user_organizations', table => {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
        table.uuid('user_id').notNull()
        table.uuid('organization_id').notNull()
        table.foreign('user_id').references('users.id')
        table.foreign('organization_id').references('organizations.id')
        table.boolean('deleted').defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_organizations')
};
