<template>
  <div id="finish-page">
    <h1>完成</h1>
    <div class="content">
      <img src="../../static/image/answer_icon_finish.png" alt="">
      <p>您完成了评估答题!</p>
      <div class="button confirm-button confirm-button-1" @click="getResult">查看诊断结论</div>
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
              location.href = '/';
          }
        },
        methods :{
          getResult: function() {

            $router.push("ResultShow");
          }
        },
    }
</script>

<style scoped>
  #finish-page {
    min-height: 100%;
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
  .content {
    background: #fff;
    margin-top: .4rem;
    padding-bottom: .7rem;
  }
  .content img {
    width: 30%;
    display: block;
    margin: 0 auto;
    padding: .7rem 0;
  }
  .content p {
    font-size: .42rem;
    line-height: 1;
    text-align: center;
    color: ##5a7193;
    margin-bottom: 2rem;
  }
</style>
