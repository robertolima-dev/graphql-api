const db = require('../db/config/db')

module.exports = {
    async questions(module) {
        const questions = await db('class_questions').where('module_id', module.id)
        return questions
    },
    async videos(module) {
        const videos = await db('class_videos').where('module_id', module.id)
        return videos
    }
}
