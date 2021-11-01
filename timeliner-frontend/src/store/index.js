import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    tasks: [],
    starredTasks: [],
  },
  mutations: {
    user (state, payload) {
      state.user = payload
    },
    tasks (state, payload) {
      state.tasks = []
      state.tasks = payload
    },
    starredTasks (state, payload) {
      state.starredTasks = []
      state.starredTasks = payload
    },
  },
  actions: {
    getTasks({ commit }) {
      axios.get(process.env.VUE_APP_APIURL + '/tasks/get')
          .then(response => {
            commit('tasks', response.data.tasks)
      })
    },
    getStarredTasks({ commit }) {
      axios.get(process.env.VUE_APP_APIURL + '/tasks/starred/get')
          .then(response => {
            commit('starredTasks', response.data.tasks)
      })
    }
  },
  modules: {
  }
})
