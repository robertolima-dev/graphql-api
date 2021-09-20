const db = require('../../db/config/db')
const bcrypt = require('bcrypt');
const { getUserToken } = require('../common/user');
const saltRounds = 10;

module.exports = {
    async saveUser(_, { name, email, password, language, roleIds }) {
        let user = await db('users').where('email', email).first()
        if(!user) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            await db('users').insert({ email, name, language, password: hash })
            user = await db('users').where('email', email).first()
            roleIds.length > 0 && roleIds.map(async role_id => {
                await db('user_roles').insert({ user_id: user.id, role_id })
            })
            return getUserToken(user)
        } else {
            await db('users').update({ name, email, language }).where('id', user.id)
            user = { ...user, name, email }
            return user
        }
    },
    async saveUserSocial(_, { name, email, language, roleIds }) {
        let user = await db('users').where('email', email).first()
        if(!user) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(process.env.APP_PASSWORD, salt);
            await db('users').insert({ email, name, language, password: hash })
            user = await db('users').where('email', email).first()
            roleIds.length > 0 && roleIds.map(async role_id => {
                await db('user_roles').insert({ user_id: user.id, role_id })
            })
            return getUserToken(user)
        } else {
            // await db('users').update({ name, email }).where('id', user.id)
            user = { ...user, name, email }
            return user
        }
    },
    async updateUser(_, { id, name, email, language }) {
        let user = await db('users').where('id', id).first()
        if(!user) {
            throw new Error('Usuário não encontrado')
        } else {
            await db('users')
            .update({ name, email, language, updated_at: new Date() })
            .where('id', id)
            user = {...user, name, email, language}
            return user
        }
    },
    async updatePasswordUser(_, { id, password }) {
        let user = db('users').where('id', id)
        if(!user) {
            throw new Error('Usuário não encontrado')
        } else {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            await db('users').update({ password: hash, updated_at: new Date() })
            return user
        }
    },
    async deleteUser(_, args) {
        let user = db('users').where('id', args.id)
        if(!user) {
            throw new Error('Usuário não encontrado')
        } else {
            await db('users').update({ deleted: true, status: 'INACTIVE', updated_at: new Date() })
            return user
        }
    },
}