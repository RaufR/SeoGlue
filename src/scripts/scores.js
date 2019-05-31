/* eslint-disable */
let allScore = 0

export function resetScore() {
   allScore = 0
}

export function setScore (score, num) {
   allScore+= score
   console.log(allScore)
   if (num) {
      return allScore
   }
}
