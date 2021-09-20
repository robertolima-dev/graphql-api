const db = require('../../db/config/db')
const bcrypt = require('bcrypt')
const { getUserToken } = require('../common/user')

module.exports = {
    async login(_, { data }) {
        const user = await db('users').where('email', data.email).first()
        if(!user) {
            throw new Error('E-mail/senha inválidos')
        } else {
            const match = await bcrypt.compare(data.password, user.password);
            if(match) {
                return getUserToken(user)
            } else {
                throw new Error('E-mail/senha inválidos')
            }
        }
    },
    async users(_, args, ctx) {
        ctx && (ctx.authAdmin())
        return await db('users')
    },
    async user(_, args, ctx) {
        // ctx && ctx.user.id === args.id || ctx.authAdmin()
        const user = await db('users')
        .where('id', args.id)
        .first()
        return getUserToken(user)
    }
}