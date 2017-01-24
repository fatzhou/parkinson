<template>
  <div id="patient-info">
    <h1><router-link class="h1link" :to="{name:'PatientDetail'}">&lt;</router-link>帕金森患者问卷</h1>
    <div class="split"></div>

    <InfoType :items="items.slice(0,6)"></InfoType>

    <div class="split"></div>

    <InfoType :items="items.slice(6)"></InfoType>

    <div class="split"></div>
    <div class="confirm-wrap">
       <div class="back-button confirm-button" @click="goNext1">帕金森调查问卷</div>
       <div class="next-button button" @click="goNext2">用药记录</div>
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
            url: util.api.doctor.host + util.api.doctor.PatientInfo,
            key: 'PatientInfo',
            items: PatientInfo,
          }
      },
      mounted() {
        // util.storeData.get('info', this, 'info');
        // if(!this.info || !this.info.doctorMobile) {
        //     // location.href = '/';
        //     this.$router.push("Login");
        // }
        // util.storeData.get(this.key, this.items);
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
            this.setStatus(data.data);
          } else if(data.code == 3) {
            this.$router.push('Login');
          } else {
            myAlert(data.message);
          }
        });
      },
      methods :{
        goNext1() {
          this.$router.push({
            name: 'SickStatus',
            params: {
              mobile: window.info.patientMobile
            }
          })
        },
        goNext2() {
          this.$router.push({
            name: 'DrugStatus',
            params: {
              mobile: window.info.patientMobile
            }
          })
        },
        setStatus(data) {
          var nameNick = {
            'tel': 'patientAs',
            'tel1': 'familyAs',
            'tel2': 'mobile2',
            'anamnesis': 'history',
            'familysick': 'familyPatient',
            'sicktype': 'deseaseType',
            'sex': 'sex',
            'name': 'name'
          };
          //命名差异
          for(var el in nameNick) {
            var tmpItem = this.items.filter(function(item) {
               return item.id === el;
            })[0];
            tmpItem && (tmpItem.status = (data[nameNick[el]]||''));
          }

          var timeNick = {
            'birthday': 'birthday',
            'sicktime': 'startDate',
            'confirmtime': 'confirmDate'
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
    padding: .6rem .8rem;
    overflow: hidden;
  }
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
