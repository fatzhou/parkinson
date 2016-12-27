<template>
  <div id="drug-status">
    <h1>二.药物服用情况</h1>
    <div class="ul-wrap bottom-padding">
      <ul>
        <li v-for="item,index in items">
            <p>{{index+1}}. {{item.drug}}</p>
            <div class="items">
              <span>剂量</span>
              <label for="">
                <input type="text" v-model="item.amount">
                片
              </label>
            </div>
            <div class="items">
              <span>次数</span>
              <label for="">
                <input type="text" v-model="item.times">
                次/天
              </label>
            </div>
            <div class="items">
              <span>年限</span>
              <label for="">
                <input type="text" v-model="item.years">
                年
              </label>
            </div>
        </li>
      </ul>
    </div>
    <div class="function-area">
       <div class="back-button confirm-button" @click="goBack">上一部分</div>
       <div class="next-button button" @click="goNext">保存并添加家属</div>
    </div>
  </div>
</template>

<script>
import util from '../../static/js/util.js'
import drugStatus from '../../static/js/config/DrugStatus.js'
    export default {
        data() {
            return {
              url: util.api.host + util.api.DrugStatus.url,
              key: 'DrugStatus',
              items: drugStatus,
              info: {
                doctorMobile: '',
                patientMobile: '',
                familyMobile: ''
              }
            }
        },
        created() {
          util.storeData.get('info', this, 'info');
          util.storeData.get(this.key+'Amount', this.items, 'amount');
          util.storeData.get(this.key+'Times', this.items, 'times');
          util.storeData.get(this.key+'Years', this.items, 'years');
        },
        methods :{
          goBack() {
            this.saveData();
            $router.push("SickStatus");
          },
          goNext() {
              var flag = true;
              if(flag) {
                this.saveData();
                var meds = this.items.map(function(item) {
                  return {
                    "dose": parseInt(item.amount) || 0,
                    "time": parseInt(item.times) || 0,
                    "year": parseInt(item.years) || 0
                  };
                });
                var postData = {
                  "patientMobile": this.info.patientMobile,
                  "med": meds
                };
                console.log(postData)
                this.$http.post(this.url, postData)
                .then((response) => {
                  console.log(response)
                  var data = response.body;
                  if(data.code === 0) {
                    // this.saveData();
                    $router.push("FamilyMember");
                  } else {
                    alert(data.message);
                  }
                })
                .catch(function(response) {
                  alert('您当前网络出现故障，请稍后再试');
                });

              }
          },
          saveData() {
            // util.storeData.set('info', this, 'info');
            util.storeData.set(this.key+'Amount', this.items, 'amount');
            util.storeData.set(this.key+'Times', this.items, 'times');
            util.storeData.set(this.key+'Years', this.items, 'years');
          }
        }
    }
</script>

<style scoped>
  #drug-status {
    height: 100%;
  }
  h1 {
    font-size: .54rem;
    text-align: center;
    line-height: 1;
    padding: .42rem 0;
    color: #3c485a;
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
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
