let db = require('../models');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize')
const { pagination } = require('../helpers/pagination');

const Tasks = db.tasks;

let get = async (req, resp) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const authUser = jwt.verify(token, process.env.TOKEN_SECRET);

    const tasks = await Tasks.findAll({ 
        where: {
            userId: authUser.user.id
        },
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('date')), 'date'],
        ],
        order: [
            ['date', 'DESC'],
        ],
    });

    resp.status(200).json({
        tasks: tasks
    })

}

let filter = async (req, resp) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const authUser = jwt.verify(token, process.env.TOKEN_SECRET);

    const tasks = await Tasks.findAll({ 
        where: {
            userId: authUser.user.id,
            date: req.query.date
        },
        order: [
            ['time', 'ASC'],
        ],
    });

    resp.status(200).json({
        tasks: tasks
    })

}

let all = async (req, resp) => {
 
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const authUser = jwt.verify(token, process.env.TOKEN_SECRET);

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const per_page = req.query.per_page ? parseInt(req.query.per_page) : 1;

    const { count, rows } = await Tasks.findAndCountAll({ 
        limit: per_page,
        offset: (page - 1) * page,
        where: {
            userId: authUser.user.id,
        },
        order: [
            ['date', 'DESC'],
        ],
    });

    const result = pagination({
        data: rows,
        count,
        page,
        per_page
    });

    resp.status(200).json(result)

}

let show = async (req, resp) => {
 
    const task = await Tasks.findByPk(req.params.id);

    resp.status(200).json({
        task: task
    })

}

let store = async (req, resp) => {
    let data = req.body

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const authUser = jwt.verify(token, process.env.TOKEN_SECRET);

    const task = await Tasks.create({
        userId: authUser.user.id,
        name: data.name,
        description: data.description,
        date: data.date,
        time: data.time
    })
    
    resp.status(200).json({
        task: task
    })

}

let update = async (req, resp) => {
    let data = req.body

    const task = await Tasks.findByPk(req.params.id);

    await task.update({
        name: data.name,
        description: data.description,
        date: data.date,
        time: data.time
    });

    resp.status(200).json({
        message: 'success'
    })

}

let destroy = async (req, resp) => {
 
    const task = await Tasks.findByPk(req.params.id);
    await task.destroy();

    resp.status(200).json({
        message: 'success'
    })

}

let starred = async (req, resp) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const authUser = jwt.verify(token, process.env.TOKEN_SECRET);

    const tasks = await Tasks.findAll({ 
        where: {
            userId: authUser.user.id,
            starred: true
        },
        order: [
            ['date', 'DESC'], ['time', 'ASC'],
        ],
    });

    resp.status(200).json({
        tasks: tasks
    })

}

let star = async (req, resp) => {
    const task = await Tasks.findByPk(req.params.id);

    const updatedTask = await task.update({
        starred: true
    });

    resp.status(200).json({
        message: 'success'
    })

}

let unstar = async (req, resp) => {
    const task = await Tasks.findByPk(req.params.id);

    const updatedTask = await task.update({
        starred: false
    });

    resp.status(200).json({
        message: 'success'
    })

}

module.exports = {
    get,
    show,
    all,
    filter,
    store,
    update,
    destroy,
    starred,
    star,
    unstar
}