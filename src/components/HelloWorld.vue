<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input class="input" placeholder="example: netflix.com" v-model="txtInput" type="text">
    <button class="button" v-on:click="insight()" type="button" name="button">Google insight Go!</button>
    <button class="button" v-on:click="cheers()" type="button" name="button">Cheerio extract!</button>
    <h2>HTML PARSE</h2>
    <div class="result">
      {{ htmlParse }}
    </div>
    <h2>LINK PARSE</h2>
    <div class="result">
      {{ linkParse }}
    </div>
    <h2>Doc Check</h2>
    <div class="result">
      {{ docCheck }}
    </div>
    <h2>Usability</h2>
    <div class="result">
      {{ usability }}
    </div>
    <h2>Falsh Check</h2>
    <div class="result">
      {{ flashCheck }}
    </div>
    <h2>SEO keywords</h2>
    <div class="result">
      {{ seoKeywords }}
    </div>
    <h2>Optimizations</h2>
    <div class="result">
      {{ optimization }}
    </div>
    <h2>Score</h2>
    <div class="result">
      Score : {{ score }}
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import { getInsight } from '../scripts/google_page_insights_api'
  import { getHtml } from '../scripts/apiRequest'
  import { getLinkParse } from '../scripts/linkParse'
  import { getHTMLparse } from '../scripts/htmlParse'
  import { getDocCheck } from '../scripts/docCheck'
  import { getUsabilityTest } from '../scripts/usabilityTest'
  import { getSeoKeywords } from '../scripts/seoKeywords'
  import { getMobileCheck } from '../scripts/mobileCheck'
  import { getOptimization } from '../scripts/getOptimization'
  import { setScore, resetScore } from '../scripts/scores'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Web extraction',
        txtInput: '',
        bootUpTime: 'n/a',
        htmlParse:'',
        linkParse:'',
        docCheck:'',
        usability:'',
        flashCheck:'',
        seoKeywords:'',
        optimization:'',
        score: ''
      }
    },
    methods: {
      async insight (){
        const val = await getInsight(this.txtInput)
        this.result = val
      },
      cheers (){
        getHtml(this.txtInput)
          .then(response => {
            resetScore()
            this.htmlParse = getHTMLparse(response)
            this.linkParse = getLinkParse(response)
            this.docCheck = getDocCheck(response)
            this.usability = getUsabilityTest(response, this.txtInput)
            this.flashCheck = getMobileCheck(response)
            this.seoKeywords = getSeoKeywords(response, this.htmlParse)
            this.optimization = getOptimization(response, this.txtInput)
            this.score = Math.ceil(setScore(0,1))
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .hello{
    color: gray;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 100vw;
  }
  .input{
    border-width: 1px;
    width: 80vw;
    height: 50px;
    border-color: #fabc60;
    border-radius: 2px;
    font-size: 25px;
    text-align: center;
    color: gray;
  }
  .button{
    margin-top: 5vh;
    padding: 1vh;
    background-color: #fabc60;
    border-width: 0;
    border-radius: 5px;
  }
  .result{
    margin-top: 10vh;
    width: 80vw;
    max-width: 80vw;
  }
  ::placeholder{
    color: #e9e4e6;
  }
  .result{
    padding-bottom: 5%;
  }
</style>
