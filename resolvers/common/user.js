const jwt = require('jwt-simple')
const { role: getRole } = require('../User')

module.exports = {
    async getUserToken(user) {
        const roles = await getRole(user)
        const now = Math.floor(Date.now() / 1000)

        const userInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status,
            language: user.language,
            roles: roles.map(r => r.slug),
            iat: now,
            exp: now + (7 * 24 * 60 * 60)
        }

        const secret = process.env.APP_SECRET
        return {
            ...userInfo,
            token: jwt.encode(userInfo, secret)
        }
    }
}