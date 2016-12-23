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
              <span>{{item.desc}}</span>
              <input :id="item.name" :name="item.name" v-model.trim="item.status" >
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
    export default {
        data() {
            return {
              url: 'http://211.149.193.19:8080/api/customers',
              items: [
                { name: 'doctor-name', desc: '主治医生姓名：', status: '', logo: '../static/image/data_icon_name.png' },
                { name: 'doctor-tel', desc: '医生手机号码：', status: '', logo: '../static/image/data_icon_phone.png', validate: "telephone" }
              ]
            }
        },
        created() {
          util.storeData.get('Login', this.items);
        },
        methods :{
            queryPatient () {
                var flag = util.checkForm(this.items);
                if(flag) {
                  var data = {
                    name: this.items[0].status,
                    mobile: this.items[1].status
                  };

                  this.$http.post(this.url, data)
                  .then((response) => {
                    util.storeData.set('Login', this.items);
                    $router.push("PatientInfo");
                  })
                  .catch(function(response) {
                    alert(response.msg);
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
  }
  .content {
    background: #fff;
    box-sizing: border-box;
    height: 100%;
    margin-top: -1.38rem;
    padding-top: 1.38rem;
  }
  .content-wrap {
    height: 100%;
    box-sizing: border-box;
    border-top: .4rem solid #f3f3f3;
    border-bottom: .4rem solid #f3f3f3;
    padding-bottom: 3rem;
  }
  .logo-img {
    display: block;
    width: 7.5rem;
    margin: 0 auto;
    padding-top: 1.4rem;
  }

  ul {
    width: 8.54rem;
    margin: 0 auto;
    margin-top: 2.2rem;
    margin-bottom: 1rem;
  }

  li {
    display: -webkit-box;
  }

  li img {
    display: inline-block;
    vertical-align: middle;
    width: .6rem;
    margin-top: .37rem;
  }

  li label {
    font-size: .42rem;
    /*padding: .46rem 0;*/
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
    line-height: 1.34rem;
    height: 1.34rem;
  }
  li label input {
    -webkit-box-flex: 1;
    display: block;
    font-size: .42rem;
    height: 1.34rem;
    line-height: .42rem;
  }
  .button {
    margin-top: -2.6rem;
  }
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
