<template>
  <div class="wrap">
    <div id="sick-status">
      <h1>一.疾病现状问题</h1>
      <div class="ul-wrap bottom-padding">
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
    <div class="function-area">
       <div class="back-button confirm-button" @click="goBack">上一部分</div>
       <div class="next-button button" @click="goNext">保存并填写药物情况</div>
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
              url: util.api.host + util.api.SickStatus.url,
              key: 'SickStatus',
              items: SickStatus,
            }
        },
        created() {
          // util.storeData.get('info', this, 'info');
          // if(!this.info || !this.info.doctorMobile || !this.info.patientMobile) {
          //   // location.href = '/';
          //   this.$router.push("Login");
          // }
          // util.storeData.get(this.key, this.items);
        },
        methods :{
          goBack() {
            // util.storeData.set('info', this, 'info');
            // util.storeData.set(this.key, this.items);
            this.$router.push("PatientInfo");
          },
          goNext() {
            var flag = util.checkForm(this.items, 'status', 2);
            if(flag) {
              var answers = this.items.map(function(item) {
                return +item.status;
              });
              var postData = {
                "patientMobile": window.info.patientMobile,
                "quizAnswers": {
                    "quizId": 1,
                    "answers": answers
                }
              };
              this.$http.post(this.url, postData)
              .then((response) => {
                var data = response.body;
                if(data.code === 0) {
                  // util.storeData.set(this.key, this.items);
                  // util.storeData.set('info', this, 'info');
                  this.$router.push("DrugStatus");
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
