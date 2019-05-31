/* eslint-disable */
const cheerio = require('cheerio')
const axios = require('axios')

import { getRobots } from '../scripts/robotsRequest'
import { setScore } from '../scripts/scores'

export function getOptimization (response, txtInput) {
   let data = {}
   data.sitemap = {
      'links' : 'No sitemap links'
   }
   data.robots = `Robots.txt not found`
   data.sitemap = `Sitemap not found`
   getRobots(txtInput)
         .then( response => {
            if (response && response.status===200) {
               data.robots = `Robots.txt exist`
               setScore(4.65)
               let sitemap = /Sitemap: ([^\r\n]*)/g
               if (response.data && sitemap.test(response.data)) {
                  setScore(4.65)
               }
               const sitemapXML = response.data.match(sitemap)
               data.sitemap = {
                  'links' : sitemapXML
               }
            }
         })
   data.analytics = {
      ...checkAnalytics(response)
   }
   return data
}

const checkAnalytics = res => {
   let analyticsBlock = {}
   let gtag = /gtag.js/g
   let analyticsjs = /analytics.js/g
   let ga = /ga.js/g
   if (gtag.test(res.data) || analyticsjs.test(res.data) || ga.test(res.data)) {
     analyticsBlock.analytics = `You have google analytics enabled`
     setScore(4.65)
   } else {
     analyticsBlock.analytics = `You don't have google analytics enabled`
   }
   return analyticsBlock
}
