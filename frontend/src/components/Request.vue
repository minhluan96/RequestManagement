<template>
  <div class="req-item">
    <div class="row">
      <div class="col-md-12" style="text-align: left">
        <span><strong>Mã yêu cầu: </strong>{{request.ID}}</span><br/>
        <span><strong>Tên khách hàng: </strong>{{request.GuestName}} </span><br/>
        <span><strong>Nơi nhận khách: </strong>{{request.NameLocation}}</span><br/>
        <span><strong>Nơi trả khách: </strong>{{request.FinishLocationName}}</span>
      </div>
    </div>
    <div class="row" style="text-align: left">
      <div class="col-sm-12">
          <p><strong>Tình trạng: </strong>{{request.StatusName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      request: {}
    }
  },
  methods: {
    getRequestData(requestID) {
      if (requestID == null) return
      var requestPayload = {
        ID: requestID
      }

      this.$store.dispatch('getRequestDetail', requestPayload).then(value => {
        this.request = value
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.getRequestData(this.id)
  }
}
</script>

<style lang="css">
 .req-item {
   font-size: 14px;
 }
</style>
