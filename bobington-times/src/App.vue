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
        <div class="columns">
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
                  <li><a>Recording</a></li>
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

<style lang="scss">

  #app {
    .hero {
      font-family: UnifrakturMaguntia;
      .title {
        font-size: 50px;
      }
    }
    
    .menu {
      :hover {
        background-color: inherit
      }
    }
  }
</style>
