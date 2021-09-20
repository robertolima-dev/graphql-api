const users = require('./users')
const profiles = require('./profiles')
const organizations = require('./organizations')
const courses = require('./courses')

module.exports = {
    ...users,
    ...profiles,
    ...organizations,
    ...courses
}