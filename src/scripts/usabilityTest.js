/* eslint-disable */

const cheerio = require('cheerio')
import { setScore } from '../scripts/scores'

export function getUsabilityTest(response, txtInput) {
   try {
      const $ = cheerio.load(response.data)
      const data = {
                     ...getUrlCheck(txtInput),
                     ...getFavIconCheck($),
                     ...getLanguageCheck($),
                     ...getDC($)
                   }
      return(data)
   } catch (error) {
      return(error)
   }
}

const getUrlCheck = txtInput => {
   const urlCheckBlock = {}
   urlCheckBlock.urlName = txtInput
   urlCheckBlock.urlLength = txtInput.split('').length
   return urlCheckBlock
}

const getFavIconCheck = $ => {
   let score = false
   const favIconBlock = {}
   favIconBlock.favIconCheck = 'Your website has no favicon'
   $('link').each((i, elem)=>{
      if($(elem).attr('rel')==='icon' || $(elem).attr('rel')==='shortcut icon'){
         favIconBlock.favIconCheck = 'Great! Your website has a favicon'
         score = true
      }
   })
   if (score) {
      setScore(4.67)
   }
   return favIconBlock
}

const getLanguageCheck = $ => {
   let score = false
   const languageCheckBlock = {}
   languageCheckBlock.languageCheck = 'You have not specified the language.'
   $('div').each((i, elem)=>{
      if($(elem).attr('lang') || $('html').attr('lang')){
         languageCheckBlock.languageCheck = 'Good you specified language'
         score = true
      }
   })
   if (score) {
      setScore(4.67)
   }
   return languageCheckBlock
}

const getDC = $ => {
   let score = false
   const dcBlock = {}
   dcBlock.DCcheck = 'This page does not take advantage of Dublin Core.'
   $('meta').each((i, elem)=>{
      if($(elem).attr('name')==='DC.Format'){
         dcBlock.DCcheck = 'This page takes advantage of Dublin Core.'
         score = true
      }
   })
   if (score) {
      setScore(4.67)
   }
   return dcBlock
}
