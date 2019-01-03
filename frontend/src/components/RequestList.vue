<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="float: left"><strong>DANH SÁCH CÁC YÊU CẦU</strong></span>
      <el-button style="float: right; padding: 3px 0"
          type="text" icon="el-icon-refresh">Làm mới</el-button>
    </div>
    <router-link
        v-for="req in listInfo.requestList"
        :key="req.ID"
        class="list-group-item list-group-item-action"
        :class="{active: selected === req.ID}"
        :to="'/request/' + req.ID + '?refresh=' + refreshTime"
        v-on:click.native="requestClicked(req.ID)">
        <Request :requestModel="req"/>
    </router-link>

    <br>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="listInfo.perPage"
      @current-change="handleCurrentChange"
      :total="listInfo.totalItems">
    </el-pagination>

  </el-card>
</template>

<script>
import Request from '@/components/Request.vue'
import utils from '@/store/utils'
import axios from 'axios'
import moment from 'moment'

export default {
  components: {
    Request
  },
  data () {
    return {
      listInfo: {
        requestList: [],
        perPage: 4,
        totalItems: 0,
        currentPage: 1
      },
      refreshTime: 0,
      selected: -1
    }
  },
  methods: {
    requestClicked(id) {
      this.selected = id
    },
    handleCurrentChange(val) {
      this.listInfo.currentPage = val
      this.getRequestsPerPage()
    },
    getRequestsPerPage() {
      var requestPayload = {
        return_ts: 0,
        page: this.listInfo.currentPage,
        per_page: this.listInfo.perPage
      }
      this.$store.dispatch('getRequests', requestPayload).then(value => {
        this.listInfo.requestList = value.results
        this.listInfo.totalItems = value.totalPages * value.perPage
      }).catch(err => {
        if (err.response.status == 403) {
          localStorage.removeItem('user')
          this.$router.push('/login')
        }
      })
    },
    isBrowserSupportSocket() {
      return window.WebSocket || window.MozWebSocket
    },
    setupWebSocket() {
      var self = this
      window.WebSocket = window.WebSocket || window.MozWebSocket
      var clientSocket = new WebSocket('ws://localhost:40519');

      clientSocket.onopen = function () {
          clientSocket.send('hello server');
      }

      clientSocket.onmessage = function (e) {
        var value = JSON.parse(e.data)
        self.receivedRequestValue(value)
      }
    },
    receivedRequestValue(value) {
      var self = this
      if (self.listInfo.requestList == null) {
        return
      }
      console.log('receivedRequestValue', value)

      for (var item of value) {

        if (this.$route.params.reqId == item.ID) {
          this.refreshTime = moment().unix()
          console.log('refresh time', moment().unix())
          this.$router.replace({ name: 'map', params: { reqId: item.ID }, query: { refresh: self.refreshTime }})
        }
      }
      this.getRequestsPerPage()
    },
    setupLP() {
      var self = this
      var user_id = utils.getUserID()
      var headers = {
          'Content-Type': 'application/json',
          'x-access-token': utils.getAccessToken()
      }
      var ts = 0
      var fetchRefreshRequestAPI = function () {
        axios.get(`http://127.0.0.1:3010/requests/refresh?ts=${ts}`,
           { headers })
          .then(result => {
            if (result.status === 200) {
              ts = result.data.return_ts
              var items = result.data.results
              self.receivedRequestValue(items)
            }
          }).catch(err => {
            console.log(err)
            self.$message({ type: 'error', message: `Có lỗi xảy ra: ${err}` });
          }).then(() => {
            fetchRefreshRequestAPI()
          })
      }
      fetchRefreshRequestAPI()
    }
  },
  mounted() {
    //do something after mounting vue instance
    if (this.isBrowserSupportSocket()) {
      console.log('browser support websocket')
      this.setupWebSocket()
    } else {
      console.log("browser doesn't support websocket")
      this.setupLP()
    }

    this.getRequestsPerPage()
  }
}
</script>

<style lang="css">
</style>
