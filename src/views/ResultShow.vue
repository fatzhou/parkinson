<template>
  <div id="result-show">
    <h1>查看结论<a href="javascript:;" @click="close">关闭</a></h1>
    <div class="content">
      <div class="content-wrap">
        <div class="qrcode-area">
          <p >扫描二维码，下载医动力APP</p>
          <a href="http://www.gyenno.com/future/medical_power"><img src="../../static/image/result_qrcode.png" alt=""></a>
        </div>
        <div class="split"></div>
        <div class="result-area">
           <p>请在医动力——"我的诊断"查看自己的评估结论</p>
          <img src="../../static/image/result_iphone.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import util from '../../static/js/util.js'
    export default {
        data() {
            return {
            }
        },
        mounted: function() {
          util.storeData.get('info', this, 'info');
          if(!this.info || !this.info.doctorMobile || !this.info.patientMobile || !this.info.familyMobile) {
            // location.href = '/';
            this.$router.push('Login');
          }
          // util.storeData.clear();
        },
        methods :{
          close: function() {
            util.storeData.clear();
            this.$router.push('Login');
          }
        },
    }
</script>

<style scoped>
  #result-show {
    height: 100%;
    background: #eff0f1;
  }
  h1 {
    font-size: .54rem;
    text-align: center;
    line-height: 1;
    padding: .42rem 0;
    color: #3c485a;
    background: #fff;
  }
  h1 a {
    position: absolute;
    right: 0;
    font-size: .48rem;
    line-height: 1.38rem;
    top: 0;
    padding: 0 .5rem;
    color: #5a7193;
    display: block;
  }

  .content {
    background: #fff;
    height: 100%;
    box-sizing: border-box;
    padding-top: 1.38rem;
    margin-top: -1.38rem;
  }
  .content .result-area img {
    display: block;
    width: 60%;
    margin: 0 auto;
    padding: .5rem 0 1rem;
  }
  .content .qrcode-area p, .content .result-area p {
    font-size: .48rem;
    line-height: 5;
    text-align: center;
    color: ##5a7193;
  }

  .content .qrcode-area img {
    display: block;
    width: 30%;
    margin: 0 auto;
    padding-bottom: 1rem;
  }
  .content-wrap {
    height: 100%;
    box-sizing: border-box;
    border-top: .4rem solid #f3f3f3;
/*    border-bottom: .4rem solid #f3f3f3;*/
  }
</style>
