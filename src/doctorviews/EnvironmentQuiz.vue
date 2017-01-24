<template>
  <div class="wrap">
    <div id="environment-question">
      <h1><router-link class="h1link" to="FamilyMember">&lt;</router-link>生活和环境因素</h1>
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

    <div class="confirm-wrap" v-if="genetest">
      <div class="confirm-button" @click="goNext">查看基因调查问卷</div>
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
              url: util.api.doctor.host + util.api.doctor.QueryQuiz,
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
        computed: {
          genetest() {
            return window.info.genetest == 1;
          }
        },
        mounted: function() {
          window.info.familyMobile = window.info.familyMobile || this.$route.params.familyMobile;
          var postData = {
            doctorMobile: window.info.doctorMobile,
            patientMobile: window.info.familyMobile,
            quizId: 3
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
          setStatus(data) {
            this.items.forEach((item, index)=>{
              item.status = data.answers[index];
            })
          },
          goNext() {
            this.$router.push('GeneQuiz');
          }
        },
    }
</script>

<style scoped>
  .wrap {
    height: 100%;
    /*padding-bottom: 2.3rem;*/
/*    position: relative;
    overflow: hidden;
    box-sizing: border-box;*/
  }
  #environment-question {
    /*height: 100%;*/
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
    .h1link {
    position: absolute;
    left: .5rem;
    font-size: .48rem;
    transform: scaleY(2);
    top: .42rem;
    color: #5a7193;
    line-height: 1;
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
    .confirm-wrap {
    padding: .6rem .8rem;
    overflow: hidden;
  }
</style>
