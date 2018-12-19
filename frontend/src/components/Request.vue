<template>
  <div class="req-item">
    <div class="row">
      <div class="col-md-12" style="text-align: left">
        <span><strong>Mã yêu cầu: </strong>{{requestModel.ID}}</span><br/>
        <span><strong>Tên khách hàng: </strong>{{requestModel.GuestName}} </span><br/>
        <span><strong>Nơi nhận khách: </strong>{{requestModel.NameLocation}}</span><br/>
        <span><strong>Nơi trả khách: </strong>{{requestModel.FinishLocationName}}</span>
      </div>
    </div>
    <div class="row" style="text-align: left">
      <div class="col-sm-12">
          <p><strong>Tình trạng: </strong>{{requestModel.StatusName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['requestModel'],
  data() {
    return {
      request: {}
    }
  },
  watch: {
    requestModel(newValue, oldValue) {
      console.log('new rquest update', newValue)
    }
  }
}
</script>

<style lang="css">
 .req-item {
   font-size: 14px;
 }
</style>
