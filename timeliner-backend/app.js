const express = require('express')
const cors = require('cors')

require('./models')
let jwtMiddleware = require('./middleware/jwt')
let authController = require('./controllers/AuthController')
let taskController = require('./controllers/TaskController')
let profileController = require('./controllers/ProfileController')
const userRequest = require('./requests/userRequest')
const taskRequest = require('./requests/taskRequest')

const app = express();
app.use(cors())
const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.set('port', port);

//auth routes
app.post('/register', userRequest.register, authController.register);
app.post('/login', userRequest.login, authController.login);

//middleware protection
app.use(jwtMiddleware.authenticateToken);

//user routes
app.get('/user/verify', authController.user);

//task routes
app.get('/tasks/get', taskController.get);
app.get('/tasks/get/all', taskController.all);
app.get('/tasks/get/:id', taskController.show);
app.get('/tasks/filter', taskController.filter);
app.post('/tasks/store', taskRequest.task, taskController.store);
app.put('/tasks/update/:id', taskRequest.task, taskController.update);
app.delete('/tasks/delete/:id', taskController.destroy);
app.get('/tasks/starred/get', taskController.starred);
app.put('/tasks/star/:id', taskController.star);
app.put('/tasks/unstar/:id', taskController.unstar);

//profile routes
app.get('/user/profile', profileController.profile);

app.listen(app.get('port'), () => {
    console.log(`app started at http://localhost:${port}`)
})