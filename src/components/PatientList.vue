<template>
  <div id="PatintList">
    <h1>患者列表</h1>
    <div class="content">
      <ul>
        <li>
          <h3>李磊</h3>
        </li>
      </ul>
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
        goNext() {
          $route.push('PatientList');
        }
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
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
