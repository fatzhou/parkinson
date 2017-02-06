<template>
  <div class="wrap">
    <div id="family-member">
      <h1>
        <router-link class="h1link" :to="{name:'FamilyList'}" v-if="type">&lt;</router-link>
        <router-link class="h1link" :to="{name:'PatientList'}" v-else>&lt;</router-link>
        家庭成员资料
      </h1>
      <div class="split"></div>

      <InfoType :items="items.slice(patientIndex)"></InfoType>

    </div>
    <div class="confirm-wrap">
      <div class="confirm-button" @click="goNext">查看前驱期调查问卷</div>
    </div>
  </div>

</template>

<script>
  import InfoType from '../components/InfoType'
  import util from '../../static/js/util.js'
  import FamilyMember from '../../static/js/config/FamilyMember.js'
  import myAlert from '../../static/js/alert.js'
  require('../../static/css/mobile-select-date.less')
  export default {
    name: 'FamilyMember',
      data() {
          return {
            url: util.api.doctor.host + util.api.doctor.PatientInfo,
            key: 'FamilyMember',
            items: FamilyMember.items,
            type: window.info.patientType === 'patient'
          }
      },
      computed: {
        patientIndex() {
          return window.info.patientType === 'patient' ? 0 : 1
        }
      },
      mounted() {
        window.info.familyMobile = this.$route.params.familyMobile || window.info.familyMobile;
        // util.storeData.get('info', this, 'info');
        // if(!this.info || !this.info.doctorMobile) {
        //     this.$router.push("Login");
        //     // location.href = '/';
        //   }
        // util.storeData.get(this.key, this.items);
        var postData = {
          doctorMobile: window.info.doctorMobile,
          patientMobile: window.info.familyMobile,
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
      methods: {
        setStatus(data) {
          var nameNick = {
            'mobile': 'mobile',
            'mobile2': 'mobile2',
            'history': 'history',
            'relation': 'relation',
            'email': 'email',
            'sex': 'sex',
            'name': 'name'
          };
          //命名差异
          for(var el in nameNick) {
            var tmpItem = this.items.filter(function(item) {
               return item.id === el;
            })[0];
            tmpItem && (tmpItem.status = (data[nameNick[el]] || ''));
          }

          var timeNick = {
            'birthday': 'birthday',
          };
          for(var el in timeNick) {
            var tmpItem = this.items.filter(function(item) {
               return item.id === el;
            })[0];
            tmpItem && (tmpItem.status = (data[timeNick[el]]||'').replace(/-/g,'/'));
          }

          ['homeProvince','homeCity','liveProvince','liveCity'].forEach((el)=>{
            data[el] = (data[el]||'').replace(/\d/g, '');
          });
          var homePlace = data.homeProvince + ' ' + data.homeCity,
              livePlace = data.liveProvince + ' ' + data.liveCity;
          ['home', 'native'].forEach((el, index)=>{
            var tmpItem = this.items.filter(function(item) {
               return item.id === el;
            })[0];
            tmpItem.status = [livePlace, homePlace][index];
          });

          window.info.genetest = data.genetest;
        },
        goNext() {
          this.$router.push('EnvironmentQuiz');
        }
      },
      components: {InfoType}
  }
</script>

<style lang="less" scoped>
  @fontSize: .48rem;
  .wrap {
    height: 100%;
  }
  #family-member {
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
    color: #5a7193;
    position: relative;
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
    font-size: .48rem;
    transform: scaleY(2);
    top: .42rem;
    color: #5a7193;
    line-height: 1;
  }
  .ul-wrap {
    background: #f3f3f3;
    padding: .3rem;
    min-height: 100%;
  }
  .verify-code {
    overflow: hidden;
    margin-left: .5rem;
    border-top: 1px solid #f3f3f3;
    border-bottom: 1px solid #f3f3f3;
    padding-right: .7rem;
    font-size: @fontSize;
  }
  .verify-code input {
    float: left;
    /*padding: .52rem 0;*/
    line-height: 1;
    font-size: @fontSize;
    height: 1.46rem;
  }
  .code-button {
    float: right;
    color: #fff;
    font-size: @fontSize;
    border-radius: .5rem;
    margin-top: .27rem;
    padding: .25rem .3rem;
    background: #ff9c00;
    line-height: 1;
    display: block;
    white-space: nowrap;
    text-align: center;
  }
  .code-time {
    width: 2rem;
    padding: .25rem 0;
  }
  .code-button:hover, .code-button:active {
    background: #f78000;
  }
  .dialog-select {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    text-align: center;
  }
  .dialog-select-wrap {
    position: absolute;
    bottom: 0;
    background: #fff;
    left: 0;
    width: 100%;
  }
  .dialog-select .question {
    color: #333;
    font-size: @fontSize;
    line-height: 1;
    padding: .46rem 0;

  }
  .button-answer {
    color: #fff;
    font-size: @fontSize;
    line-height: 1;
    padding: .46rem 0;
    width: 70%;
    margin: 0 auto;
    border-radius: 8px;
  }
  .button-answer:last-child {
    margin-top: .4rem;
    margin-bottom: .4rem;
  }
  .button-answer-yes {
    background: #ff9c00;
  }
  .button-answer-yes:hover, .button-answer-yes:active {
    background: #f78000;
  }
  .button-answer-no {
    background: #5a7193;
  }
  .button-answer-no:hover, .button-answer-no:active {
    background: #273348;
  }
  .button-answer span {
    font-size: .36rem;
    line-height: @fontSize;
    color: #f3f3f3;
  }
  .confirm-wrap {
    padding: .6rem 0;
  }
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
