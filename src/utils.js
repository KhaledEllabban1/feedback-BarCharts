//=========================================== Headers + token + requestOption  ===========================================//
const token = `SLSmxK17vjRInEWIiFQjwE1QIDfeSM`;
const myHeaders = new Headers();
myHeaders.append('Content-type', "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`); 
export const requestOptions = {
  method: 'Get',
  headers: myHeaders,
  redirect:'follow'
};
//=========================================== Headers + token + requestOption  ===========================================//

//=========================================== getAverage Function ===========================================//

// Calculate the average of Reviews feedback
export const getAverage = (question, answers) => {
    let sum = 0;
      for(let i =0; i < answers.length ; i++) {
          if( question[0].choices.filter(el => el.text === "Good")[0].id === answers[i].choice ) {
              //[id] 4: Good [weight = 1]
              sum += 1
          } else if (question[0].choices.filter(el => el.text === "Neutral")[0].id === answers[i].choice  ) {
              //[id] 6: Neutral [weight = 0]
              sum += 0
          } else if (question[0].choices.filter(el => el.text === "Bad")[0].id === answers[i].choice  ) {
              //[id] 1: Bad [weight = -1]
              sum += -1
          }
      }
      // console.log(sum);
      let averagePoints = parseFloat((sum / answers.length) * 100 , 10);
      if(isNaN(averagePoints)) averagePoints = 0;
    //   console.log(averagePoints)
      return averagePoints;
}
//=========================================== getAverage Function ===========================================//

//=========================================== Date Conversion ===========================================//
  
  // converate the date from this form new Date('2019-08-18T21:11:54') to 2019-08-18
export  const dateFormat = (date) => {
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const dateFormat = `${year}-${month + 1}-${day}`;
    return dateFormat
}
//=========================================== Date Conversion ===========================================//

//=========================================== arraySplit Fun  ===========================================//

export const arraySplit = (array, chunk = 12) => {
    let arr = []
    var i,j, temporary;
    for (i = 0,j = array.length; i < j; i += chunk) {
        temporary = array.slice(i, i + chunk);
        arr.push(temporary)
    }
    // console.log(arr)
    return arr
}


//=========================================== arraySplit Fun  ===========================================//


//=========================================== getDates Fun  ===========================================//

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

export function getDates(startDate, stopDate, value) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      const [month, day, year] = [currentDate.getMonth(), currentDate.getDate(), currentDate.getFullYear()];
      const date = `${year}-${month + 1}-${day}`;
        dateArray.push(date);
        currentDate = currentDate.addDays(1);
    }
    const reqDate = arraySplit(dateArray, (Math.round(dateArray.length / value)))
    return reqDate;
}

//=========================================== getDates Fun  ===========================================//
