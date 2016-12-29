<template>
  <div id="gene-question">
    <h1>基因因素</h1>
    <div class="ul-wrap bottom-padding">
      <ul>
        <li v-for="item,index in items">
          <p>{{index+1}}. {{item.question}}？</p>
          <label >
            <input type="radio" :name="prefix+index" value="1" v-model="item.status">
            <span>是</span>
          </label>
          <label >
            <input type="radio" :name="prefix+index" value="2" v-model="item.status">
            <span>否</span>
          </label>
          <label >
            <input type="radio" :name="prefix+index" value="3" v-model="item.status">
            <span>不确定</span>
          </label>
        </li>
      </ul>
    </div>

    <div class="function-area">
       <div class="back-button confirm-button" @click="goBack">上一部分</div>
       <div class="next-button button" @click="goNext">保存并提交</div>
    </div>
  </div>
</template>

<script>
    import util from '../../static/js/util.js'
    import GeneQuestion from '../../static/js/config/GeneQuestion.js'
    export default {
        data() {
            return {
              key: 'GeneQuestion',
              prefix: 'gene-question-',
              items: GeneQuestion,
              url: util.api.host + util.api.SickStatus.url,
            }
        },
        created() {
          util.storeData.get(this.key, this.items);
          util.storeData.get('info', this, 'info');
          if(!this.info || !this.info.doctorMobile || !this.info.patientMobile || !this.info.familyMobile) {
            if(window.$router) {
              $router.push("Login");
            } else {
              location.href = '/';
            }
          }
        },
        methods :{
          goBack() {
            util.storeData.set(this.key, this.items);
            $router.push("FamilyMember");
          },
          goNext() {
            var flag = util.checkForm(this.items, 'status' ,2);
            if(flag) {
              util.storeData.set(this.key, this.items);
              var answers = this.items.map(function(item) {
                return +item.status;
              });
              var postData = {
                "patientMobile": this.info.familyMobile,
                "quizAnswers": {
                    "quizId": 2,
                    "answers": answers
                }
              };
              this.$http.post(this.url, postData)
              .then((response) => {
                var data = response.body;
                console.log(response, data)
                if(data.code === 0) {
                  $router.push("FinishPage");
                } else {
                  alert(data.message);
                }
              })
              .catch(function(response) {
                alert('您当前网络出现故障，请稍后再试');
              });
            }
          }
        },
    }
</script>

<style scoped>
  #gene-question {
    min-height: 100%;
    position: relative;
    word-break: break-all;
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
  li p {
    font-size: .48rem;
    line-height: 1.48rem;
    border-bottom: 1px solid #c5cbd3;
    color: #3c485a;
    /*padding: 0 .15rem;*/
  }
  li label {
    display: block;
    font-size: .42rem;
    line-height: 1.34rem;
    color: #5a7193;
    /*padding: 0 .15rem;*/
  }
  li label:hover, li label:active {
    background: #f2f2f2;
  }
  li label input, li label span {
    display: inline-block;
    vertical-align: middle;
  }
</style>
