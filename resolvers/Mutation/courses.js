const db = require('../../db/config/db')

module.exports = {
    async saveCourse(_, { title, description }, ctx) {
        ctx && ctx.authAdmin()
        await db('courses').insert({ title, description, status: 'INACTIVE', created_at: new Date() })
        const course = await db('courses').where('title', title).orderBy('created_at', 'desc').first()
        return course
    },
    async updateCourse(_, { id, title, description, status }, ctx) {
        ctx && ctx.authAdmin()
        let course = await db('courses').where('id', id).first()
        if(!course) {
            throw new Error('Curso não encontrado')
        } else {
            await db('courses').update({ title, description, status, updated_at: new Date() }).where('id', id)
        }
        course = { ...course, title, description, status }
        return course
    },
    async saveCourseModule(_, { course_id, title, description }, ctx) {
        ctx && ctx.authAdmin()
        let course = await db('courses').where('id', course_id).first()
        if(!course) {
            throw new Error('Curso não encontrado')
        } else {
            await db('course_modules').insert({ course_id, title, description, created_at: new Date() })
            const module = await db('course_modules').where('course_id', course_id).orderBy('created_at', 'desc').first()
            return module
        }
    },
    async updateCourseModule(_, { id, title, description }, ctx) {
        ctx && ctx.authAdmin()
        let module = await db('course_modules').where('id', id).first()
        if(!module) {
            throw new Error('Módulo não encontrado')
        } else {
            await db('course_modules').update({ title, description, updated_at: new Date() }).where('id', id)
            module = { ...module, title, description }
            return module
        }
    },
    async saveQuestion(_, { module_id, title, description, question, right_answer, wrong_answer_one, wrong_answer_two, wrong_answer_three }, ctx) {
        ctx && ctx.authAdmin()
        let module = await db('course_modules').where('id', module_id).first()
        if(!module) {
            throw new Error('Módulo não encontrado')
        } else {
            await db('class_questions').insert({ module_id, title, description, question, right_answer, wrong_answer_one, wrong_answer_two, wrong_answer_three, created_at: new Date() })
            const class_questions = await db('class_questions').orderBy('created_at', 'desc').first()
            return class_questions
        }
    },
    async updateQuestion(_, { id, title, description, right_answer, wrong_answer_one, wrong_answer_two, wrong_answer_three }, ctx) {
        ctx && ctx.authAdmin()
        let class_questions = await db('class_questions').where('id', id).first()
        if(!class_questions) {
            throw new Error('Aula não encontrada')
        } else {
            await db('class_questions').update({ title, description, right_answer, wrong_answer_one, wrong_answer_two, wrong_answer_three, updated_at: new Date() }).where('id', id)
            class_questions = { ...class_questions, title, description, right_answer, wrong_answer_one, wrong_answer_two, wrong_answer_three }
            return class_questions
        }
    },
    async saveVideos(_, { module_id, title, description, url }, ctx) {

    },
    async updateVideos(_, { id, title, description, url }, ctx) {

    },
}