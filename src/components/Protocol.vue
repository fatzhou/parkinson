<template>
  <div id="wrap">
    <h1><router-link class="h1link" to="Login">&lt;</router-link>{{title}}</h1>
    <div class="content">
      <p class="main-title">{{subtitle}}</p>
       <div v-for="item in content">
         <p v-if="item.title" class="sub-title">{{item.title}}</p>
         <p v-if="item.content" class="sub-content">{{item.content}}</p>
       </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'Protocol',
      props: ['title', 'subtitle', 'content'],
        data() {
            return {

            }
        },
        created() {
        },
    }
</script>

<style scoped>
  #wrap {
    height: 100%;
    background: #f3f3f3;
  }
  h1 {
    font-size: .54rem;
    text-align: center;
    line-height: 1;
    padding: .46rem 0;
    color: #3c485a;
    background: #fff;
    border-bottom: .4rem solid #f2f2f2;
    position: relative;
  }
  .content {
    font-size: .42rem;
    line-height: 1.5;
    color: #808080;
    padding: .2rem .3rem;
    background: #fff;
  }
  .content .main-title {
    line-height: 2;
  }
  .content .sub-title {
    margin-top: .4rem;
  }
  .content .sub-content {

    text-indent: .8rem;
  }
  .h1link {
    position: absolute;
    left: .5rem;
    font-size: .48rem;
    transform: scaleY(2);
    top: .42rem;
    color: #5a7193;
  }
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
