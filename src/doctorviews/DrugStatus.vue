<template>
  <div class="wrap">
    <div id="drug-status">
      <h1><router-link class="h1link" :to="{name:'PatientInfo',params:{mobile: $route.params.mobile}}">&lt;</router-link>药物服用情况</h1>
      <div class="ul-wrap">
        <ul>
          <li v-for="item,index in items">
              <p>{{index+1}}. {{item.drug}}</p>
              <div class="items">
                <span>剂量</span>
                <label for="">
                  <input type="number" v-model="item.amount">
                  片
                </label>
              </div>
              <div class="items">
                <span>次数</span>
                <label for="">
                  <input type="number" v-model="item.times">
                  次/天
                </label>
              </div>
              <div class="items">
                <span>年限</span>
                <label for="">
                  <input type="number" v-model="item.years">
                  年
                </label>
              </div>
          </li>

          <li id="other">
              <p>{{items.length+1}}. 其他药物</p>
              <div class="items">
                <span>药名</span>
                <label for="">
                  <input type="text" class="no-words" v-model="otherItem.name">
                </label>
              </div>
              <div class="items">
                <span>剂量</span>
                <label for="">
                  <input type="number" v-model="otherItem.amount">
                  片
                </label>
              </div>
              <div class="items">
                <span>次数</span>
                <label for="">
                  <input type="number" v-model="otherItem.times">
                  次/天
                </label>
              </div>
              <div class="items">
                <span>年限</span>
                <label for="">
                  <input type="number" v-model="otherItem.years">
                  年
                </label>
              </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import util from '../../static/js/util.js'
import myAlert from '../../static/js/alert.js'
import drugStatus from '../../static/js/config/DrugStatus.js'
    export default {
        data() {
            return {
              url: util.api.doctor.host + util.api.doctor.DrugStatus,
              key: 'DrugStatus',
              items: drugStatus.items,
              otherItem: drugStatus.otherItem
              // info: {
              //   doctorMobile: '',
              //   patientMobile: '',
              //   familyMobile: ''
              // }
            }
        },
        created() {
          // util.storeData.get('info', this, 'info');
          // if(!this.info || !this.info.doctorMobile || !this.info.patientMobile) {
          //     // location.href = '/';
          //     this.$router.push("Login");
          // }
          // util.storeData.get(this.key+'Amount', this.items, 'amount');
          // util.storeData.get(this.key+'Times', this.items, 'times');
          // util.storeData.get(this.key+'Years', this.items, 'years');
        },
        mounted() {
          var postData = {
            doctorMobile: window.info.doctorMobile,
            patientMobile: window.info.patientMobile,
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
          saveData() {
            // util.storeData.set('info', this, 'info');
            // util.storeData.set(this.key+'Amount', this.items, 'amount');
            // util.storeData.set(this.key+'Times', this.items, 'times');
            // util.storeData.set(this.key+'Years', this.items, 'years');
          },
          setStatus(data) {
            var meds = data.meds;
            this.items.forEach((item, index)=>{
              item.amount = meds[index].dose || '';
              item.times = meds[index].time || '';
              item.years = meds[index].year || '';
            });

            var other = data.others[0] || {use:{}},
                otherItem = this.otherItem;

            otherItem.name = other.name || '';
            otherItem.amount = other.use.dose || '';
            otherItem.times = other.use.time || '';
            otherItem.years = other.use.year || '';
            console.log(this.otherItem)
          }
        }
    }
</script>

<style scoped>
  .wrap {
    height: 100%;
  }
  #drug-status {
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
    min-height: 100%;
  }
  ul {
    background: #fff;
    padding: 0 .15rem;
    padding-bottom: .6rem;
    border-radius: 8px;
  }
  li p {
    font-size: .54rem;
    line-height: 1.54rem;
    border-bottom: 1px solid #c5cbd3;
    color: #3c485a;
  }
  .items {
    font-size: .48rem;
    line-height: 1.48rem;
    height: 1.48rem;
    display: -webkit-box;
    padding-right: .3rem;
    padding-left: .5rem;
    color: #5a7193;
  }
  .items span {
    display: block;
  }
  .items label {
    border-bottom: 1px solid #c5cbd3;
    -webkit-box-flex: 1;
    display: block;
    text-align: right;
  }
  .items label input {
    /*height: .48rem;*/
    line-height: .48rem;
    font-size: .48rem;
    text-align: right;
  }
  .items label input.no-words {
    width: 95%;
  }

</style>
<!-- 样式自行设置，或者直接看源码就好 -->
