/* eslint-disable */

const cheerio = require('cheerio')
import { setScore } from '../scripts/scores.js'

export function getDocCheck(response) {
   try {
      const $ = cheerio.load(response.data)
      const data = {
                     ...getDoctype(response),
                     ...getEncoding($),
                     ...getEmailCheck(response),
                     ...getDeprecated($),
                     ...getSpeedTips($, response)
                   }
      return(data)
   } catch (error) {
      return(error)
   }
}

const getDoctype = res => {
   const html5 = /<!doctype html>/
   const html5s = /<!DOCTYPE html>/
   const doctypeBlock = {}
   if (html5.test(res.data) || html5s.test(res.data)) {
     doctypeBlock.Doctype = 'HTML 5'
     setScore(1.56)
   } else {
     doctypeBlock.Doctype = 'Not HTML 5'
   }
   return doctypeBlock
}

const getEncoding = $ => {
   let score = false
   const encodingBlock = {}
   encodingBlock.encoding = 'You are not using UTF=8'
   $('meta').each((i, elem)=>{
      if($(elem).attr('charset')==='utf-8' || $(elem).attr('charset')==='UTF-8'){
         encodingBlock.encoding = 'Perfect. Your declared charset is UTF-8.'
         score = true
      }
   })
   if(score) {
      setScore(1.56)
   }
   return encodingBlock
}

const getEmailCheck = res => {
   const email = /^([a-zA-Z0-9])+@+([a-zA-Z0-9])+(.+[a-zA-Z0-9])$/
   const emailBlock = {}
   if (email.test(res.data)) {
     emailBlock.email = 'Email address has been found in plain text!'
   } else {
     emailBlock.email = 'Great, no email address has been found in plain text!'
     setScore(1.56)
   }
   return emailBlock
}

const getDeprecated = $ => {
   let score = true
   const deprecatedCloud = ['applet', 'basefont', 'center', 'dir', 'font', 'isindex', 'menu', 's', 'strike', 'u']
   const deprecatedBlock = {}
   deprecatedBlock.deprecateStatus = 'We have not found deprecated HTML tags in your HTML'
   deprecatedCloud.forEach((elem, i)=>{
      if($(elem)){
         deprecatedBlock.deprecateStatus = 'We have found deprecated HTML tags in your HTML.'
         score = false
      }
   })
   if (score) {
      setScore(1.56)
   }
   return deprecatedBlock
}

const getSpeedTips = ($, res) => {
   let speedBlock = {}
   if (res.headers['content-encoding'] === 'gzip') {
     speedBlock.gzip = 'Your site is using Gzip'
     setScore(1.56)
   } else {
     speedBlock.gzip = 'Your site is not using Gzip'
   }
   let tableOpen = /<\/table>.*/g
   let tableClose = /<\/table>.*/g
   if (res.data.match(tableOpen) && res.data.match(tableOpen).length === res.data.match(tableClose).length) {
     speedBlock.nestedTables = 'No nested tables'
     setScore(1.56)
   } else {
     speedBlock.nestedTables = 'Nested table exists'
   }
   let style = /style="/g
   if (style.test(res.data)) {
     speedBlock.inlineStyles = 'Bad, you are using inline CSS'
   } else {
     speedBlock.inlineStyles = 'Good, your website is not using inline CSS'
     setScore(1.56)
   }
   let cssLinks = /rel="stylesheet" type="text\/css"/g
   if (res.data.match(cssLinks) && res.data.match(cssLinks).length > 4) {
     speedBlock.cssFiles = 'Too bad, your website has too many CSS files (more than 4).'
   } else {
     speedBlock.cssFiles = 'Good, your website has good amount CSS files'
     setScore(1.56)
   }
   let script = /<script type="text\/javascript"/g
   if (res.data.match(script) && res.data.match(script).length > 6) {
     speedBlock.javaScript = 'Too bad, your website has too many JS files (more than 6).'
   } else {
     speedBlock.javaScript = 'Good, your website has good amount JS files'
     setScore(1.56)
   }
   return speedBlock
}
