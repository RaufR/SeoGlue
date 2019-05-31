/* eslint-disable */

const cheerio = require('cheerio')
const parseUrl = require('parse-url')

import { setScore } from '../scripts/scores'

export function getLinkParse(response) {
   try {
      const $ = cheerio.load(response.data)
      const data = {
                     ...getUrlRewrite(getLinks($)),
                     ...getLinkCategories(getLinks($),$),
                     ...getUnderScoreCheck(getLinks($))
                   }
      return(data)
   } catch (error) {
      return(error)
   }
}

const getLinks = $ => {
   const links = []
   $('a').each((i, elem)=>{
      links.push($(elem).attr('href'))
   })
   return links
}

//this one has issue
const getUrlRewrite = links => {
   let queryExist = false
   let friendlyUrl = 'friendly'
   const urlRewriteBlock = {}
   try{
      links.forEach((elem, i)=>{
         ((parseUrl(elem).query).length===0) ? friendlyUrl : queryExist = true
      })
      if (queryExist) {
        urlRewriteBlock.urlRewrite = 'Your links are using query string'
      } else {
        urlRewriteBlock.urlRewrite = 'Your links are friendly'
        setScore(7)
      }
   }catch (error) {
      urlRewriteBlock.urlRewrite = 'Can not search for query strings in your webpage'
   }
   return urlRewriteBlock
}

const getLinkCategories = (links, $) => {
   let out = /(www|http:|https:)+[^\s]+[\w]/
   let outLink = []
   let noFollow = []
   let doFollow = []
   let insideLink = []
   let hashLink = []

   $('a').each((i, elem) => {
      let thelink = $(elem).attr('href')
      if (out.test(thelink)) {
         if ($(elem).attr('rel') && $(elem).attr('rel')==='nofollow') {
            noFollow.push(thelink)
         } else {
            doFollow.push(thelink)
         }
      }
   })
   links.forEach((elem, i)=>{
      let arr = []
      if (elem) {
         arr = elem.split('')
      } else {
         arr[0] = 0
      }
      if(out.test(elem)){
         outLink.push(elem)
      }else if(arr[0]==='/' && arr.length>1){
         insideLink.push(elem)
      }else if(arr[0]==='#' && arr.length>1){
         hashLink.push(elem)
      }
   })

   const unique_outLink = [...new Set(outLink)]
   const unique_noFollow = [...new Set(noFollow)]
   const unique_doFollow = [...new Set(doFollow)]
   const unique_insideLink = [...new Set(insideLink)]
   const unique_hashLink = [...new Set(hashLink)]

   const totalLinks = unique_outLink.length + unique_insideLink.length + unique_hashLink.length
   const insideLinks = `${Math.ceil((unique_insideLink.length + unique_hashLink.length)/totalLinks*100)}%`
   const noFollowLinks = `${Math.floor(unique_noFollow.length/totalLinks*100)}%`
   const doFollowLinks = `${Math.floor(unique_doFollow.length/totalLinks*100)}%`
   const linkData = {
      OutLinks : unique_outLink,
      InsideLinks : unique_insideLink,
      hashLinks : unique_hashLink,
      juice : `Inside links: ${insideLinks} No follow links: ${noFollowLinks} Do follow links: ${doFollowLinks}`
   }
   return linkData
}

const getUnderScoreCheck = links => {
   const underScoreBlock = {}
   let check = false
   links.forEach((elem, i)=>{
      let arr = []
      if (elem) {
         arr = elem.split('')
      } else {
         arr[0] = 0
      }
      arr.forEach((element, j)=>{
         if(element==='_'){
            check = true
         }
      })
   })
   if (check) {
     underScoreBlock.underScoreCheck = 'We have detected underscores in your URLs'
   } else {
     underScoreBlock.underScoreCheck = 'Great! no underscores in your URLs'
     setScore(7)
   }
   return underScoreBlock
}
