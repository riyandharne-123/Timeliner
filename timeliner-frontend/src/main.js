import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import firebase from 'firebase/compat/app';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const jwtToken = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers.common['authorization'] = jwtToken;

Vue.prototype.$axios = axios;
Vue.prototype.$api = process.env.VUE_APP_APIURL;

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyD8zWNkDA3Yg2YawhxaT0giQ7YgteE1NIs",
  authDomain: "timeliner-39f93.firebaseapp.com",
  projectId: "timeliner-39f93",
  storageBucket: "timeliner-39f93.appspot.com",
  messagingSenderId: "719983051082",
  appId: "1:719983051082:web:248cd390ddbf42939741b3",
  measurementId: "G-M861E5WNLB"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
