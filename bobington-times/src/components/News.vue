<template>
  <div id="news">
      <div class="card" v-for="post in posts">
        <div class="card-content">
            <span class="is-pulled-right">{{postDate(post.date)}}</span>
            <h1 class="title">{{post.title}}</h1>
            <div v-html="post.content">{{post.content}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
export default {
  name: 'News',
  data () {
    return {
      posts: {}
    }
  },
  created: function () {
    let self = this
    self.posts = firebase.database().ref('/posts/').once('value').then(function (posts) {
      self.posts = posts.val()
      console.log(self.posts)
    })
  },
  methods: {
    postDate (date) {
      let m = moment(date)
      return m.format('dddd, MMMM Do YYYY')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">

</style>
