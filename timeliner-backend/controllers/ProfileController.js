let db = require('../models');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize')

const Users = db.users;
const Tasks = db.tasks;

let profile = async (req, resp) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const authUser = jwt.verify(token, process.env.TOKEN_SECRET);

    const tasks = await Tasks.findAndCountAll({
        where: {
            userId: authUser.user.id,
            date: new Date().toISOString().slice(0,10)
        },
        order: [
            ['time', 'ASC'],
        ],
    })

    resp.status(200).json({
        tasks: tasks
    })
}

module.exports = {
    profile
}