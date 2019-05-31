/* eslint-disable */
const cheerio = require('cheerio')
const arrayCounter = require('array-counter')
import { setScore } from '../scripts/scores'

let frequentWords = []
export function getSeoKeywords(response, htmlparse) {
   try {
      const $ = cheerio.load(response.data)
      const data = {
                     ...getKeywordsCloud($),
                     ...getKeywordsOccured(htmlparse)
                   }
      setScore(14)
      return(data)
   } catch (error) {
      return(error)
   }
}

const getKeywordsCloud = $ => {
   let keyCloudBlock = {}
   let rawText = $('body').text()
   let removeSymbols = rawText.replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?©,.\/]/g, ' ')
   let differTexts = removeSymbols.replace(/(?=[A-Z])/g, ' ')
   const cleanData = differTexts.replace(/[0-9]/g, ' ')
   let removeObsoletesArray = []
   cleanData.split(' ').forEach((elem, i)=>{
      if(elem.length > 1){
         removeObsoletesArray.push(elem)
      }
   })
   const wordCount = Object.entries(arrayCounter(removeObsoletesArray))
   wordCount.forEach(elem => {
      if(elem[1] > 1) {
         keyCloudBlock[elem[0]] = elem[1]
      }
   })
   frequentWords = Object.keys(keyCloudBlock)
   return keyCloudBlock
}

const getKeywordsOccured = data => {
   const occuranceBlock = []
   let headings = ''
   if (data.h1) {
      data.h1.forEach((element) => {
         headings = `${headings} ${element}`
      })
   }
   if (data.h2) {
      data.h2.forEach((element) => {
         headings = `${headings} ${element}`
      })
   }
   if (data.h3) {
      data.h3.forEach((element) => {
         headings = `${headings} ${element}`
      })
   }
   if (data.h4) {
      data.h4.forEach((element) => {
         headings = `${headings} ${element}`
      })
   }
   if (data.h5) {
      data.h5.forEach((element) => {
         headings = `${headings} ${element}`
      })
   }
   if (data.h6) {
      data.h6.forEach((element) => {
         headings = `${headings} ${element}`
      })
   }
   occuranceBlock.title = []
   occuranceBlock.description = []
   occuranceBlock.keywords = []
   occuranceBlock.headings = []
   frequentWords.forEach( element => {
      if(data.title && data.title.includes(element)){
         occuranceBlock.title.push({ [element] : 'occured'})
      }
      if (data.description && data.description.includes(element)) {
         occuranceBlock.description.push({ [element] : 'occured'})
      }
      if (data.keywords && data.keywords.includes(element)) {
         occuranceBlock.keywords.push({ [element] : 'occured'})
      }
      if (headings && headings.includes(element)) {
         occuranceBlock.headings.push({ [element] : 'occured'})
      }
   })
   if (!occuranceBlock.title) {
      occuranceBlock.title = 'nothing occured'
   }
   if (!occuranceBlock.description) {
      occuranceBlock.description = 'nothing occured'
   }
   if (!occuranceBlock.keywords) {
      occuranceBlock.keywords = 'nothing occured'
   }
   if (!occuranceBlock.headings) {
      occuranceBlock.headings = 'nothing occured'
   }
   return occuranceBlock
}
