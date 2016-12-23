<template>
  <ul>
    <li v-for="item in items">
      <div class="label-wrap" v-if="item.type==1||item.type==2">
        <img :src="item.logo" alt="">
        <label class="label" for="">
            {{item.question}}
            <input type="text" v-model="item.status" :placeholder="item.default"  :name="item.id" :id="item.id">
            <span v-if="!item.notneed">*</span>
          </label>
      </div>
      <div class="label-wrap" v-else-if="item.type==3">
        <img :src="item.logo" alt="">
        <label class="label" for="">
          {{item.question}}
          <div class="label-radio">
            <label v-for="i in item.options">
              <input type="radio" v-model="item.status" :value="i[1]"  :name="item.id" >
              {{i[0]}}
            </label>
          </div>
          <span v-if="!item.notneed">*</span>
        </label>
      </div>
      <div class="label-wrap" v-else-if="item.type==4">
        <img :src="item.logo" alt="">
        <label class="label" for="">
          {{item.question}}
          <input type="text" v-model="item.status"   :placeholder="item.default" :id="item.id">
          <input type="hidden" :id="item.areaId" v-model="item.hiddenValue">
          <span v-if="!item.notneed">*</span>
        </label>
      </div>
      <div class="label-wrap" v-else-if="item.type==5">
        <img :src="item.logo" alt="">
        <i class="little-line"></i>
        <div class="textarea-wrap">
          <label class="label" for="">
            {{item.question}}
            <span v-if="!item.notneed">*</span>
          </label>
          <div class="">
            <textarea name="" v-model="item.status" :id="item.id" rows="3" :placeholder="item.placeholder">
            </textarea>
          </div>
          <p>{{item.status.length}}/300</p>
        </div>
      </div>

      <div class="label-wrap" v-else-if="item.type == 6">
        <img :src="item.logo" alt="">
        <i class="little-line"></i>
        <div class="textarea-wrap">
          <label class="label" for="">
            {{item.question}}
            <span v-if="!item.notneed">*</span>
          </label>
          <div class="radio-wrap">
             <label class="new-label" v-for="i in item.options">
               <input type="radio" v-model="item.status" :value="i[1]"  :name="item.id">
               {{i[0]}}
             </label>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
    export default {
      name: 'InfoType',
      data() {
          return {

          }
      },
      props: ['items'],
      methods: {
         getDate() {
            var myDate = new Date();
            var year = myDate.getFullYear(),
                month = ('00' + (myDate.getMonth() + 1)).slice(-2),
                day = ('00' + myDate.getDate()).slice(-2);
            return [year, month, day].join('/');
         }
      },
      mounted: function() {
        var self = this;
        var data = require('../../static/js/province.js');
        this.items.filter(function(item) {
          return item.type == 4;
        }).forEach(function(item, index) {
            var selectArea = new MobileSelectArea();
            selectArea.init({trigger:'#'+item.id,level:2,data:data.data,value:item.hiddenValue,position:"bottom",callback: function(a,b,c) {
              item.status = b;
            }});
        });

        this.items.filter(function(item) {
          return item.type == 2;
        }).forEach(function(item, index) {
            var selectDate = new MobileSelectDate();
            selectDate.init({trigger:'#'+item.id,min:'1900/01/01',max:self.getDate(),position:"bottom",callback:function(scroller,value){
              item.status = value;
            }});
        });
      }
    }
</script>

<style scoped>
  ul {
    padding-left: .5rem;
    line-height: 1;
    margin-top: .2rem;
    font-size: .42rem;
  }
  li {
    border-bottom: 1px solid #c5cbd3;
  }
  li:last-child {
    border:none;
  }
  li .label-wrap {
    display: -webkit-box;
    position: relative;
  }
  li img {
    display: inline-block;
    width: .6rem;
    margin-top: .43rem;
    margin-right: .5rem;
  }

  li .label {
    display: block;
    padding: .52rem 0;
    vertical-align: middle;
    -webkit-box-flex: 1;
    line-height: 1;
    position: relative;
  }
  li span {
    color: red;
    display: inline-block;
    position: absolute;
    right: 0;
    margin-top: .1rem;
    text-align: center;
    width: .7rem;
  }
  li input[type="text"] {
    display: inline-block;
    width: 4rem;
    position: absolute;
    right: .7rem;
    height: .42rem;
    line-height: .42rem;
    margin-top: -.05rem;
    text-align: right;
  }
  .label-radio {
    position: absolute;
    right: .7rem;
    top: .42rem;
  }

  .label-radio label{
    margin-right: .15rem;
  }
  .label-radio label:last-child{
    margin-right: 0;
  }
  .little-line {
    position: absolute;
    top: 1.48rem;
    height: 1px;
    width: 100%;
    display: block;
    background: #c5cbd3;
  }
  .textarea-wrap {
    -webkit-box-flex: 1;
    /*padding-right: .7rem;*/
  }
  .textarea-wrap div {
    padding-right: .7rem;
  }
  .border-bottom {
    border-bottom: 1px solid #c5cbd3;
  }

  textarea {
    width: 100%;
    font-size: .36rem;
    line-height: 1.75;
    color: #333;
    margin: .4rem 0;
  }

  .label-wrap p {
    color: #c5cbd3;
    font-size: .32rem;
    text-align: right;
    margin-right: .7rem;
    padding-bottom: .2rem;
  }

  .new-list li {
    border-bottom: none;
    position: relative;
  }

  .new-label {
    display: inline-block;
    border: none;
    width: 50%;
    padding: .15rem 0;
  }

  .radio-wrap {
    padding: .2rem 0;
  }


</style>
<!-- 样式自行设置，或者直接看源码就好 -->
