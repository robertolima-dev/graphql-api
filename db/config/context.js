const jwt = require('jwt-simple')

module.exports = ({ req }) => {
    const auth = req.headers.authorization
    const token = auth && auth.substring(7)

    let user = null
    let admin = false
    let manager = false
    const secret = process.env.APP_SECRET
    try {
        let tokenContent = jwt.decode(token, secret)
        if(new Date(tokenContent.exp * 1000) > new Date()) {
            user = tokenContent
        }
    } catch(err) {

    }

    if(user) {
        admin = user.roles.includes('admin')
        manager = user.roles.includes('manager')
    }

    const error = new Error('Acesso negado!')

    return {
        user,
        admin,
        authUser() {
            if(!user) throw error
        },
        authAdmin() {
            if(!admin) throw error
        },
        authManager() {
            if(!manager) throw error
        }
    }
}