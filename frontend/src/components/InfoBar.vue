<template>
  <div class="container" v-if="request != null">
    <el-card>
      <div class="row">
        <div class="col-md-12">
          <el-steps :active="1" align-center>
            <el-step  title="ĐÓN KHÁCH" :description="request.NameLocation"></el-step>
            <el-step title="TRẢ KHÁCH" :description="request.FinishLocationName"></el-step>
          </el-steps>
        </div>
      </div>
      <hr>
      <div class="row" style="text-align: center">
        <div class="col-md-6 mt-2">
          <span class="title-info"><strong>THÔNG TIN KHÁCH HÀNG</strong></span><br>
          <span>Tên khách hàng: {{request.GuestName}}</span><br>
          <span>Số điện thoại: {{request.GuestTelephone}}</span><br>
          <span>Ghi chú: {{request.Note}}</span>
        </div>
        <div class="col-md-6 mt-2" v-if="driverModel != null">
          <span class="title-info"><strong>THÔNG TIN TÀI XẾ</strong></span><br>
          <span>{{driverModel.Username}}</span><br>
        </div>
        <div class="col-md-6 mt-2" v-if="driverModel == null">
          <span class="title-info"><strong>THÔNG TIN TÀI XẾ</strong></span><br>
          <span>Không có thông tin tài xế cho yêu cầu này </span><br>
        </div>
      </div>
      <hr>
      <div class="row" style="text-align: center">
        <div class="col-md-12 mt-2">
          <span>Tình trạng: {{request.StatusName}}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['request'],
  data() {
    return {
      driverModel: null
    }
  },
  methods: {
    getDriverInfo(id) {
      var driverPayload = {
        ID: id
      }
      this.$store.dispatch('getDriverInfo', driverPayload).then(value => {
        this.driverModel = value
        console.log(value)
      }).catch(err => {
        console.log(err)
        this.$message({
            type: 'error',
            message: `Lỗi: không thể lấy thông tin tài xế`
          })
      })
    },
    getDriverUpdateTime() {
      return moment(this.driverModel.DriverUpdateTime).format('dddd, MMMM Do, YYYY h:mm:ss A')
    }
  },
  watch: {
    request(newValue, oldValue) {
      this.driverModel = null
      if (newValue != null && newValue.Driver != null) {
        this.getDriverInfo(newValue.Driver)
      }
    }
  }
}
</script>

<style lang="css">

  .title-info {
    color: red
  }
</style>
