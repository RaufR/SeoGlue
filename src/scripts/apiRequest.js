/* eslint-disable */
const axios = require('axios')
export async function getHtml(txtInput) {
   try {
      //Getting the target html body
      const response = await axios.get(`http://${txtInput}`)
      return(response)
   } catch (error) {
      return(error)
   }
}

//:todo: fix with https and http.
