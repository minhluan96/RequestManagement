<template>
  <div id="app">
    <NavBar/>
    <div class="container-fluid mt-2">
      <div class="row">
        <div class="col-md-3" v-if="!isLoginView()">
          <RequestList />
        </div>
        <div class="col-md" style="padding: 0px">
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
    },
    methods: {
      isLoginView() {
        // return this.$route.name === 'login'
        return ['login', 'signup'].includes(this.$route.name) 
      }
    },
    mounted() {
      //do something after mounting vue instance

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
