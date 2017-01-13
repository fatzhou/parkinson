<template>
  <div class="wrap">
    <div id="drug-status">
      <h1>二.药物服用情况</h1>
      <div class="ul-wrap bottom-padding">
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
                  <input type="text" v-model="otherItem.name">
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
    <div class="function-area">
       <div class="back-button confirm-button" @click="goBack">上一部分</div>
       <div class="next-button button" @click="goNext">完成提交</div>
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
              url: util.api.host + util.api.DrugStatus.url,
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
        methods :{
          goBack() {
            this.saveData();
            this.$router.push("SickStatus");
          },
          goNext() {
              var flag = true;
              var otherItem = this.otherItem;
              if(flag) {
                if(!otherItem.name && (otherItem.amount || otherItem.times || otherItem.years)) {
                  myAlert('请输入其他药物的药物名称');
                  document.getElementById('other').scrollIntoView();
                  return false;
                }
                this.saveData();
                var meds = this.items.map(function(item) {
                  return {
                    "dose": parseInt(item.amount) || 0,
                    "time": parseInt(item.times) || 0,
                    "year": parseInt(item.years) || 0
                  };
                });

                if(otherItem.name) {
                  var others = [{
                    name: otherItem.name,
                    use: {
                      dose: parseInt(otherItem.amount) || 0,
                      time: parseInt(otherItem.times) || 0,
                      year: parseInt(otherItem.years) || 0
                    }
                  }];
                } else {
                  others = [];
                }

                var postData = {
                  "patientMobile": window.info.patientMobile,
                  "med": meds,
                  "others": others
                };
                console.log(postData)
                this.$http.post(this.url, postData)
                .then((response) => {
                  console.log(response)
                  var data = response.body;
                  if(data.code === 0) {
                    // this.saveData();
                    this.$router.push("FamilyMemberAdd");
                  } else {
                    myAlert(data.message);
                  }
                })
                .catch(function(response) {
                  myAlert('您当前网络出现故障，请稍后再试');
                });

              }
          },
          saveData() {
            // util.storeData.set('info', this, 'info');
            // util.storeData.set(this.key+'Amount', this.items, 'amount');
            // util.storeData.set(this.key+'Times', this.items, 'times');
            // util.storeData.set(this.key+'Years', this.items, 'years');
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
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
