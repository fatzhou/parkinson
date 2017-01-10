<template>
  <div id="login">
    <h1>登陆</h1>
    <div class="content">
      <div class="content-wrap">
        <img class="logo-img" src="../../static/image/sign_icon.png" alt="">
        <ul>
          <li v-for="item in items">
            <img :src="item.logo" alt="">
            <label :for="item.name">
              <input :id="item.name" :name="item.name" v-model.trim="item.status" :placeholder="item.placeholder">
            </label>
          </li>
          <li>
        </ul>

      </div>
    </div>
    <div class="button" @click="queryPatient" >确定</div>
  </div>
</template>

<script>
  import util from '../../static/js/util.js'
  import loginConfig from '../../static/js/config/Admin.js'
    export default {
        data() {
            return {
              url: util.api.host + util.api.Login.url,
              items: loginConfig,
              key: 'Admin',
            }
        },
        created() {
          util.storeData.get(this.key, this.items);
        },
        methods :{
            queryPatient () {
                var flag = util.checkForm(this.items);
                if(flag) {
                  var data = {
                    name: this.items[0].status,
                    mobile: this.items[1].status
                  };

                  util.storeData.set(this.key, this.items);
                  // util.storeData.set('info', this, 'info');

                  this.$router.push("PatientAdmin");
                  // this.$http.post(this.url, data)
                  // .then((response) => {
                  //   var data = response.body;
                  //   if(data.code === 0) {
                  //     this.info.doctorMobile = this.items[1].status;
                  //     util.storeData.set('Login', this.items);
                  //     util.storeData.set('info', this, 'info');
                  //     $router.push("PatientInfo");
                  //   } else {
                  //     console.log(data.message)
                  //     alert(data.message);
                  //   }
                  // })
                  // .catch(function(e) {
                  //   console.log(e)
                  //   alert('查询医生信息失败，请稍后再试');
                  // });
                }
            }
        }
    }
</script>

<style scoped>
  #login {
    height: 100%;
    background: #f3f3f3;
  }
  h1 {
    font-size: .54rem;
    text-align: center;
    line-height: 1;
    padding: .42rem 0;
    color: #3c485a;
    background: #fff;
    border-bottom: .4rem solid #f2f2f2;
    position: relative;
  }
  .content {
    background: #fff;
    box-sizing: border-box;
    min-height: 100%;
    margin-top: -1.78rem;
  }
  .content-wrap {
    min-height: 100%;
    box-sizing: border-box;
    /*border-top: .4rem solid #f3f3f3;*/
    /*border-bottom: .4rem solid #f3f3f3;*/
    padding-bottom: 3rem;
  }
  .logo-img {
    display: block;
    width: 7.5rem;
    margin: 0 auto;
    padding-top: 3rem;
  }

  ul {
    width: 9.2rem;
    margin: 0 auto;
    margin-top: 2.2rem;
    margin-bottom: 1rem;
  }

  li {
    display: -webkit-box;
  }

  li img {
    display: block;
    height: .6rem;
    width: .6rem;
    margin-top: .6rem;
  }

  li label {
    font-size: .6rem;
    border-bottom: 1px solid #ccc;
    color: #5a7193;
    font-weight: bold;
    line-height: 1;
    display: -webkit-box;
    vertical-align: middle;
    margin-left: .5rem;
    -webkit-box-flex: 1;
  }
  li label span {
    line-height: 1.8rem;
    height: 1.8rem;
  }
  li label input {
    -webkit-box-flex: 1;
    display: block;
    font-size: .6rem;
    height: 1.8rem;
    line-height: .6rem;
  }
  .button {
    margin-top: -2.6rem;
    margin-bottom: 1rem;
  }
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
