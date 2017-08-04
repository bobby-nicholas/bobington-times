<template>
  <div id="app">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <p class="title">
            The Bobington Times
          </p>
          <p class="subtitle" style="font-style:italic">
            The latest dispatches from Bob's World
          </p>
        </div>
      </div>
    </section>
    <div class="main">
        <div class="columns is-gapless">
          <div class="column is-2">
            <div class="card">
              <aside class="menu">
                <p class="menu-label">
                  Blog
                </p>
                <ul class="menu-list">
                  <li><router-link to="/News">News</router-link></li>
                  <li><router-link to="/Dev">Development</router-link></li>
                </ul>
                <p class="menu-label">
                  Music
                </p>
                <ul class="menu-list">
                  <li><a>Chemical Mortar Battalion</a></li>
                  <li><router-link to="/Recording">Recording</router-link></li>
                </ul>
              </aside>
            </div>
          </div>
          <div class="column">
            <router-view></router-view>
          </div>
      </div>
      
    </div>
    
    
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
  @import "../node_modules/bulma/sass/utilities/initial-variables"
  $body-background: $grey-dark
  $text: $white-ter
  $family-primary: $family-monospace
  @import "../node_modules/bulma/bulma" 
  .hero
    margin: 2px
    .title
      font-family: UnifrakturMaguntia
      font-size: 50px
      text-decoration: underline
  .card
    background-color: $grey-darker
    margin: 2px
  .menu-list
    a:hover
      background-color: $grey-dark
  .card-content
    .title
      color: $primary
    .field
      color: $white-ter
    .control
      input
        background-color: $grey-darker
        color: $white-ter
</style>
