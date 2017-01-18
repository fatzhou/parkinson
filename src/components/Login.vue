<template>
  <div id="login">
    <h1>全国多中心PD大数据库</h1>
    <div class="content">
      <div class="content-wrap">
        <img class="logo-img" src="../../static/image/sign_icon.png" alt="">
        <ul>
          <li v-for="item in items">
            <img :src="item.logo" alt="">
            <label :for="item.name">
              <!-- <span>{{item.desc}}</span> -->
              <input :id="item.name" :name="item.name" v-model.trim="item.status" :placeholder="item.placeholder" >
            </label>
          </li>
        </ul>
        <div class="protocol">
          <label>
            <input type="checkbox" v-model="protocolConfirm">
            <span>我同意</span><router-link to="Protocol">《{{protocolName}}》</router-link>
          </label>
        </div>
      </div>
    </div>
    <div class="button" @click="queryPatient" >确定</div>
  </div>
</template>

<script>
  import util from '../../static/js/util.js'
  import myAlert from '../../static/js/alert.js'
  import loginConfig from '../../static/js/config/Login.js'
    export default {
        name: 'Login',
        data() {
            return {
              url: util.api.host + util.api.Login.url,
              key: 'Login',
              // loginInfo: {
              //   type: 'patient'
              // },
              protocolConfirm: false,
              items: loginConfig,
              info: {
                doctorMobile: '',
                patientMobile: '',
                familyMobile: ''
              }
            }
        },
        props: ['loginInfo','protocolName',"nextStep"],
        created() {
          // console.log(this.loginInfo)
          // util.storeData.type = this.loginInfo.type;
          //从缓存中读取医生数据
          util.storeData.set('loginInfo', this, 'loginInfo');
          util.storeData.get(this.key, this.items);
          util.storeData.get('info', this, 'info');

          // if(!this.info.doctorMobile && this.items[1].status) {
          //   // location.reload();
          //   this.items.forEach(function(item) {
          //     item.status = '';
          //   })
          // }
        },
        mounted() {

        },
        methods :{
            beforeGoProtocol() {
              // this.saveData();
              this.$router.push('Protocol');
            },
            saveData() {
              window.info.doctorMobile = this.items[1].status;
              //保存医生数据到本地缓存
              this.info.doctorMobile = this.items[1].status;
              util.storeData.set(this.key, this.items);
              util.storeData.set('info', this, 'info');
            },
            queryPatient () {
                var flag = util.checkForm(this.items);
                if(flag) {
                  if(!this.protocolConfirm) {
                    myAlert({
                      str: '请勾选' + this.protocolName
                    });
                    return false;
                  }
                }
                if(flag) {
                  var data = {
                    name: this.items[0].status,
                    mobile: this.items[1].status
                  };

                  this.$http.post(this.url, data)
                  .then((response) => {
                    var data = response.body;
                    if(data.code === 0) {
                      this.saveData();
                      this.$router.push(this.nextStep);
                    } else {
                      console.log(data.message)
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
    line-height: 1.25;
  }
  .button {
    margin-top: -2.6rem;
    margin-bottom: 1rem;
  }
  .protocol {
    width: 9.2rem;
    margin: 0 auto;
    box-sizing: border-box;
    padding-left: 1.1rem;
    font-size: .4rem;
    line-height: 1.75;
    margin-top: -.4rem;
  }
  .protocol span, .protocol input, .protocol a {
    display: inline-block;
    vertical-align: middle;
  }
  .protocol span {
    margin-left: .2rem;
  }
  .protocol a {
    color:#5591fc;
  }
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
