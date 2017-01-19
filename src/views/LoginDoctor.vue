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
            <img src="../../static/image/data_icon_type.png" alt="">
            <label for="">
              <input type="password" name="doctor-passwd" v-model="passwd" placeholder="请输入密码">
            </label>
          </li>
        </ul>

      </div>
    </div>
    <div class="button" @click="queryPatient" >确定</div>
  </div>
</template>

<script>
  import util from '../../static/js/util.js'
  import myAlert from '../../static/js/alert.js'
  import md5 from '../../static/js/md5.js'
  import loginConfig from '../../static/js/config/LoginDoctor.js'
    export default {
        data() {
            return {
              url: util.api.patient.host + util.api.patient.Login.doctorUrl,
              items: loginConfig,
              passwd: '',
              key: 'LoginDoctor',
            }
        },
        created() {
          // util.storeData.get(this.key, this.items);
        },
        computed: {
          md5Passwd() {
            return md5(this.passwd);
          }
        },
        methods :{
            queryPatient () {
                var flag = util.checkForm(this.items);
                if(!this.passwd) {
                  myAlert('请输入登录密码');
                  return false;
                }
                if(flag) {
                  var postData = {
                    doctorMobile: this.items[0].status,
                    password: this.md5Passwd
                  };

                  // util.storeData.set(this.key, this.items);
                  // util.storeData.set('info', this, 'info');

                  // this.$router.push("PatientAdmin");
                  this.$http.post(this.url, postData)
                  .then((response) => {
                    var data = response.body;
                    window.info.doctorMobile = this.items[0].status;
                    console.log(data.doctorMobile)
                    if(data.code === 0) {
                      window.info.token = data.data.token;
                      this.$router.push("PatientAdmin");
                    } else {
                      myAlert(data.message);
                    }
                  })
                  .catch(function(e) {
                    console.log(e)
                    myAlert('查询医生信息失败，请稍后再试');
                  });
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
