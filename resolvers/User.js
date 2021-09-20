const db = require('../db/config/db')

module.exports = {
    async role(user) {
        const roles = await db('roles').where('deleted', false)
        const user_roles = await db('user_roles').where('user_id', user.id)
        const myRolesIds = user_roles.filter(r => r.user_id === user.id)
        let myRoles = []
        roles.map(role => {
            const data = myRolesIds.map(role_user => role_user.role_id === role.id ? role : null).filter(x => x)[0]
            if(data) myRoles.push(data)
        })
        return myRoles
    },
    async profile(user) {
        const profile = await db('profiles').where('user_id', user.id).first()
        return profile
    },
    async courses(user) {
        const courses = await db('enrollments')
        .join('courses', 'enrollments.course_id', 'courses.id')
        .where('enrollments.user_id', user.id)
        return courses
    },
    async organization(user) {
        const organization = db('user_organizations')
        .select('organizations.*')
        .join('organizations', 'user_organizations.organization_id', 'organizations.id')
        .where('user_organizations.user_id', user.id)
        return organization
    },
    async menu(user) {
        const myRoles = await this.role(user)
        let roles = []
        myRoles.map(r => roles.push(r.slug))
        let menu
        let adminMenu
        let allUsersMenu
        let userMenu
        let managerMenu
        if(roles.includes('admin')) {
            adminMenu = [
                { id: 1, url: '/admin/produtos', text: 'Produtos', icon: 'produtos' },
                { id: 2, url: '/admin/organizacoes', text: 'Organizações', icon: 'organizacoes' },
                { id: 3, url: '/admin/alunos', text: 'Alunos', icon: 'alunos' },
            ]
            menu = adminMenu
        } else {
            if(roles.includes('user') || roles.includes('manager')) {
                allUsersMenu = [
                    { id: 1, url: '/frst', text: 'FRST', icon: 'home' },
                    { id: 2, url: '/produtos', text: 'Produtos', icon: 'produtos' },
                    { id: 3, url: '/calendario', text: 'Calendário', icon: 'calendario' },
                ]
            }
            if(roles.includes('user')) {
                userMenu = [
                    { id: 4, url: '/assessment', text: 'Assessment', icon: 'ajustes' },
                    { id: 5, url: '/jornada', text: 'Jornada', icon: 'jornada' }
                ]
            }
            if(roles.includes('manager')) {
                managerMenu = [
                    { id: 6, url: '/alunos', text: 'Alunos', icon: 'alunos' },
                    { id: 7, url: '/relatorio', text: 'Relatório', icon: 'relatorio' },
                ]
            }
            menu = allUsersMenu.concat(userMenu)
            menu = menu.concat(managerMenu)
        }
        
        return menu.filter(x => x)
    }
}
