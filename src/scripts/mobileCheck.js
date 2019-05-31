/* eslint-disable */

const cheerio = require('cheerio')
import { setScore } from '../scripts/scores'

export function getMobileCheck(response) {
   try {
      const $ = cheerio.load(response.data)
      const data = {
                     ...getAppleIcon($),
                     ...getViewPortTag($),
                     ...getFlashContent($)
                   }
      return(data)
   } catch (error) {
      return(error)
   }
}

const getAppleIcon = $ => {
   let score = false
   const appleIconBlock = {}
   appleIconBlock.appleIcon = 'No apple icon found'
   $('link').each((i, elem)=>{
      if($(elem).attr('rel')==='apple-touch-icon'){
         appleIconBlock.appleIcon = 'Great! Apple icon exists'
         score = true
      }
   })
   if (score) {
      setScore(4.67)
   }
   return appleIconBlock
}

const getViewPortTag = $ => {
   let score = false
   const viewPortBlock = {}
   viewPortBlock.viewPort = 'No meta viewport tag found'
   $('meta').each((i, elem)=>{
      if($(elem).attr('name')==='viewport'){
         viewPortBlock.viewPort = 'Great! Meta viewport tag exists'
         score = true
      }
   })
   if (score) {
      setScore(4.67)
   }
   return viewPortBlock
}

const getFlashContent = $ => {
   const flashBlock = {}
   if ($('embed').attr('src')) {
     flashBlock.flashCheck = 'your site is using flash'
   } else {
     flashBlock.flashCheck = 'your site is not using flash'
     setScore(4.67)
   }
   return flashBlock
}
