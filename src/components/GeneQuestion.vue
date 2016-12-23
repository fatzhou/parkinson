<template>
  <div id="gene-question">
    <h1>基因因素</h1>
    <div class="ul-wrap bottom-padding">
      <ul>
        <li v-for="item,index in items">
          <p>{{index+1}}. {{item.question}}？</p>
          <label >
            <input type="radio" :name="prefix+index" value="0">
            是
          </label>
          <label >
            <input type="radio" :name="prefix+index" value="1">
            否
          </label>
          <label >
            <input type="radio" :name="prefix+index" value="2">
            不确定
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
    export default {
        data() {
            return {
              prefix: 'gene-question-',
              items: [
                {
                  question: '您的基因SNCA是否发生A53T,A30PE46KG50D突变'
                },
                {
                  question: '您的基因SNCA是否双倍复制'
                },
                {
                  question: '您的基因SNCA是否为三倍复制'
                },
                {
                  question: '您的基因SNCA是否发生Rep1-CA repeat突变'
                },
                {
                  question: '您的基因SNCA是否发生rs894278, GG+TG突变'
                },
                {
                  question: '您的基因SNCA是否发生rs11931074, TT+TG突变'
                },
                {
                  question: '您的基因SNCA是否发生rs356219,  GG突变'
                },
                {
                  question: '您的基因SNCA是否发生rs356165, AA突变'
                },
                {
                  question: '您的基因Parkin是否为纯合子或复合型杂合子'
                },
                {
                  question: '您的基因PARKIN是否为杂合突变突变'
                },
                {
                  question: '您的基因PINK1是否为纯合子或复合型杂合子突变'
                },
                {
                  question: '您的基因PINK1是否为一种杂合子突变突变'
                },
                {
                  question: '您的基因DJ-1是否为纯合子或复合型杂合子突变'
                },
                {
                  question: '您的基因LRRK2是否为G2019S突变'
                },
                {
                  question: '您的基因LRRK2是否为G2385R, GA+AA突变'
                },
                {
                  question: '您的基因LRRK2是否发生R1628P, CG突变'
                },
                {
                  question: '您的基因LRRK2是否发生R1441CGH, Y1699C,I2020T突变'
                },
                {
                  question: '您的基因GBA是否出现外显子突变点'
                },
                {
                  question: '您的基因GBA是否发生L444P, TC突变'
                },
                {
                  question: '您的家族中是否有一人以上患病'
                },
                {
                  question: '您的基因MAPT是否发生rs356219, GG突变'
                },
                {
                  question: '您的基因MAPT是否发生rs356165, AA突变'
                },
                {
                  question: '您的基因MAPT是否发生rs242562, GG+GA突变'
                },
                {
                  question: '您的基因MAPT是否发生rs2435207, AA突变'
                },
                {
                  question: '您的基因BST1是否发生rs4273468, AG+GG突变'
                },
                {
                  question: '您的基因BST1是否发生rs469412, GG突变'
                },
                {
                  question: '您的基因PARK16是否发生rs823128, AG突变'
                },
                {
                  question: '您的基因PARK16是否发生rs947211, AA突变'
                },
                {
                  question: '您的基因PARK16是否发生rs823156, AG突变'
                },
                {
                  question: '您的基因PARK16是否发生rs823144, AA突变'
                },
                {
                  question: '您的基因GAK是否发生rs11248051CT +TT突变'
                },
              ]
            }
        },
        methods :{
          goBack() {
            $router.push("FamilyMember");
          },
          goNext() {
            $router.push("FinishPage");
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
  }
  li label {
    display: block;
    font-size: .42rem;
    line-height: 1.34rem;
    color: #5a7193;
  }
</style>
