<template>
  <div id="result-show">
    <h1>查看结论</h1>
    <div class="content">
      <div class="content-wrap">
        <img src="../../static/image/result_iphone.png" alt="">
        <p>您完成了帕金森病前驱期筛查评估答题!</p>
        <img src="../../static/image/result_qrcode.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
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
  .content {
    background: #fff;
    height: 100%;
    box-sizing: border-box;
    padding-top: 1.38rem;
    margin-top: -1.38rem;
  }
  .content img:first-child {
    display: block;
    width: 80%;
    margin: 0 auto;
    padding: .7rem 0 1rem;
  }
  .content p {
    font-size: .42rem;
    line-height: 1;
    text-align: center;
    color: ##5a7193;
    margin-bottom: .8rem;
  }
  .content img:last-child {
    display: block;
    width: 25%;
    margin: 0 auto;
  }
  .content-wrap {
    height: 100%;
    box-sizing: border-box;
    border-top: .4rem solid #f3f3f3;
    border-bottom: .4rem solid #f3f3f3;
  }
</style>
