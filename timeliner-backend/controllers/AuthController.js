let db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize')

const Users = db.users;
const Tasks = db.tasks;

let register = async (req, resp) => {
    let data = req.body

        const user = await Users.findOne({
            where: {
              email: data.email
            }
          });
        if(user) {
            resp.status(409).json({
                message: 'This email is already taken.'
            })
        } else {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const password =  await bcrypt.hash(data.password, salt);
    
            let user = await Users.create({
                name: data.name,
                email: data.email,
                password: password
            })
    
            const newUser = await Users.findOne({
                where: {
                email: data.email
                }
            });
    
            const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
            resp.status(200).json({
                user: user,
                token: token
            })
        }
}

let login = async (req, resp) => {
    let data = req.body

    const user = await Users.findOne({
        where: {
          email: data.email,
        },  
      });

    if(!user) {
        resp.status(500).json({
            message: 'This user is not registered.'
        })
    } else {
        checkPassword = await bcrypt.compare(data.password, user.password)
        if(checkPassword) {
            const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '86400s' });

            const tasks = await Tasks.findAll({ 
                where: {
                    userId: user.id
                },
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('date')), 'date'],
                ],
                order: [
                    ['date', 'DESC'],
                ],
            });

            resp.status(200).json({
                user: user,
                tasks: tasks,
                token: token
            })
        } else {
            resp.status(500).json({
                message: 'Wrong Credentials!'
            })
        }
    }
}

let user = async (req, resp) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const authUser = jwt.verify(token, process.env.TOKEN_SECRET);
    resp.status(200).json(authUser)
}

module.exports = {
    register,
    login,
    user
}