const db = require('../db/config/db')

module.exports = {
    async modules(course) {
        const modules = await db('course_modules').where('course_id', course.id)
        return modules
    },
    async authors(course) {
        const authors = await db('course_authors').where('course_id', course.id)
        return authors
    }
}
