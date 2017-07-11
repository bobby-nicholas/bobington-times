<template>
  <div id="news">
      <div class="card" v-for="post in posts">
        <div class="card-content">
            <h1 class="title">{{post.title}}<span class="is-pulled-right">{{post.date.toDateString()}}</span></h1>
            {{post.content}}
        </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
