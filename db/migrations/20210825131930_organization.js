
exports.up = function(knex) {
    return knex.schema.createTable('profiles', table => {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
        table.uuid('user_id').notNull()
        table.foreign('user_id').references('users.id')
        table.string('document').notNull()
        table.string('phone').notNull()
        table.string('position').notNull()
        table.string('area').notNull()
        table.text('photo', 'mediumtext')
        table.text('about', 'mediumtext')
        table.enu('status', ['ACTIVE', 'INACTIVE', 'BLOCKED']).defaultTo('ACTIVE')
        table.boolean('deleted').defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('profiles')
};
