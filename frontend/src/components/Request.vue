<template>
  <div class="req-item">
    <div class="row">
      <div class="col-md-12" style="text-align: left">
        <span>Mã yêu cầu:</span><br/>
        <span>Tên khách hàng:</span><br/>
        <span>Nơi nhận khách:</span><br/>
        <span>Nơi trả khách:</span>
      </div>
    </div>
    <div class="row" style="text-align: left">
      <div class="col-sm-12">
          <p>Tình trạng:</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      request: null
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
        console.log(value)
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
