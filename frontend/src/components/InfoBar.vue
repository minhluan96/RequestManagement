<template>
  <div class="container">
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
        <div class="col-md-6 mt-2">
          <span class="title-info"><strong>THÔNG TIN TÀI XẾ</strong></span><br>
          <span>request.start.name</span><br>
          <span>request.start.address</span>
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
export default {
  props: ['request']
}
</script>

<style lang="css">

  .title-info {
    color: red
  }
</style>
