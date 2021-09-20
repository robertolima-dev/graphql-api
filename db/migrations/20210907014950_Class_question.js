
exports.up = function(knex) {
    return knex.schema.createTable('class_questions', table => {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
        table.uuid('module_id').notNull()
        table.foreign('module_id').references('course_modules.id')
        table.string('title').notNull()
        table.string('description').notNull()
        table.string('question').notNull()
        table.string('right_answer').notNull()
        table.string('wrong_answer_one').notNull()
        table.string('wrong_answer_two').notNull()
        table.string('wrong_answer_three').notNull()
        table.boolean('deleted').defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('course_questions')
};
