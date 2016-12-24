<template>
  <div id="family-member">
    <h1>帕金森高危人群问卷</h1>
    <div class="split"></div>
    <InfoType :items="items.slice(0,5)"></InfoType>

    <div class="verify-code">
      <input type="text" v-model="verifyCode" placeholder="请输入验证码"/>
      <div class="code-button">
        获取验证码
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
<<<<<<< HEAD
  import util from '../../static/js/util.js'
=======
>>>>>>> 478299a61fa3aa7504db620b933e77a109f933c3
  export default {
      data() {
          return {
            verifyCode: '',
            dialog: false,
<<<<<<< HEAD
            key: 'FamilyMember',
=======
>>>>>>> 478299a61fa3aa7504db620b933e77a109f933c3
            items: [
              {
                logo: '../static/image/data_icon_born.png',
                question: '关系',
                type: 6,
                status: '',
                id: 'relationship',
                options: [['父亲/母亲',1],['兄/弟/姐/妹',2],['祖父母/外祖父母',3],['其他人',4]]
              },
              {
                logo: '../static/image/data_icon_name.png',
                question: '姓名',
                type: 1,
                status: '',
                id: 'name',
                default: '填写'
              },
              {
                logo: '../static/image/data_icon_born.png',
                question: '性别',
                type: 3,
                status: '',
                id: "sex",
                options: [['男',3], ['女',4]]
              },
              {
                logo: '../static/image/data_icon_born.png',
                question: '出生年月',
                type: 2,
                status: '',
                id: "birthday",
                default: '选择'
              },
              {
                logo: '../static/image/data_icon_name.png',
                question: '电话1',
                type: 1,
                status: '',
<<<<<<< HEAD
                validate: 'telephone',
=======
>>>>>>> 478299a61fa3aa7504db620b933e77a109f933c3
                id: 'tel',
                default: '填写'
              },
              {
                logo: '../static/image/data_icon_name.png',
                question: '电话2',
                notneed: true,
                type: 1,
                status: '',
                id: 'tel2',
                default: '选填号码'
              },
              {
                logo: '../static/image/data_icon_name.png',
                question: '邮箱地址',
                notneed: true,
                type: 1,
                status: '',
<<<<<<< HEAD
                validate: 'email',
=======
>>>>>>> 478299a61fa3aa7504db620b933e77a109f933c3
                id: 'email',
                default: '填写'
              },
              {
                logo: '../static/image/data_icon_born.png',
                question: '籍贯',
                notneed: true,
                type: 4,
                status: '',
                id: 'native',
                areaId: 'native-hidden-area',
                hiddenValue: '',
                default: '选择'
              },
              {
                logo: '../static/image/data_icon_born.png',
                question: '居住地',
                notneed: true,
                type: 4,
                status: '',
                id: 'home',
                areaId: 'home-hidden-area',
                hiddenValue: '',
                default: '选择'
              },
              {
                logo: '../static/image/data_icon_born.png',
                question: '家族疾病史',
                notneed: true,
                type: 5,
                status: '',
                id: 'anamnesis',
                placeholder: '请输入擅长及诊所介绍。请输入擅长及诊所介绍。请输入擅长及诊所介绍。请输入擅长及诊所介绍。请输入擅长及诊所介绍。'
              },
            ]
          }
      },
      created() {
        util.storeData.get(this.key, this.items);
      },
      methods :{
        goBack() {
          util.storeData.set(this.key, this.items);
          $router.push("DrugStatus");
        },
        goNext() {
          var flag = util.checkForm(this.items);
          if(!this.verifyCode) {
            flag = false;
            alert('请填写验证码');
          }
          if(flag) {
            util.storeData.set(this.key, this.items);
            this.dialog = true;
        },
        goNext1() {
          $router.push("GeneQUestion");
        },
        goNext2() {
          $router.push("EnvironmentQuestion");
        }
      },
      components: {InfoType}
  }
</script>

<style scoped>
  #family-member {
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
  .verify-code {
    overflow: hidden;
    margin-left: .5rem;
    border-top: 1px solid #f3f3f3;
    border-bottom: 1px solid #f3f3f3;
    padding-right: .7rem;
    font-size: .42rem;
  }
  .verify-code input {
    float: left;
    padding: .52rem 0;
    line-height: 1;
  }
  .code-button {
    float: right;
    color: #fff;
    border-radius: .5rem;
    margin-top: .12rem;
    padding: .4rem .3rem;
    background: #ff9c00;
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
    font-size: .42rem;
    line-height: 1;
    padding: .46rem 0;

  }
  .button-answer {
    color: #fff;
    font-size: .42rem;
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
    line-height: .42rem;
    color: #f3f3f3;
  }
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
