<template>
  <div id="PatintList">
    <h1 v-if="!searching">
      <router-link class="h1link" to="PatientAdmin">&lt;</router-link>
      患者列表
      <a href="javascript:;" class="search" @click="searchPatient"></a>
    </h1>
    <h1 v-else>
      <router-link class="h1link" to="PatientAdmin">&lt;</router-link>
      <label class="input-label"><input type="text" v-model="searchValue" placeholder="搜索患者手机号或姓名"></label>
      <label class="confirm-label" @click="startSearch">确定</label>
    </h1>
    <div class="content" v-if="patientList.length>0">
      <ul>
        <li v-for="item in patientList">
          <router-link  :to="{name:'PatientDetail',params:{mobile:item.mobile}}" v-if="type">
            <h3 class="name eps">{{item.name}}</h3>
            <p class="sex-age"><span>性别: {{['','男','女'][item.sex]}}</span><span>年龄: {{new Date().getFullYear() - parseInt(item.birthday.split('-')[0])}}岁</span></p>
            <p class="tel-home"><span>电话: {{item.mobile}}</span><span>籍贯: {{item.homeCity}}</span></p>
            <a href="javascript:;" class="enter"></a>
          </router-link>
          <router-link  :to="{name:'FamilyMember',params:{familyMobile:item.mobile}}" v-else>
            <h3 class="name eps">{{item.name}}</h3>
            <p class="sex-age"><span>性别: {{['','男','女'][item.sex]}}</span><span>年龄: {{new Date().getFullYear() - parseInt(item.birthday.split('-')[0])}}岁</span></p>
            <p class="tel-home"><span>电话: {{item.mobile}}</span><span>籍贯: {{item.homeCity}}</span></p>
            <a href="javascript:;" class="enter"></a>
          </router-link>
        </li>
      </ul>
      <div v-if="more" class="more" @click="getNextPage">
        <p>点击查看更多</p>
      </div>
    </div>
    <div class="content content-position" v-else>
      <div class="content-wrap">
        <img src="../../static/image/choose_icon_default_85.png" alt="">
        <p>未搜到结果</p>
      </div>
    </div>

  </div>
</template>

<script>
  import util from '../../static/js/util.js'
  import myAlert from '../../static/js/alert.js'

  export default {
      data() {
          return {
            url: util.api.doctor.host + util.api.doctor.patientList,
            searching: false,
            searchValue: '',
            patientList: [],
            pageNo: 1,
            pageNum: 20,
            more: false,
            refresh: true,
            type: window.info.patientType == 'patient'
          }
      },
      created() {
        this.getPage();
      },
      methods :{
        goNext() {
          this.$router.push('PatientList');
        },
        searchPatient() {
          // this.getPage();
          // this.searchValue = '';
          this.pageNo = 1;
          this.searching = true;
          this.refresh = true;
        },
        startSearch() {
          this.refresh = true;
          this.getPage();
          // this.searchValue = '';
          this.searching = false;
        },
        getPage() {
          var postData = {
            doctorMobile: window.info.doctorMobile,
            page: this.pageNo,
            pageCount: this.pageNum
          };

          if(this.searchValue) {
            postData.keyword = this.searchValue;
          }

          if(window.info.patientType === 'patient') {
            postData.type = 0;
          } else {
            postData.type = 1;
          }

          this.$http.post(this.url, postData, {
            headers: {'Authorization': 'Bearer ' + window.info.token}
          })
          .then((res)=>{
            var data = res.body;
            if(data.code == 0) {
              if(this.refresh) {
                this.patientList = [].concat(data.data);
              } else {
                this.patientList = this.patientList.concat(data.data);
              }
              this.refresh = false;
              this.more = (data.data.length == this.pageNum);
            } else if(data.code == 3) {
              this.$router.push('Login');
            } else {
              myAlert(data.message);
            }
          });
        },
        getNextPage() {
          this.refresh = false;
          this.pageNo++;
          this.getPage();
        }
      }
  }
</script>

<style scoped>
  #PatintList {
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
    background: #f2f2f2;
  }
  h1 {
    font-size: .54rem;
    text-align: center;
    line-height: 1;
    padding: .42rem 0;
    color: #3c485a;
    position: relative;
    background: #fff;
    height: .68rem;
    line-height: .68rem;
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
  .search {
    position: absolute;
    width: .42rem;
    height: .42rem;
    display: block;
    right: .7rem;
    top: .42rem;
    background: url(../../static/image/list_icon_search.png);
    background-size: 100% 100%;
  }
  .input-label {
    display: block;
    padding: 0 2.0rem 0 1.2rem;
    box-sizing: border-box;
    height: .68rem;
  }
  .input-label input {
    border: 1px solid #ccc;
    border-radius: .4rem;
    display: block;
    width: 100%;
    font-size: .44rem;
    line-height: .68rem;
    height: .68rem;
    background: #f1f1f1;
    color: #999;
    /*text-align: center;*/
    text-indent: .4rem;
  }
  .confirm-label {
    position: absolute;
    right: .6rem;
    top: .42rem;
    font-size: .48rem;
    line-height: .68rem;
  }
  .content {

  }

  .content ul {
    background: #f2f2f2;
    padding: .4rem;
  }

  .content ul li {
    background: #fff;
    border-radius: .2rem;
    margin-bottom: .4rem;
    padding: .2rem .5rem .3rem;
    position: relative;
  }
  .content .name {
    color: #3c485a;
    font-weight: bold;
    font-size: .54rem;
    line-height: 2;
  }
  .content .sex-age, .content .tel-home {
    color: #aaa;
    font-size: .42rem;
    line-height: 1.6;
  }
  .content ul li .enter {
    position: absolute;
    width: .5rem;
    height: .5rem;
    right: .4rem;
    background: url(../../static/image/detail_icon_return.png);
    background-size: 100% 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  .content ul li span:first-child {
    margin-right: .8rem;
  }
  .content-position {
    height: 100%;
    box-sizing: border-box;
    padding-top: 1.52rem;
    position: relative;
  }
  .content-wrap {
    top: 50%;
    transform: translateY(-50%);
    margin-top: -1.52rem;
    position: absolute;
    width: 100%;
  }
  .content-wrap img {
    display: block;
    width: 30%;
    margin: 0 auto;
  }
  .content-wrap p {
    text-align: center;
    white-space: nowrap;
    color: #959fa8;
    font-size: .46rem;
    line-height: 3;
  }
  .more {
    margin-top: -.8rem;
  }
  .more p {
    font-size: .48rem;
    color: #777;
    line-height: 2.5;
    text-align: center;
  }
</style>
<!-- 样式自行设置，或者直接看源码就好 -->
