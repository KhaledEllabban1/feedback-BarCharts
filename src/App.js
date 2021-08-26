import './App.css';
import React, { useEffect, useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
// Calculate the average of Reviews feedback
const getAverage = (question, answers) => {
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
}
// converate the date from this form new Date('2019-08-18T21:11:54') to 2019-08-18
const dateFormat = (date) => {
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  const dateFormat = `${year}-${month + 1}-${day}`;
  return dateFormat
}

const App = () => {
  //=========================================== date Picker ===========================================//

  const [selectedDateOne, setSelectedDateOne] = useState(new Date('2019-08-18T21:11:54'));
  const [selectedDateTwo, setSelectedDateTwo] = useState(new Date('2019-09-01T21:11:54'));
  const [dateFrom, setDateFrom] = useState('2019-08-18');
  const [dateTo, setDateTo] = useState('2019-9-01');

  const handleDateChange = (date) => {
    setSelectedDateOne(date);
    const dateFormatOne = dateFormat(date)
    setDateFrom(dateFormatOne);
    // console.log("dateFormatOne", dateFormatOne);
  };
  const handleDateChangeTwo = (date) => {
    setSelectedDateTwo(date);
    setDateTo(dateFormat(date));
    // console.log("dateFormatTwo", dateFormatTwo);
  };
  //=========================================== date Picker ===========================================//


  const [Reviews, setReviews] = useState([]);
  const [Questions, setQuestions] = useState([]);
  //=========================================== Requests ===========================================//
  const token = `SLSmxK17vjRInEWIiFQjwE1QIDfeSM`;
  var myHeaders = new Headers();
  myHeaders.append('Content-type', "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`); 
  var requestOptions = {
    method: 'Get',
    headers: myHeaders,
    redirect:'follow'
  };

  useEffect(() => {
    // GET Reviews
    fetch(`https://staging.mymelior.com/v1/branches/1/progress?date_from=${dateFrom}&date_to=${dateTo}`, requestOptions)
    .then(response => response.json())
    .then(
      data => {
        console.log('Reviews :', data.line_chart_data);
        setReviews(data.line_chart_data);
      }
    )
    .catch( error => console.log(error));
  
    // GET Questions
    fetch('https://staging.mymelior.com/v1/questions', requestOptions)
    .then(response => response.json())
    .then(
      data => {
        // console.log('Questions(ar & en):', data);
        //choose english version from questions
        const enQuestion = data.length ? data[data.findIndex(el => el.lang == "en")].questions : [] ;
        //  console.log('enQuestions:',Questions)
        setQuestions(enQuestion);
      }
    )
    .catch( error => console.log(error));
  
  }, [dateFrom,dateTo]);

  //=========================================== start All Question and Answers Together ===========================================//

  //  const questionTwoAndFour = [...questionTwoAnswers, ...questionFourAnswers];
  // console.log("question2&4:" , questionTwoAndFour);

   // Get Questions itself and the meaning of each choice id
  //  const requestedQuestions = Questions.filter(question => question.id === 2 || question.id === 4  )
  //  console.log('requestedQuestions:',requestedQuestions

    //=========================================== end All Question and Answers Together ===========================================//

   // Get Reviews(Answers) of Question 2 & 4 
   const answers = Reviews.map(el=> el.answers);
   const questionTwoAnswers  = answers.map(answer => answer[ answer.findIndex(el => el.question === 2) ]);
   const questionFourAnswers = answers.map(answer => answer[ answer.findIndex(el => el.question === 4) ]);
    // console.log("questionTwoAnswers", questionTwoAnswers);
    // console.log("questionFourAnswers", questionFourAnswers);

   // Get Questions objects

   const questionTwoMeaning = Questions.filter(question => question.id === 2);
   const questionFourMeaning = Questions.filter(question => question.id === 4);
  //  console.log("questionTwo", questionTwoMeaning)
  //  console.log("questionfour", questionFourMeaning)
  
   // Fun to CalCulate the Average
   
   if(Questions.length > 0 && Reviews.length > 0) {
     getAverage(questionTwoMeaning, questionTwoAnswers);
     getAverage(questionFourMeaning, questionFourAnswers);
   }
  
    return (
      <div className="App">
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDateOne}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                margin="normal"
                id="date-picker-dialog-1"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDateTwo}
                onChange={handleDateChangeTwo}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              
            </Grid>
          </MuiPickersUtilsProvider>
      </div>
    );
}

export default App;