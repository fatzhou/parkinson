<template>
  <div id="sick-status">
    <h1>一.疾病现状问题</h1>
    <div class="ul-wrap bottom-padding">
      <ul>
        <li v-for="item,index in items">
          <p>{{index+1}}.{{item.question}}？</p>
          <label >
            <input type="radio" :name="prefix+index" value="0" v-model="item.status">
            是
          </label>
          <label >
            <input type="radio" :name="prefix+index" value="1" v-model="item.status">
            否
          </label>
          <label >
            <input type="radio" :name="prefix+index" value="2" v-model="item.status">
            不确定
          </label>
        </li>
      </ul>
    </div>

    <div class="function-area">
       <div class="back-button confirm-button" @click="goBack">上一部分</div>
       <div class="next-button button" @click="goNext">保存并填写药物情况</div>
    </div>
  </div>
</template>

<script>

import util from '../../static/js/util.js'
    export default {
        data() {
            return {
              prefix: 'sick-status-',
              key: 'SickStatus',
              items: [
                {
                  status: '',
                  question: '是否有禁止性震颤',
                },
                {
                  status: '',
                  question: '是否写字越来越小'
                },
                {
                  status: '',
                  question: '是否有慌张步态'
                },
                {
                  status: '',
                  question: '是否面部表情减少（面具脸）'
                },
                {
                  status: '',
                  question: '是否有手部肌肉张力增高'
                },
                {
                  status: '',
                  question: '是否有姿势步态异常'
                },
                {
                  status: '',
                  question: '是否有站立牵拉平衡障碍'
                },
                {
                  status: '',
                  question: '是否有抑郁、淡漠、焦虑'
                },
                {
                  status: '',
                  question: '是否有兴趣缺失'
                },
                {
                  status: '',
                  question: '是否难以集中注意力'
                },
                {
                  status: '',
                  question: '是否会产生幻觉、妄想、错觉'
                },
                {
                  status: '',
                  question: '是否有记忆力下降的情况'
                },
                {
                  status: '',
                  question: '是否有强迫行为(可由药物引起)和重复性行为'
                },
                {
                  status: '',
                  question: '是否有惊恐发作'
                },
                {
                  status: '',
                  question: '是否有不宁腿综合征和周期性肢体运动'
                },
                {
                  status: '',
                  question: '是否出现日间过度嗜睡'
                },
                {
                  status: '',
                  question: '是否有生动梦境'
                },
                {
                  status: '',
                  question: '是否有睡眠呼吸障碍'
                },
                {
                  status: '',
                  question: '是否会失眠'
                },
                {
                  status: '',
                  question: '是否有味觉缺失'
                },
                {
                  status: '',
                  question: '是否有嗅觉障碍'
                },
                {
                  status: '',
                  question: '是否有流涎'
                },
                {
                  status: '',
                  question: '是否有便秘'
                },
                {
                  status: '',
                  question: '是否有小便不尽'
                },
                {
                  status: '',
                  question: '是否有尿频或夜尿增多情况'
                },
                {
                  status: '',
                  question: '您的血压值是多少'
                },
                {
                  status: '',
                  question: '是否有直立性低血压情况（突然站立时血压得急剧下降）'
                },
                {
                  status: '',
                  question: '是否有性功能障碍'
                },
                {
                  status: '',
                  question: '是否有感觉异常（疼痛、疲劳）'
                },
                {
                  status: '',
                  question: '是否有冻结步态'
                },
                {
                  status: '',
                  question: '是否有剂末现象'
                },
                {
                  status: '',
                  question: '是否有开关现象'
                },
                {
                  status: '',
                  question: '是否对多巴胺无反应或延迟“开期”'
                },
                {
                  status: '',
                  question: '是否有药物峰值异动症'
                },
                {
                  status: '',
                  question: '是否有双相异动症'
                },
                {
                  status: '',
                  question: '是否有关期肌张力障碍'
                },
                {
                  status: '',
                  question: '是否做手术DBS'
                },
                {
                  status: '',
                  question: '是否做日常头颈部锻炼'
                },
                {
                  status: '',
                  question: '是否做鼓腮锻炼'
                },
                {
                  status: '',
                  question: '是否做面部动作训练'
                },
                {
                  status: '',
                  question: '是否做语言训练'
                },
                {
                  status: '',
                  question: '是否做步态训练'
                },
                {
                  status: '',
                  question: '是否做躯干训练'
                },
                {
                  status: '',
                  question: '是否做平衡训练'
                }
              ]
            }
        },

        created() {
          util.storeData.get(this.key, this.items);
        },
        methods :{
          goBack() {
            util.storeData.set(this.key, this.items);
            $router.push("PatientInfo");
          },
          goNext() {
            var flag = util.checkForm(this.items);
            if(flag) {
              util.storeData.set(this.key, this.items);
              $router.push("DrugStatus");
            }
          }
        },
    }
</script>

<style scoped>
  #sick-status {
    height: 100%;
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
  }
  li label {
    display: block;
    font-size: .42rem;
    line-height: 1.34rem;
    color: #5a7193;
  }
</style>
