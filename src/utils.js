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
      let averagePoints = (sum / answers.length) * 100 + '%' ; 
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

  
// related to App.js 
//=========================================== start All Question and Answers Together ===========================================//

//  const questionTwoAndFour = [...questionTwoAnswers, ...questionFourAnswers];
// console.log("question2&4:" , questionTwoAndFour);

// Get Questions itself and the meaning of each choice id
//  const requestedQuestions = Questions.filter(question => question.id === 2 || question.id === 4  )
//  console.log('requestedQuestions:',requestedQuestions)

//=========================================== end All Question and Answers Together ===========================================//


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

export function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      const [month, day, year] = [currentDate.getMonth(), currentDate.getDate(), currentDate.getFullYear()];
      const date = `${year}-${month + 1}-${day}`;
        dateArray.push(date);
        currentDate = currentDate.addDays(1);
    }
    const reqDate = arraySplit(dateArray, (Math.round(dateArray.length / 6)))
    return reqDate;
}

//=========================================== getDates Fun  ===========================================//

  // ******************************************************* Start Solution one of Getting Average to each certain amount of time ***************************//
//   export const certainAverageOfTime = (questionString, questionNumber, startDate, endDate, QuestionArray) => {
//      const duration = getDates(startDate , endDate);
//      console.log("duration:", duration)
//     let average = [];
//     let startDates = [];
//     for (let i = 0; i < 6 ; i++) {
//       let datesFrom = duration[i][0]
//       let datesTo   = duration[i][duration[i].length - 1]
//       // console.log(datesFrom);console.log(datesTo)
//     fetch(`https://staging.mymelior.com/v1/branches/1/progress?date_from=${datesFrom}&date_to=${datesTo}`, requestOptions)
//     .then(response => response.json())
//     .then(
//       data => {
//         // console.log("result number: ", i)
//         const Reviews = data.line_chart_data ? data.line_chart_data : [] ;
//         const answers = Reviews.map(el=> el.answers);
//         const questionAnswers  = answers.map(answer => answer[ answer.findIndex(el => el.question === questionNumber) ]);
//         console.log("question", questionAnswers)
//         const questionMeaning =  QuestionArray.filter(question => question.id === questionNumber);
//         let ave = getAverage(questionMeaning, questionAnswers );
//         // average.push([i, ave]);
//         average.push({order : i, average: ave});
//         startDates.push({order : i, datesFrom: datesFrom});
//         }
//       )
//       .catch( error => console.log(error));
//     }
// 
//     // this state isn't defined
//     eval(`setQuestion${questionString}Average`)(average) ;
//     eval(`setDatesQuestion${questionString}`)(startDates);
//   }


// ******************************************************* End Solution one of Getting Average to each certain amount of time of Question two *****************************//
// const duration = getDates(selectedDateOne,selectedDateTwo);
// console.log("duration:", duration)

// const certainAverageOfTime = () => {
//     let average = [];
//   let startDates = [];
//   for (let i = 0; i < 6 ; i++) {
//       let datesFrom = duration[i][0]
//       let datesTo   = duration[i][duration[i].length - 1]
//       // console.log(datesFrom);console.log(datesTo)
//       fetch(`https://staging.mymelior.com/v1/branches/1/progress?date_from=${datesFrom}&date_to=${datesTo}`, requestOptions)
//       .then(response => response.json())
//       .then(
//           data => {
//               // console.log("result number: ", i)
//               const Reviews = data.line_chart_data ? data.line_chart_data : [] ;
//               const answers = Reviews.map(el=> el.answers);
//               const questionTwoAnswers  = answers.map(answer => answer[ answer.findIndex(el => el.question === 2) ]);
//               const questionTwoMeaning =  Questions.filter(question => question.id === 2);
//               let ave = getAverage(questionTwoMeaning, questionTwoAnswers );
//               // average.push([i, ave]);
//               average.push({order : i, average: ave});
//               startDates.push({order : i, datesFrom: datesFrom});
//             }
//             )
//             .catch( error => console.log(error));
//         }
        
//         setQuestionTwoAverage(average);
//         setDatesQuestionTwo(startDates);
//     }
//     console.log("QuestionTwoAverage", QuestionTwoAverage)
//     console.log("DatesQuestionTwo", DatesQuestionTwo)
// ******************************************************* End Solution one of Getting Average to each certain amount of time of Question two *****************************//

