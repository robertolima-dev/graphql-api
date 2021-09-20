const users = require('./users')
const roles = require('./roles')
const organizations = require('./organizations')
const courses = require('./courses')

module.exports = {
    ...users,
    ...roles,
    ...organizations,
    ...courses
}