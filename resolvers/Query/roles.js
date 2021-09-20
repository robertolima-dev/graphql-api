const db = require('../../db/config/db')

module.exports = {
    async roles(_, args, ctx) {
        ctx && ctx.authAdmin()
        return await db('roles').where('deleted', false)
    },
    async role(_, args, ctx) {
        // ctx && ctx.authAdmin()
        return await db('roles')
        .where('slug', args.slug)
        .where('deleted', false)
        .first()
    }
}