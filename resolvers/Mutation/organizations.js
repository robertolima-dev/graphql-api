const db = require('../../db/config/db')

module.exports = {
    async saveOrganization(_, { name, document_cnpj, document_inscricao_estadual, city, state, zip_code, logo, about, userIds }) {
        let organization = await db('organizations').where('document_cnpj', document_cnpj).first()
        if(!organization) {
            await db('organizations').insert({ name, document_cnpj, document_inscricao_estadual, city, state, zip_code, logo, about })
            organization = await db('organizations').where('document_cnpj', document_cnpj).first()
            return organization
        } else {
            throw new Error('Empresa já cadastrada!')
        }
    },
    async updateOrganization(_, { id, name, document_cnpj, document_inscricao_estadual, city, state, zip_code, logo, about, userIds }) {
        
    }
}