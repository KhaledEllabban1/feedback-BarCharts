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
      console.log(averagePoints)
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

export const arraySplit = (array, chunk = 12) => {
    let arr = []
    var i,j, temporary;
    for (i = 0,j = array.length; i < j; i += chunk) {
        temporary = array.slice(i, i + chunk);
        arr.push(temporary)
    }
    console.log(arr)
    return arr
}