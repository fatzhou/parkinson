<template>
  <div class="wrap">
    <div id="environment-question">
      <h1>生活和环境因素</h1>
      <div class="ul-wrap">
        <ul>
          <li v-for="item,index in items">
            <div class="p-wrap">
              <p class="p-title">{{index+1}}. {{item.question}}？</p>
              <p class="p-explain" v-if="item.explain">{{item.explain}}</p>
            </div>

            <label v-for="i,j in (item.options || ['是','否', '不确定'])">
              <input type="radio" :name="prefix+index" :value="j+1" v-model="item.status">
              <span>{{i}}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div class="function-area">
       <div class="back-button confirm-button" @click="goBack">上一部分</div>
       <div class="next-button button" @click="goNext">保存并提交</div>
    </div>
  </div>

</template>

<script>
import util from '../../static/js/util.js'
import EnvironmentQuestion from '../../static/js/config/EnvironmentQuestion.js'
import myAlert from '../../static/js/alert.js'
    export default {
        data() {
            return {
              key: 'EnvironmentQuestion',
              prefix: 'gene-question-',
              items: EnvironmentQuestion,
              url: util.api.host + util.api.SickStatus.url,
            }
        },
        created() {
          // util.storeData.get(this.key, this.items);
          // util.storeData.get('info', this, 'info');
          // if(!this.info || !this.info.doctorMobile || !this.info.familyMobile) {
          //     // location.href = '/';
          //     this.$router.push("Login");
          // }
        },
        methods :{
          goBack() {
            // util.storeData.set(this.key, this.items);
            this.$router.push("FamilyMember");
          },
          goNext() {
            var flag = util.checkForm(this.items, 'status', 2);
            if(flag) {
              // util.storeData.set(this.key, this.items);
                var answers = this.items.map(function(item) {
                  return +item.status;
                });
                var postData = {
                  "patientMobile": window.info.familyMobile,
                  "quizAnswers": {
                      "quizId": 3,
                      "answers": answers
                  }
                };
                this.$http.post(this.url, postData)
                .then((response) => {
                  var data = response.body;
                  if(data.code === 0) {
                    this.$router.push("GeneTested");
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
    padding-bottom: 2.3rem;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }
  #environment-question {
    height: 100%;
    position: relative;
    word-break: break-all;
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
    border-radius: 8px;
    padding: 0 .15rem;
  }
  li .p-wrap {
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
        /*padding: 0 .15rem;*/
    color: #5a7193;
  }
  li label:hover, li label:active {
    background: #f2f2f2;
  }
    li label input, li label span {
    display: inline-block;
    vertical-align: middle;
  }
</style>
