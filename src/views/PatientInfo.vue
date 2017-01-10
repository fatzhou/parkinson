<template>
  <div id="patient-info">
    <h1><router-link class="h1link" to="Login">&lt;</router-link>帕金森患者问卷</h1>
    <div class="split"></div>

    <InfoType :items="items.slice(0,6)"></InfoType>

    <div class="split"></div>

    <InfoType :items="items.slice(6)"></InfoType>

    <div class="split"></div>
    <div class="confirm-wrap">
      <div class="confirm-button" @click="savePatientInfo">保存并进行下一部分</div>
    </div>

  </div>
</template>

<script>
  import InfoType from '../components/InfoType'
  import util from '../../static/js/util.js'
  import myAlert from '../../static/js/alert.js'
  import PatientInfo from '../../static/js/config/PatientInfo.js'
  require('../../static/css/mobile-select-date.less')
  export default {
      data() {
          return {
            url: util.api.host + util.api.PatientInfo.url,
            key: 'PatientInfo',
            items: PatientInfo,
            info: {
              doctorMobile: '',
              patientMobile: '',
              familyMobile: ''
            }
          }
      },
      created() {
        util.storeData.get('info', this, 'info');
        if(!this.info || !this.info.doctorMobile) {
            // location.href = '/';
            this.$router.push("Login");
        }
        util.storeData.get(this.key, this.items);
      },
      methods :{
        saveData() {
          this.info.patientMobile = this.items[3].status;
          util.storeData.set(this.key, this.items);
          util.storeData.set('info', this, 'info');
        },
        savePatientInfo: function() {
          var flag = util.checkForm(this.items);
          if(flag) {
            var items = this.items;
            var livePlace = items[6].status.replace(/\s+/,'#').split('#') || [],
                homePlace = items[7].status.replace(/\s+/,'#').split('#') || [];
                // console.log(livePlace, items[4].status)
            this.saveData();
            var postData = {
              "doctorMobile": this.info.doctorMobile,
              "patient":
              {
                  "mobile": items[3].status,
                  "name": util.filteremoji(items[0].status),
                  "birthday": items[1].status,
                  "sex": parseInt(items[2].status),
                  "mobile1": items[4].status,
                  "liveProvince": livePlace[0],
                  "liveCity": livePlace[1],
                  "homeProvince": homePlace[0],
                  "homeCity": homePlace[1],
                  "history": util.filteremoji(items[8].status),
                  "familyPatient": items[9].status,
                  "deseaseType": items[10].status,
                  "startDate": items[11].status,
                  "confirmDate": items[12].status,
              }
            };
            items[5].status && (postData.patient.mobile2 = items[5].status);
            // console.log(postData)
            this.$http.post(this.url, postData)
            .then((response) => {
              // console.log(response)
              var data = response.body;
              if(data.code === 0) {
                this.$router.push("SickStatus");
              } else {
                myAlert(data.message);
              }
            })
            .catch(function(response) {
              myAlert('您当前网络出现故障，请稍后再试');
            });
          }
        }
      },
      components: {InfoType}
  }
</script>

<style style="less" scoped>
  @fontSize: .48rem;
  #patient-info {
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
    color: #5a7193;
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
    font-size: @fontSize;
    transform: scaleY(2);
    top: .42rem;
    color: #5a7193;
  }
  .confirm-wrap {
    padding: .6rem 0;
  }
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
