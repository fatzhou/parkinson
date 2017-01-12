<template>
  <div id="finish-page">
    <h1>完成<a href="javascript:;" @click="close">关闭</a></h1>
    <div class="content">
      <img src="../../static/image/answer_icon_finish.png" alt="">
      <p class="first-p">您已经完成了帕金森患者问卷!</p>
      <p class="second-p">添加家庭成员，进行帕金森前驱期筛查，提前检测家庭成员患帕金森的风险</p>
      <div class="button confirm-button confirm-button-1" @click="getResult">添加家庭成员</div>
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
          // util.storeData.get('info', this, 'info');
          // if(!this.info || !this.info.doctorMobile) {
          //     // location.href = '/';
          //     this.$router.push("Login");
          // }
        },
        methods :{
          getResult: function() {
            this.$router.push("FamilyMember");
          },
          close: function() {
            // util.storeData.clear();
            // this.$router.push('Login');
            location.reload();
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
    line-height: 1;
    padding: .42rem 0;
    color: #3c485a;
    background: #fff;
    text-align: center;
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
    margin-top: .4rem;
    padding-bottom: .7rem;
  }
  .content img {
    width: 30%;
    display: block;
    margin: 0 auto;
    padding: .7rem 0;
  }
  .content .first-p {
    font-size: .48rem;
    line-height: 1;
    text-align: center;
    color: #5a7193;
    margin-bottom: .7rem;
  }
  .content .second-p {
    font-size: .42rem;
    line-height: 1.5;
    text-align: center;
    width: 80%;
    margin: 0 auto;
    color: #999;
    margin-bottom: .7rem;
  }
</style>
