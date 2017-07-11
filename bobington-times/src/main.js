// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueQuillEditor from 'vue-quill-editor'
import router from './router'
import firebase from 'firebase'
import 'bulma/css/bulma.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
var config = {
  apiKey: 'AIzaSyD3pmbLrcjJO-QpJTFpWDvt8j44eoFZ_rY',
  authDomain: 'bobs-world.firebaseapp.com',
  databaseURL: 'https://bobs-world.firebaseio.com',
  projectId: 'bobs-world',
  storageBucket: 'bobs-world.appspot.com',
  messagingSenderId: '430438815321'
}
firebase.initializeApp(config)
Vue.use(VueQuillEditor)
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
