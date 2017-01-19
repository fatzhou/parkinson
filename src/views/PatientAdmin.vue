<template>
  <div id="PatintList">
    <h1>帕金森流行病学调查问卷</h1>
    <div class="content">
      <img class="question-banner" src="../../static/image/questionnaire_banner.png" alt="">

      <div class="confirm-button" @click="goNext1">
          <img src="../../static/image/questionnaire_icon_fmaily.png" alt="">
          <span>患者管理</span>
      </div>

      <div class="confirm-button little-margin" @click="goNext2">
          <img src="../../static/image/questionnaire_icon_fmaily.png" alt="">
          <span>患者管理(社会人群)</span>
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
      methods :{
        goNext1() {
          this.$router.push('PatientList');
        },
        goNext2() {
          this.$router.push('PatientList');
        },
      }
  }
</script>

<style scoped>
  #PatintList {
    height: 100%;
  }
  h1 {
    font-size: .54rem;
    text-align: center;
    line-height: 1;
    padding: .42rem 0;
    color: #3c485a;
    position: relative;
  }
  .content {

  }
  .question-banner {
    display: block;
    width: 100%;
  }
  .confirm-button {
    margin-top: 2rem;
  }
  .confirm-button img, .confirm-button span {
    display: inline-block;
    vertical-align: middle;
  }
  .confirm-button img {
    width: .6rem;
    height: .6rem;
  }
  .little-margin {
    margin-top: 1rem;
  }
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
