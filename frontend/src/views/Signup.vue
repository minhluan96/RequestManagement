<template>
  <div class="container-fluid">
    <div class="row card-contain">
      <div class="col-md-9">
      </div>
      <div class="col-md-3">
        <el-card class="box-card signup-card">
          <div slot="header" class="clearfix">
            <h2>ĐĂNG KÝ</h2>
          </div>
          <el-input style="margin-top: 10px"
          placeholder="Tên tài khoản"
          v-model="IPName">
          <i slot="prefix" class="el-input__icon glyphicon glyphicon-user"></i>
        </el-input>

        <el-input style="margin-top: 20px"
        placeholder="Mật khẩu"
        type="password"
        v-model="IPPass">
        <i slot="prefix" class="el-input__icon glyphicon glyphicon-lock"></i>
      </el-input>

      <el-input style="margin-top: 20px"
      placeholder="Nhập lại mật khẩu"
      type="password"
      v-model="IPCheckPass">
      <i slot="prefix" class="el-input__icon glyphicon glyphicon-repeat"></i>
    </el-input>

    <div style="margin-top: 20px">
      <el-button @click="huyDangKy" >Hủy bỏ</el-button>
      <el-button type="primary" @click="DangKy" >Đăng ký</el-button>
    </div>
  </el-card>
</div>

</div>
</div>
</template>

<script>
  export default {
    name: 'Signup',
    data() {
      return {
        IPName: '',
        IPPass: '',
        IPCheckPass: ''
      }
    },

    methods: {
      huyDangKy() {
        this.$router.push('/login')
      },
      DangKy() {
        var roleLocationIdenfifier = 3
        var userPayload = {
          Username: this.IPName,
          Password: this.IPPass,
          Role: roleLocationIdenfifier
        }        
        if(this.IPPass === this.IPCheckPass)
        {
         this.$store.dispatch('signupUseRequest', userPayload).then(value => {     
          this.$message({ type: 'success', message: `Đăng ký thành công` });
          this.$router.push('/login')
        }).catch(err => {
          this.$message({ type: 'error', message: `Đăng ký thất bại.Người dùng đã tồn tại: ${err}` });
        })       
      }
      else{
        this.$message({ type: 'error', message: `Đăng ký thất bại. Mất khẩu Nhập Lại Không Đúng !` });
      }

    }
  }
}
</script>