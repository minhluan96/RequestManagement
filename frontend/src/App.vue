<template>
  <div id="app">
    <NavBar/>
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-md-4">
          <RequestList />
        </div>
        <div class="col-md">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  import RequestList from './components/RequestList.vue'
  export default {
    components: {
      NavBar,
      RequestList
    }
  }
</script>
<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
