<template>
  <div id="PatintList">
    <h1>
      <router-link class="h1link" :to="{name:'PatientDetail',params:{mobile:$route.params.mobile}}">&lt;</router-link>
      患者家属
    </h1>

    <div class="content" v-if="patientList.length>0">
      <ul>
        <li v-for="item in patientList">
          <router-link :to="{name:'FamilyMember', params: {mobile: $route.params.mobile, familyMobile: item.mobile}}">
            <h3 class="name eps">{{item.name}}</h3>
            <p class="relation"><span>关系: {{['其他','母子','父子','母女','父女'][item.relation]}}</span></p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="content content-position" v-else>
      <div class="content-wrap">
        <img src="../../static/image/choose_icon_default_85.png" alt="">
        <p>该患者尚未添加家属</p>
      </div>
    </div>

  </div>
</template>

<script>
  import util from '../../static/js/util.js'
  import myAlert from '../../static/js/alert.js'

  export default {
      data() {
          return {
            url: util.api.doctor.host + util.api.doctor.FamilyList,
            searching: false,
            patientList: [],
            pageNo: 1,
            pageNum: 20
          }
      },
      created() {
        console.log(this.$route.params)
      },
      mounted() {
        var postData = {
          doctorMobile: window.info.doctorMobile,
          patientMobile: window.info.patientMobile
        };

        this.$http.post(this.url, postData, {
          headers: {'Authorization': 'Bearer ' + window.info.token}
        })
        .then((res)=>{
          var data = res.body;
          if(data.code == 0) {
            this.patientList = data.data;
          } else if(data.code == 3) {
            this.$router.push('Login');
          } else {
            myAlert(data.message);
          }
        });
      },
      methods :{

      }
  }
</script>

<style scoped>
  #PatintList {
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
    background: #f2f2f2;
  }
  h1 {
    font-size: .54rem;
    text-align: center;
    line-height: 1;
    padding: .42rem 0;
    color: #3c485a;
    position: relative;
    background: #fff;
  }
  .h1link {
    position: absolute;
    left: .5rem;
    font-size: .48rem;
    transform: scaleY(2);
    top: .42rem;
    color: #5a7193;
    line-height: 1;
  }
  .input-label {
    display: block;
    padding: 0 2.0rem 0 1.2rem;
    box-sizing: border-box;
    height: .68rem;
  }
  .input-label input {
    border: 1px solid #ccc;
    border-radius: .4rem;
    display: block;
    width: 100%;
    font-size: .44rem;
    line-height: .68rem;
    height: .68rem;
    background: #f1f1f1;
    color: #999;
    /*text-align: center;*/
    text-indent: .4rem;
  }
  .confirm-label {
    position: absolute;
    right: .6rem;
    top: .42rem;
    font-size: .48rem;
    line-height: .68rem;
  }
  .content {

  }

  .content ul {
    background: #f2f2f2;
    padding: .4rem;
  }

  .content ul li {
    background: #fff;
    border-radius: .2rem;
    margin-bottom: .4rem;
    padding: .2rem .5rem .3rem;
    position: relative;
  }
  .content .name {
    color: #3c485a;
    font-weight: bold;
    font-size: .54rem;
    line-height: 2;
  }
  .content .relation, .content .tel-home {
    color: #aaa;
    font-size: .42rem;
    line-height: 1.6;
  }
  .content ul li .enter {
    position: absolute;
    width: .5rem;
    height: .5rem;
    right: .4rem;
    background: url(../../static/image/detail_icon_return.png);
    background-size: 100% 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  .content ul li span:first-child {
    margin-right: .8rem;
  }
  .content-position {
    height: 100%;
    box-sizing: border-box;
    padding-top: 1.52rem;
    position: relative;
  }
  .content-wrap {
    top: 50%;
    transform: translateY(-50%);
    margin-top: -1.52rem;
    position: absolute;
  }
  .content-wrap img {
    display: block;
    width: 30%;
    margin: 0 auto;
  }
  .content-wrap p {
    text-align: center;
    white-space: nowrap;
    color: #959fa8;
    font-size: .46rem;
    line-height: 3;
  }
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
