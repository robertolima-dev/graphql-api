const db = require('../db/config/db')

module.exports = {
    async users(organization) {
        const users = db('user_organizations')
        .select('users.*')
        .join('users', 'user_organizations.user_id', 'users.id')
        .where('user_organizations.organization_id', organization.id)
        return users
    }
}