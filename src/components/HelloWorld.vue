<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ warning }}</p>
    <input class="input" placeholder="example: netflix.com" v-model="txtInput" type="text" />
    <!--- <button class="button" v-on:click="insight()" type="button" name="button">Google insight Go!</button> -->
    <button class="button" v-on:click="cheers()" type="button" name="button">Cheerio extract!</button>
    <ScoreChart></ScoreChart>

    <h2>Score</h2>
    <div>Total score :{{ score }}</div>
    <div class="result">
      <h2>Title:</h2>
      {{ htmlParse.title }}
    </div>
    <h2>LINK PARSE</h2>
    <div class="result"> <pre><code> {{ linkParse }} </code></pre></div>
    <h2>Doc Check</h2>
    <div class="result"><pre><code>{{ docCheck }}</code></pre></div>
    <h2>Usability</h2>
    <div class="result"><pre><code>{{ usability }}</code></pre></div>
    <h2>Falsh Check</h2>
    <div class="result"><pre><code>{{ flashCheck }}</code></pre></div>
    <h2>SEO keywords</h2>
    <div class="result"><pre><code>{{ seoKeywords }}</code></pre></div>
    <h2>Optimizations</h2>
    <div class="result"><pre><code>{{ optimization }}</code></pre></div>
  </div>
</template>

<script>
/* eslint-disable */
import { getInsight } from "../scripts/google_page_insights_api";
import { getHtml } from "../scripts/apiRequest";
import { getLinkParse } from "../scripts/linkParse";
import { getHTMLparse } from "../scripts/htmlParse";
import { getDocCheck } from "../scripts/docCheck";
import { getUsabilityTest } from "../scripts/usabilityTest";
import { getSeoKeywords } from "../scripts/seoKeywords";
import { getMobileCheck } from "../scripts/mobileCheck";
import { getOptimization } from "../scripts/getOptimization";
import { setScore, resetScore } from "../scripts/scores";
import ApexCharts from "apexcharts";
import VueApexCharts from "vue-apexcharts";
import ScoreChart from "./ScoreChart";

export default {
  name: "HelloWorld",
  props: ["score"],

  data() {
    return {
      msg: "Web extraction",
      warning: "Please remove http:// or https:// before the siteURL",
      txtInput: "",
      bootUpTime: "n/a",
      htmlParse: "",
      linkParse: "",
      docCheck: "",
      usability: "",
      flashCheck: "",
      seoKeywords: "",
      optimization: "",
      score: ""
    };
  },
  methods: {
    async insight() {
      const val = await getInsight(this.txtInput);
      this.result = val;
    },
    cheers() {
      getHtml(this.txtInput)
        .then(response => {
          resetScore();
          this.htmlParse = getHTMLparse(response);
          this.linkParse = getLinkParse(response);
          this.docCheck = getDocCheck(response);
          this.usability = getUsabilityTest(response, this.txtInput);
          this.flashCheck = getMobileCheck(response);
          this.seoKeywords = getSeoKeywords(response, this.htmlParse);
          this.optimization = getOptimization(response, this.txtInput);
          this.score = Math.ceil(setScore(0, 1));
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: bold;
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
.hello {
  color: gray;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100vw;
}
.input {
  border-width: 1px;
  width: 80vw;
  height: 50px;
  border-color: #fabc60;
  border-radius: 2px;
  font-size: 25px;
  text-align: center;
  color: gray;
}
.button {
  margin-top: 5vh;
  position: relative;
  background-color: #04AA6D;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  color: #FFFFFF;
  padding: 1vh;
  width: 10vw;
  text-align: center;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}
.button:after {
  content: "";
  background: #90EE90;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px!important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}
.button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}
.result {
  margin-bottom: 10vh;
  width: 80vw;
  max-width: 80vw;
}
.result_score {
  font-weight: bold;
}
::placeholder {
  color: #e9e4e6;
}
</style>
