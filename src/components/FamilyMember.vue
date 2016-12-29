<template>
  <div id="family-member">
    <h1>帕金森高危人群问卷</h1>
    <div class="split"></div>
    <InfoType :items="items.slice(0,5)"></InfoType>

    <div class="verify-code">
      <input type="text" v-model="verifyCode" placeholder="请输入验证码"/>
      <div class="code-button" @click="getVerifyCode">
        {{this.verifyCodeWord}}
      </div>
    </div>

    <InfoType class="bottom-padding" :items="items.slice(5)"></InfoType>

    <div class="function-area">
       <div class="back-button confirm-button" @click="goBack">上一部分</div>
       <div class="next-button button" @click="goNext">保存并开始答题</div>
    </div>

    <div class="dialog-select" v-show="dialog">
      <div class="dialog-select-wrap">
        <p class="question">您是否进行过基因检测？</p>
        <div class="button-answer button-answer-yes" @click="goNext1">有<span>（填写基因题目）</span></div>
        <div class="button-answer button-answer-no" @click="goNext2">没有<span>（填写生活和环境因素题）</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import InfoType from './InfoType'
  import util from '../../static/js/util.js'
  import FamilyMember from '../../static/js/config/FamilyMember.js'

  export default {
      data() {
          return {
            url: util.api.host + util.api.FamilyMember.url,
            verifyCodeUrl: util.api.host + util.api.FamilyMember.verifyCodeUrl,
            updateUrl: util.api.host + util.api.FamilyMember.updateUrl,
            verifyCode: '',
            verifyCodeWord: '获取验证码',
            verifyCodeCount: 0,
            dialog: false,
            key: 'FamilyMember',
            items: FamilyMember,
            info: {
              doctorMobile: '',
              patientMobile: '',
              familyMobile: ''
            }
          }
      },
      created() {
        util.storeData.get('info', this, 'info');
        util.storeData.get(this.key, this.items);
      },
      methods: {
        getVerifyCode() {
          var number = this.items[4].status;
          if(!number) {
            alert('请先填写手机号码');
            $('li').get(4).scrollIntoView(true);
            return false;
          } else if(!util.validator.telephone(number)) {
            alert('请填写正确的手机号码');
            $('li').get(4).scrollIntoView(true);
            return false;
          }

          if(this.verifyCodeCount > 0) {
            return false;
          }

          var postData = {
              "mobile": number,
              "countryCode":"86"
          };
          this.$http.post(this.verifyCodeUrl, postData)
          .then((response) => {
            this.verifyCodeCount = 501;
            this.verifyCodeInterval = setInterval(()=>{
              this.verifyCodeCount--;
              if(this.verifyCodeCount > 0) {
                this.verifyCodeWord = this.verifyCodeCount + 's';
              } else {
                this.verifyCodeWord = '获取验证码';
                clearInterval(this.verifyCodeInterval);
              }
            }, 1000);
          })
          .catch(function(response) {
            alert('您当前网络出现故障，请稍后再试');
          });
        },
        goBack() {
          this.saveData();
          $router.push("DrugStatus");
        },
        goNext() {
          var flag = util.checkForm(this.items);
          if(flag && !this.verifyCode) {
            $('.verify-code').get(0).scrollIntoView(true);
            alert('请输入验证码');
            flag = false;
          }
          if(flag) {
            this.saveData();
            var items = this.items;
            var family = {
                "mobile": this.info.familyMobile,
                "relation": items[0].status,
                "name": util.filteremoji(items[1].status),
                "birthday": items[3].status,
                "sex": parseInt(items[2].status),
                "smsCode": this.verifyCode
            };
            items[5].status && (family.mobile2 = items[5].status);
            items[9].status && (family.history = util.filteremoji(items[9].status) || ' ');
            items[6].status && (family.email = items[6].status);
            if(items[7].status) {
              var home = items[7].status.replace(/\s+/,'#').split('#') || [];
              family.homeProvince = home[0];
              family.homeCity = home[1];
            }
            if(items[8].status) {
              var home = items[8].status.replace(/\s+/,'#').split('#')|| [];
              family.liveProvince = home[0];
              family.liveCity = home[1];
            }
            var postData = {
              "doctorMobile": this.info.doctorMobile,
              "patientMobile": this.info.familyMobile,
              "family": family
            };
            console.log(postData)
            this.$http.post(this.url, postData)
            .then((response) => {
              console.log(response)
              var data = response.body;
              if(data.code === 0) {
                this.saveData();
                this.dialog = true;
              } else if(data.code === 109) {
                alert('您的验证码已过期，请重新获取');
              } else {
                alert(data.message);
              }
            })
            .catch(function(response) {
              alert('您当前网络出现故障，请稍后再试');
            });
          }
        },
        goNext1() {
          this.updateFamilyInfo(1, function() {
            $router.push("GeneQUestion");
          })
        },
        goNext2() {
          this.updateFamilyInfo(1, function() {
            $router.push("EnvironmentQuestion");
          })
        },
        updateFamilyInfo(genetest, callback) {
            var postData = {
              "patientMobile": this.info.familyMobile,
              "genetest": genetest
            };
            console.log(postData)
            this.$http.post(this.updateUrl, postData)
            .then((response) => {
              console.log(response)
              var data = response.body;
              if(data.code === 0) {
                callback && callback();
              } else {
                alert(data.message);
              }
            })
        },
        saveData() {
            this.info.familyMobile = this.items[4].status;
            util.storeData.set(this.key, this.items);
            util.storeData.set('info', this, 'info');
        }
      },
      components: {InfoType}
  }
</script>

<style lang="less" scoped>
  @fontSize: .48rem;
  #family-member {
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
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
