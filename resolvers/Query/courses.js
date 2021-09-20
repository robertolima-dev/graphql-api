const db = require('../../db/config/db')

module.exports = {
    async courses(_, args, ctx) {
        ctx && (ctx.authAdmin())
        return await db('courses')
    },
    async course(_, { id }, ctx) {
        // ctx && ctx.user.id === args.id || ctx.authAdmin()
        const course = await db('courses')
        .where('id', id)
        .first()
        if(!course) {
            throw new Error('Curso não encontrado')
        } else {
            return course
        }
    }
}