const db = require('../../db/config/db')

module.exports = {
    async saveProfile(_, { userId, document, phone, position, area, photo, about }) {
        let user = await db('users').where('id', userId).first()
        if(!user) {
            throw new Error('Usuário não encontrado')
        } else {
            let profile = await db('profiles').where('user_id', userId).first()
            if(!profile) {
                await db('profiles').insert({ user_id: userId, document, phone, position, area, photo, about })
                profile = await db('profiles').where('user_id', userId).first()
                return profile
            } else {
                await db('profiles').update({ document, phone, position, area, photo, about }).where('user_id', userId)
                profile = { ...profile, document, phone, position, area, photo, about }
                return profile
            }
        }
    },
    async updateProfile(_, { id, userId, document, phone, position, area, photo, about }) {
        let profile = await db('profiles').where('id', id).where('user_id', userId).first()
        if(profile) {
            await db('profiles').update({ document, phone, position, area, photo, about }).where('id', id).where('user_id', userId)
            profile = { ...profile, document, phone, position, area, photo, about }
            return profile
        } else {
            throw new Error('É necessário cadastrar o perfil para editá-lo!')
        }
    }
}