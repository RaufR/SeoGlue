/* eslint-disable */
const axios = require('axios')
//Google page insight
export function getInsight(txtInput, key) {
   try {
      //Making an api call with Google page insight free api
      if (!key){
         //using an personal key here
         key = 'AIzaSyCagUSczYL1vn7qhyO9luVlnEyyoqg3kXs'
      }
      const response = axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${txtInput}&key=${key}`)
      return(response)
   } catch (error) {
      return(error)
  }
}
