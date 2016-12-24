<template>
  <div id="patient-info">
    <h1><router-link class="h1link" to="Login">&lt;</router-link>帕金森患者问卷</h1>
    <div class="split"></div>

    <InfoType :items="items.slice(0,6)"></InfoType>

    <div class="split"></div>

    <InfoType :items="items.slice(6)"></InfoType>

    <div class="split"></div>
    <div class="confirm-wrap">
      <div class="confirm-button" @click="savePatientInfo">保存并进行下一部分</div>
    </div>

  </div>
</template>

<script>
  import InfoType from './InfoType'
<<<<<<< HEAD
  import util from '../../static/js/util.js'
  export default {
      data() {
          return {
            key: 'PatientInfo',
            items: [
              {
                logo: '../static/image/data_icon_name.png',
                question: '真实姓名',
                type: 1,
                status: '',
                id: 'name',
                default: '某某某'
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
                logo: '../static/image/data_icon_born.png',
                question: '性别',
                type: 3,
                status: '',
                id: "sex",
                options: [['男',3], ['女',4]]
              },
              {
                logo: '../static/image/data_icon_born.png',
                question: '手机号码',
                type: 1,
                status: '',
                id: 'tel',
                validate: 'telephone',
                default: '填写'
              },
              {
                logo: '../static/image/data_icon_born.png',
                question: '居住地',
                type: 4,
                status: '',
                id: 'home',
                areaId: 'home-hidden-area',
                hiddenValue: '',
                default: '选择'
              },
              {
                logo: '../static/image/data_icon_born.png',
                question: '籍贯',
                type: 4,
                status: '',
                id: 'native',
                areaId: 'native-hidden-area',
                hiddenValue: '',
                default: '选择'
              },
              {
                logo: '../static/image/data_icon_born.png',
                question: '既往病史',
                type: 5,
                status: '',
                id: 'anamnesis',
                placeholder: '请输入擅长及诊所介绍。请输入擅长及诊所介绍。请输入擅长及诊所介绍。请输入擅长及诊所介绍。请输入擅长及诊所介绍。'
              },
              {
                logo: '../static/image/data_icon_born.png',
                question: '家族是否有人患帕金森病',
                type: 6,
                status: '',
                id: 'familysick',
                options: [['父亲/母亲',1],['兄/弟/姐/妹',2],['祖父母/外祖父母',3],['其他人',4]]
              },
              {
                logo: '../static/image/data_icon_born.png',
                question: '疾病类型',
                type: 6,
                status: '',
                id: 'sicktype',
                options: [['帕金森病',1],['特发性震颤',2],['继发性帕金森综合症',3],['其他类型',4]]
              },
              {
                logo: '../static/image/data_icon_born.png',
                question: '发病时间',
                type: 2,
                status: '',
                id: "sicktime",
                default: '选择'
              },
              {
                logo: '../static/image/data_icon_born.png',
                question: '确诊时间',
                type: 2,
                status: '',
                id: "confirmtime",
                default: '选择'
              },
            ]
          }
      },
      created() {
        util.storeData.get(this.key, this.items);
      },
      methods :{
        savePatientInfo: function() {
          var flag = util.checkForm(this.items);

          if(flag) {
            util.storeData.set(this.key, this.items);
            $router.push("SickStatus");
          }
        }
      },
      components: {InfoType}
  }
</script>

<style scoped>
  #patient-info {
    min-height: 100%;
    color: #5a7193;
  }
  h1 {
    font-size: .54rem;
    text-align: center;
    line-height: 1;
    padding: .42rem 0;
    color: #3c485a;
    position: relative;
  }

  .h1link {
    position: absolute;
    left: .5rem;
    font-size: .42rem;
    transform: scaleY(2);
    top: .42rem;
    color: #5a7193;
  }
  .confirm-wrap {
    padding: .6rem 0;
  }
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
