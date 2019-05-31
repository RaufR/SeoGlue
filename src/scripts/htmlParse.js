/* eslint-disable */
//this scripts output html parse data section which is following meistertask(https://www.meistertask.com/app/task/bjEYS0kw/html-parse)

const cheerio = require('cheerio')
import { setScore } from '../scripts/scores'
export function getHTMLparse(response) {
   try {
      const $ = cheerio.load(response.data)
      const data = {
                     ...getTitle($),
                     ...getDescription($),
                     ...getKeywords($),
                     ...getOg($),
                     ...getHeadings($),
                     ...getImageCheck($),
                     ...getFlashCheck($),
                     ...getIframeCheck($)
                   }
      return(data)
   } catch (error) {
      return(error)
   }
}

const getTitle = $ => {
   const titleBlock = {}
   titleBlock.title = $('title').text()
   const titleLength = titleBlock.title.length
   console.log(titleBlock.title.length)
   titleBlock.titleLength = `Length : ${titleLength}`
   if (titleBlock.title.length>10 && titleBlock.title.length<70) {
      titleBlock.titleComment = 'Perfect, your title contains between 10 and 70 characters.'
      setScore(2)
   } else {
      titleBlock.titleComment = 'Bad, your title does not contain between 10 and 70 characters.'
   }
   return titleBlock
}

const getDescription = $ => {
   const desBlock = {}
   desBlock.description = $('meta[name="description"]').attr('content')
   if(desBlock.description){
      const desLength = desBlock.description.length
      desBlock.desLength = `Length : ${desLength}`
      if (desLength>70 && desLength<160) {
        desBlock.descriptionComment = 'Great, your meta description contains between 70 and 160 characters.'
        setScore(2)
      } else {
        desBlock.descriptionComment = 'Poor, your meta description does not contain between 70 and 160 characters.'
      }

   }
   return desBlock
}

const getKeywords = $ => {
   const keyBlock = {}
   keyBlock.keywords = $('meta[name="keywords"]').attr('content');
    if (keyBlock.keywords) {
      keyBlock.keyComment = 'Good, your page contains meta keywords.'
      setScore(2)
    } else {
      keyBlock.keyComment = 'Bad, your page does not contain meta keywords.'
    }
   return keyBlock
}

const getOg = $ => {
   let score = true
   const ogBlock = {}
   if ($('meta[property="og:title"]').attr('content')) {
     ogBlock.ogCheck = 'og meta properties exist'
     setScore(2)
   } else {
     ogBlock.ogCheck = 'This page does not take advantage of og properties'
   }
   return ogBlock
}

const getImageCheck = $ => {
   let score = true
   const imageCheck = {}
   let imageCount = 0
   let noImageAlt = 0
   $('img').each((i, elem)=>{
      imageCount += 1
      if(!$(elem).attr('alt')){
         noImageAlt += 1
      }
   })
   imageCheck.imageCount = `you are using ${imageCount} images in your site`
    if (noImageAlt>1) {
      imageCheck.altAlert = `you are not using any alternative attribute for ${noImageAlt} images in your site`
    } else {
      imageCheck.altAlert = `you are using alternative attributes for all images in your site`
      setScore(2)
    }
   return imageCheck
}

const getFlashCheck = $ => {
   const flashBlock = {}
   if ($('embed').attr('src')) {
     flashBlock.flashCheck = 'your site is using flash'
   } else {
     flashBlock.flashCheck = 'your site is not using flash'
     setScore(2)
   }
   return flashBlock
}

const getIframeCheck = $ => {
   const iframeBlock = {}
   if ($('iframe').attr('src')){
      iframeBlock.iframeCheck = 'your site is using iframe'
   } else {
     iframeBlock.iframeCheck = 'your site is not using iframe'
     setScore(2)
   }
   return iframeBlock
}

const getHeadings = $ => {
   const headBlock = {}
   headBlock.h1 = []
   $('h1').each((i, elem)=>{
      headBlock.h1[i] = ($(elem).text())
   })
   headBlock.h2 = []
   $('h2').each((i, elem)=>{
      headBlock.h2[i] = ($(elem).text())
   })
   headBlock.h3 = []
   $('h3').each((i, elem)=>{
      headBlock.h3[i] = ($(elem).text())
   })
   headBlock.h4 = []
   $('h4').each((i, elem)=>{
      headBlock.h4[i] = ($(elem).text())
   })
   headBlock.h5 = []
   $('h5').each((i, elem)=>{
      headBlock.h5[i] = ($(elem).text())
   })
   headBlock.h6 = []
   $('h6').each((i, elem)=>{
      headBlock.h6[i] = ($(elem).text())
   })
   headBlock.h1Length = headBlock.h1.length
   headBlock.h2Length = headBlock.h2.length
   headBlock.h3Length = headBlock.h3.length
   headBlock.h4Length = headBlock.h4.length
   headBlock.h5Length = headBlock.h5.length
   headBlock.h6Length = headBlock.h6.length
   return headBlock
}
