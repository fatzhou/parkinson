<template>
  <div class="wrap">
    <div id="family-member">
      <h1>帕金森高危人群问卷</h1>
      <div class="split"></div>

      <InfoType v-if="loginType" :items="items.slice(0,5)"></InfoType>
      <InfoType v-else :items="items.slice(0,4)"></InfoType>

      <div class="verify-code">
        <input type="text" v-model="verifyCode" placeholder="请输入验证码"/>
        <div :class="{'code-button':true, 'code-time':isTiming}" @click="getVerifyCode">
          {{this.verifyCodeWord}}
        </div>
      </div>

      <InfoType v-if="loginType" class="bottom-padding" :items="items.slice(5)"></InfoType>
      <InfoType v-else class="bottom-padding" :items="items.slice(4)"></InfoType>
    </div>

    <div v-if="loginType" class="function-area">
       <div class="back-button confirm-button" @click="goBack">上一部分</div>
       <div class="next-button button" @click="goNext">保存并开始答题</div>
    </div>

    <div v-else class="function-area">
       <div class="confirm-button" @click="goNext">保存并开始答题</div>
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
            url: util.api.patient.host + util.api.patient.FamilyMember.url,
            verifyCodeUrl: util.api.patient.host + util.api.patient.FamilyMember.verifyCodeUrl,
            verifyCode: '',
            verifyCodeWord: '获取验证码',
            verifyCodeCount: 0,
            startCountTime: 0,
            totalCount: 300,
            dialog: false,
            isTiming: false,
            key: 'FamilyMember',
            itemList: FamilyMember.items,
            info: {
              doctorMobile: '',
              patientMobile: '',
              familyMobile: ''
            }
          }
      },
      props: ['loginInfo'],
      computed: {
        loginType: function() {
          return this.loginInfo.type === 'patient';
        },
        items: function() {
          return this.loginType ? this.itemList : this.itemList.slice(1);
        }
      },
      mounted() {
        this.setVisibilityToggle(FamilyMember.eventBinded);

        // util.storeData.get('info', this, 'info');
        // if(!this.info || !this.info.doctorMobile) {
        //     this.$router.push("Login");
        //     // location.href = '/';
        //   }
        // util.storeData.get(this.key, this.items);
      },
      beforeDestory() {
        this.clearVisibilityToggle();
      },
      methods: {
        visibilityChange(e) {
          //计算真实时间差
          if(this.isTiming) {
            var delta = Date.now() - this.startCountTime;
            console.log(delta)
            //已超时
            if(delta > this.totalCount * 1000) {
              this.isTiming = false;
              this.verifyCodeWord = '获取验证码';
              this.verifyCodeCount = 0;
            } else {
              //尚未超时
              this.verifyCodeCount = Math.round(delta / 1000);
            }
          }
        },
        setVisibilityToggle(e) {
          if(!FamilyMember.eventBinded) {
            document.addEventListener('visibilitychange', this.visibilityChange);
          }
          FamilyMember.eventBinded = true;
        },
        clearVisibilityToggle() {
          console.log(3)
          document.removeEventListener('visibilitychange', this.visibilityChange);
        },
        getVerifyCode() {
          var number = this.items.filter(function(item){
            return item.id === 'mobile';
          })[0].status,
              verifyNode = $('#mobile').get(0);
          if(!number) {
            myAlert('请先填写手机号码');
            verifyNode.scrollIntoView(true);
            return false;
          } else if(!util.validator.telephone(number)) {
            myAlert('请填写正确的手机号码');
            verifyNode.scrollIntoView(true);
            return false;
          }

          if(this.verifyCodeCount > 0) {
            return false;
          }

          var postData = {
              "mobile": number,
              "countryCode":"86"
          };
          var self = this;
          var timerCb = function() {
               self.verifyCodeCount--;
              if(self.verifyCodeCount > 0) {
                self.verifyCodeWord = self.verifyCodeCount + 's';
                setTimeout(timerCb, 1000);
              } else {
                self.isTiming = false;
                self.verifyCodeWord = '获取验证码';
              }
          }
          this.$http.post(this.verifyCodeUrl, postData)
          .then((response) => {
            this.verifyCodeCount = this.totalCount + 1;
            this.isTiming = true;
            this.startCountTime = Date.now();
            setTimeout(timerCb, 0);
          })
          .catch(function(response) {
            myAlert('您当前网络出现故障，请稍后再试');
          });
        },
        goBack() {
          this.saveData();
          this.$router.push("DrugStatus");
        },
        goNext() {
          console.log(this.items)
          var flag = util.checkForm(this.items);
          if(flag && !this.verifyCode) {
            $('.verify-code').get(0).scrollIntoView(true);
            myAlert('请输入验证码');
            flag = false;
          }
          if(flag) {
            this.saveData();
            var items = this.items;

            var family = {
              smsCode: this.verifyCode,
            };

            ["relation","mobile","name","birthday","sex","mobile2","history","email"].forEach(function(item) {
               var value = items.filter((i)=>{
                 return i.id === item;
               });
               if(value.length && value[0].status) {
                family[item] = value[0].status;
               }
            });
            // family.relation = 2;
            // var family = {
            //     "mobile": window.info.familyMobile,
            //     "name": util.filteremoji(items[1].status),
            //     "birthday": items[3].status,
            //     "sex": parseInt(items[2].status),
            //     "smsCode": this.verifyCode
            // };

            // items[5].status && (family.mobile2 = items[5].status);
            // items[9].status && (family.history = util.filteremoji(items[9].status) || ' ');
            // items[6].status && (family.email = items[6].status);
            var homePlace = items.filter((i)=>{
                  return i.id === 'native';
                }),
                livePlace = items.filter((i)=>{
                  return i.id === 'home';
                });

            if(homePlace[0].status) {
              var home = homePlace[0].status.replace(/\s+/,'#').split('#') || [];
              family.homeProvince = home[0];
              family.homeCity = home[1];
            }
            if(livePlace[0].status) {
              var home = livePlace[0].status.replace(/\s+/,'#').split('#')|| [];
              family.liveProvince = home[0];
              family.liveCity = home[1];
            }

            var postData = {
              "doctorMobile": window.info.doctorMobile,
              "patientMobile": window.info.familyMobile,
              "family": family
            };
            console.log(postData)
            this.$http.post(this.url, postData)
            .then((response) => {
              console.log(response)
              var data = response.body;
              if(data.code === 0) {
                this.saveData();
                // this.dialog = true;
                this.$router.push('EnvironmentQuestion');
              } else if(data.code === 109) {
                myAlert('您的验证码已过期，请重新获取');
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
            window.info.familyMobile = this.items.filter(function(it) {
              return it.id === 'mobile'
            })[0].status;
            // util.storeData.set(this.key, this.items);
            // util.storeData.set('info', this, 'info');
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
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
