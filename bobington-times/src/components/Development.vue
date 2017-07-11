<template>
  <div id="development">
      <div class="card">
        <div class="card-content">
            <h1 class="title">New Post</h1>
            <div class="field">
                <label class="label">Title</label>
                <p class="control">
                    <input class="input" type="text" v-model="post.title">
                </p>
            </div>
            <quill-editor v-model="post.content"
                ref="myQuillEditor"
                :options="editorOption">
            </quill-editor>
            <hr>
            <button class="button is-primary" @click="savePost()">Save</button>
            <button class="button is-primary" @click="outputPost()">Test</button>
        </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Development',
  data () {
    return {
      post: {},
      postCount: 0,
      database: {},
      editorOption: {
        theme: 'snow'
      }
    }
  },
  created: function () {
    let self = this
    this.database = firebase.database()
    return firebase.database().ref('/postCount/').once('value').then(function (posts) {
      self.postCount = posts.val().count
    // ...
    })
    // this.post = { title: '', content: '' }
  },
  methods: {
    outputPost: () => {
      console.log(this.post)
    },
    savePost: function () {
      console.log(this.post)
      firebase.database().ref('posts/' + this.postCount++).set({
        title: this.post.title,
        content: this.post.content,
        date: Date.now()
      })
      firebase.database().ref('postCount/').set({
        count: this.postCount
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
