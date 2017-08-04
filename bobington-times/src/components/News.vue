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
      posts: []
    }
  },
  created: function () {
    let self = this
    firebase.database().ref('posts').once('value').then(posts => {
      console.log(posts.val())
      self.posts = posts.val()
      self.posts.sort((a, b) => b.date - a.date)
    })
  },
  methods: {
    postDate (date) {
      let m = moment(date)
      return m.format('dddd, MMMM Do YYYY')
    },
    sortNews (posts) {
      return true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">

</style>
