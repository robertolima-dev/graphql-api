
exports.up = function(knex) {
    return knex.schema.createTable('enrollments', table => {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
        table.uuid('user_id').notNull()
        table.uuid('course_id').notNull()
        table.foreign('user_id').references('users.id')
        table.foreign('course_id').references('courses.id')
        table.enu('status', ['ACTIVE', 'INACTIVE', 'DELETED']).defaultTo('ACTIVE')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('enrollments')
};
