<template>
  <div id="gene-test">
    <h1><router-link class="h1link" to="PatientList">&lt;</router-link>患者详情</h1>
    <div class="split"></div>
    <div class="genetest-area">
      <div class="genetest-wrap">
        <div class="yellow common-button" @click="goNext1">
          <p class="title">患者本人</p>
        </div>
        <div class="blue common-button little-margin">
          <p class="title">患者家属</p>
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
      mounted() {
        console.log(this.$route.params)
      },
      methods :{
        goNext1() {
          this.$router.push({
            name: 'PatientInfo',
            params: {
              mobile: this.$route.params.mobile
            }
          })
        }
      }
  }
</script>

<style scoped>
  #gene-test {
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
    color: #5a7193;
    background-color: #f8f8f8;
  }
  h1 {
    font-size: .54rem;
    text-align: center;
    line-height: 1;
    padding: .42rem 0;
    color: #3c485a;
    position: relative;
    background: #fff;
    z-index: 1000;
  }
  .h1link {
    position: absolute;
    left: .5rem;
    font-size: .48rem;
    transform: scaleY(2);
    top: .42rem;
    color: #5a7193;
  }
  .genetest-area {
    height: 100%;
    box-sizing: border-box;
    margin-top: -1.78rem;
    padding-top: 1.78rem;
    position: relative;
  }
  .genetest-wrap {
    /*position: absolute;*/
    text-align: center;
    padding: 1rem 0;
    background: #f8f8f8;
/*    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    margin-top: -1.78rem;*/
  }
  .genetest-wrap h2 {
    font-size: .48rem;
    line-height: 4;
    color: #666;
  }
  .common-button {
    border-radius: .4rem;
    color: #fff;
    padding: .3rem 0;
    width: 70%;
    margin: 0 auto;
  }
  .common-button .title {
    font-size: .48rem;
    line-height: 1.5;
  }
  .common-button .explain {
    font-size: .42rem;
    color: #eee;
    line-height: 1.5;
  }
  .yellow {
    background: #ff9c00;
  }
  .yellow:hover, .yellow:active {
    background: #f78000;
  }
  .blue {
    background: #5a7193;
  }
  .blue:hover, .blue:active {
    background: #273348;
  }
  .little-margin {
    margin-top: .8rem;
  }

  @media all and (orientation : portrait) {
    .genetest-wrap {
      position: absolute;
      text-align: center;
      background: #f8f8f8;
      top: 50%;
      left: 0;
      width: 100%;
      transform: translateY(-50%);
      margin-top: -1.78rem;
    }
  }
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
