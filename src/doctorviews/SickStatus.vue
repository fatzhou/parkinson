<template>
  <div class="wrap">
    <div id="sick-status">
      <h1><router-link class="h1link" :to="{name:'PatientInfo',params:{mobile: $route.params.mobile}}">&lt;</router-link>疾病现状问题</h1>
      <div class="ul-wrap">
        <ul>
          <li v-for="item,index in items">
            <div class="p-wrap">
              <p class="p-title">{{index+1}}. {{item.question}}？</p>
              <p class="p-explain" v-if="item.explain">{{item.explain}}</p>
            </div>
            <label >
              <input type="radio" :name="prefix+index" value="1" v-model="item.status">
              <span>{{item.options?item.options[0]:'是'}}</span>
            </label>
            <label >
              <input type="radio" :name="prefix+index" value="2" v-model="item.status">
              <span>{{item.options?item.options[1]:'否'}}</span>
            </label>
            <label >
              <input type="radio" :name="prefix+index" value="3" v-model="item.status">
              <span>{{item.options?item.options[2]:'不确定'}}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  import myAlert from '../../static/js/alert.js'
  import util from '../../static/js/util.js'
  import SickStatus from '../../static/js/config/SickStatus.js'
    export default {
        data() {
            return {
              prefix: 'sick-status-',
              url: util.api.doctor.host + util.api.doctor.QueryQuiz,
              key: 'SickStatus',
              items: SickStatus,
            }
        },
        mounted() {
          // util.storeData.get('info', this, 'info');
          // if(!this.info || !this.info.doctorMobile || !this.info.patientMobile) {
          //   // location.href = '/';
          //   this.$router.push("Login");
          // }
          // util.storeData.get(this.key, this.items);
          var postData = {
            doctorMobile: window.info.doctorMobile,
            patientMobile: window.info.patientMobile,
            quizId: 1
          };

          this.$http.post(this.url, postData, {
            headers: {'Authorization': 'Bearer ' + window.info.token}
          })
          .then((res)=>{
            var data = res.body;
            if(data.code == 0) {
              this.setStatus(data.data);
            } else if(data.code == 3) {
              this.$router.push('Login');
            } else {
              myAlert(data.message);
            }
          });
        },
        methods :{
          setStatus(data) {
            this.items.forEach((item, index)=>{
              item.status = data.answers[index];
            })
          }
        },
    }
</script>

<style scoped>
  .wrap {
    height: 100%;
  }
  #sick-status {
    height: 100%;
    position: relative;
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
  }
  h1 {
    font-size: .54rem;
    text-align: center;
    line-height: 1;
    padding: .42rem 0;
    color: #3c485a;
  }
  .h1link {
    position: absolute;
    left: .5rem;
    font-size: @fontSize;
    transform: scaleY(2);
    top: .42rem;
    color: #5a7193;
  }
  .ul-wrap {
    background: #f3f3f3;
    padding: .3rem;
    min-height: 100%
  }
  ul {
    background: #fff;
    padding: 0 .15rem;
    border-radius: 8px;
  }
/*  li p {
    font-size: .48rem;
    line-height: 1.48rem;
    border-bottom: 1px solid #c5cbd3;
    color: #3c485a;
  }
*/  li .p-wrap {
    border-bottom: 1px solid #c5cbd3;
  }
  li .p-title {
    font-size: .48rem;
    line-height: 1.48rem;
    color: #3c485a;
    /*padding: 0 .15rem;*/
  }
  li .p-explain {
    font-size: .42rem;
    line-height: 1.34rem;
    color: #a5b1c6;
    /*padding: 0 .15rem;*/
  }
  li label {
    display: block;
    font-size: .42rem;
    line-height: 1.34rem;
    color: #5a7193;
  }
  li label input, li label span {
    display: inline-block;
    vertical-align: middle;
  }
</style>
