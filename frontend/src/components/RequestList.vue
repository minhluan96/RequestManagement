<template>
  <el-card class="box-card" style="overflow-y: scroll; overflow-x: hidden">
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
        :to="'/map/' + req.ID"
        v-on:click.native="requestClicked(req.ID)">
        <Request :id="req.ID"/>
    </router-link>

    <br>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="listInfo.perPage"
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
        perPage: 0,
        totalItems: 0
      },
      selected: -1
    }
  },
  methods: {
    requestClicked(id) {
      this.selected = id
    }
  },
  mounted() {
    //do something after mounting vue instance
    var requestPayload = {
      return_ts: 0,
      page: 1,
      per_page: 4
    }
    this.$store.dispatch('getRequests', requestPayload).then(value => {
      this.listInfo.requestList = value.results
      this.listInfo.perPage = value.perPage
      this.listInfo.totalItems = value.totalPages * value.perPage
    })
  }
}
</script>

<style lang="css">
</style>
