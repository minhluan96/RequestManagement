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
        :to="'/request/' + req.ID"
        v-on:click.native="requestClicked(req.ID)">
        <Request :id="req.ID"/>
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
      })
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.getRequestsPerPage()
  }
}
</script>

<style lang="css">
</style>
