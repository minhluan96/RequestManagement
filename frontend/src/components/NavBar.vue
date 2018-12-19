<template>
  <b-navbar toggleable="md" type="light" variant="light">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#" center>Request Management</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="!isShowUserOnNav()">

        <b-nav-item href="#">{{username}}</b-nav-item>
        <b-nav-item href="#" @click="logout()">Đăng xuất</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user')
      this.username = ''
      this.$router.push('/login')
    },
    isShowUserOnNav() {
      return this.username === ''
    },
    getUserInfo() {
      var currentUser = JSON.parse(localStorage.getItem('user'))
      if (currentUser == null) return
      var payload = { ID: currentUser.user.id }
      this.$store.dispatch('getUserInfo', payload).then(value => {
        this.username = value.Username
      }).catch(err => {
        this.$message({ type: 'error', message: `Có lỗi xảy ra: ${err}` });
      })
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.getUserInfo()
  },
  watch: {
    $route(to, from) {
      this.getUserInfo()
    }
  }
}
</script>

<style lang="css">
</style>
