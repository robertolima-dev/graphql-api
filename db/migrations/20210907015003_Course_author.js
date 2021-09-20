
exports.up = function(knex) {
    return knex.schema.createTable('course_authors', table => {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
        table.uuid('course_id').notNull()
        table.foreign('course_id').references('courses.id')
        table.string('name').notNull()
        table.string('description').notNull()
        table.boolean('deleted').defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('course_authors')
};
