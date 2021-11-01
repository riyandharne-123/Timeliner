import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import List from '../views/Tasks/List.vue'
import Create from '../views/Tasks/Create.vue'
import Edit from '../views/Tasks/Edit.vue'
import TimeLineList from '../views/Tasks/TimeLineList.vue'
import TasksList from '../views/Tasks/TasksList.vue'
import Task from '../views/Tasks/Task.vue'
import Starred from '../views/Tasks/Starred.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: (to,from,next) => {
      axios.get(process.env.VUE_APP_APIURL + '/user/verify')
      .then(res => {
        if(res.data.user)
        {
          next()
        }
      })
      .catch(err => 
        next('/'))
      }
  },
  {
    path: '/tasks/starred',
    name: 'Starred',
    component: Starred,
    beforeEnter: (to,from,next) => {
      axios.get(process.env.VUE_APP_APIURL + '/user/verify')
      .then(res => {
        if(res.data.user)
        {
          next()
        }
      })
      .catch(err => 
        next('/'))
      }
  },
  {
    path:'/dashboard',
    component: Dashboard,
    name:'Dashboard',
    children: [
      {
        path: 'tasks',
        component: List,
      },
      {
        path: 'tasks/all',
        component: TasksList,
      },
      {
        path: 'tasks/create',
        component: Create,
      },
      {
        path: 'tasks/:date/timeline',
        component: TimeLineList,
      },
      {
        path: 'tasks/:id',
        component: Task,
      },
      {
        path: 'tasks/edit/:id',
        component: Edit,
      },
    ],
    beforeEnter: (to,from,next) => {
      axios.get(process.env.VUE_APP_APIURL + '/user/verify')
      .then(res => {
        if(res.data.user)
        {
          next()
        }
      })
      .catch(err => 
        next('/'))
      }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
