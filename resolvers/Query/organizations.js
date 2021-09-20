const db = require('../../db/config/db')


module.exports = {
    async organizations() {
        return await db('organizations').where('deleted', false)
    },
    async organization(_, args) {
        return await db('organizations').where('id', args.id).first()
    }
}