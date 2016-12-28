<template>
  <div id="PatintList">
    <h1><router-link class="h1link" to="PatientAdmin">&lt;</router-link>患者列表<a href="javascript:;" class="search"></a></h1>
    <div class="content">
      <ul>
        <li>
          <h3>李磊</h3>
          <p><span>性别：男</span><span>年龄：68岁</span></p>
          <p><span>电话：15111111111</span><span>籍贯：北京</span></p>
          <a href="javascript:;" class="enter">&gt;</a>
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
          $router.push('PatientList');
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
  .h1link {
    position: absolute;
    left: .5rem;
    font-size: .48rem;
    transform: scaleY(2);
    top: .42rem;
    color: #5a7193;
  }
  .search {
    position: absolute;
    width: .42rem;
    height: .42rem;
    display: block;
    right: .5rem;
    top: .42rem;
    background: url(../../static/image/list_icon_search.png);
  }
  .content {

  }
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
