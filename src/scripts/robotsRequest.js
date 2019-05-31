/* eslint-disable */
const axios = require('axios')
export async function getRobots(txtInput) {
   try {
      //Getting the target html body
      const response = await axios.get(`http://${txtInput}/robots.txt`)
      return(response)
   } catch (error) {
      return(error)
   }
}
