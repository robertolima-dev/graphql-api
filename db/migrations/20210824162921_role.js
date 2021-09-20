
exports.up = function(knex) {
    return knex.schema.createTable('roles', table => {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
        table.string('slug').notNull().unique()
        table.string('label').notNull()
        table.boolean('deleted').defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at')
    })
    .then(function() {
        return knex('roles').insert([
            { slug: 'user', label: 'Usuário' },
            { slug: 'manager', label: 'Gestor' },
            { slug: 'admin', label: 'Admin' },
            { slug: 'root', label: 'Root' },
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('roles')
};
