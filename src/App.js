import './App.css';
import React, { useEffect, useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { getAverage, dateFormat, requestOptions } from './utils';
import { differenceInDays  } from 'date-fns';


//=========================================== date Picker ===========================================//
const App = () => {
  const [selectedDateOne, setSelectedDateOne] = useState(new Date('2019-08-18T21:11:54'));
  const [selectedDateTwo, setSelectedDateTwo] = useState(new Date('2019-10-01T21:11:54'));
  const [dateFrom, setDateFrom] = useState("2019-08-18");
  const [dateTo, setDateTo] = useState("2019-10-01");

  
  // const labelDiff = Utils_Date.diffInDays(dateFrom, dateTo)
  // console.log('diff', labelDiff)


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
  useEffect(() => {
    // GET Reviews
    fetch(`https://staging.mymelior.com/v1/branches/1/progress?date_from=${dateFrom}&date_to=${dateTo}`, requestOptions)
    .then(response => response.json())
    .then(
      data => {

        setReviews(data.line_chart_data ? data.line_chart_data : []);
        console.log('Reviews :', data.line_chart_data);
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
        const enQuestion = data.length ? data[data.findIndex(el => el.lang === "en")].questions : [] ;
        //  console.log('enQuestions:',Questions)
        setQuestions(enQuestion);
      }
    )
    .catch( error => console.log(error));
  
  }, [dateFrom,dateTo]);

  
  if( Questions.length > 0 && Reviews.length > 0) {
    // Get Reviews(Answers) of Question 2 & 4 
    const answers = Reviews.map(el=> el.answers);
    const questionTwoAnswers  = answers.map(answer => answer[ answer.findIndex(el => el.question === 2) ]);
    const questionFourAnswers = answers.map(answer => answer[ answer.findIndex(el => el.question === 4) ]);
    console.log("questionTwoAnswers", questionTwoAnswers);
    // console.log("questionFourAnswers", questionFourAnswers);

    // Get Questions objects
    const questionTwoMeaning = Questions.filter(question => question.id === 2);
    const questionFourMeaning = Questions.filter(question => question.id === 4);
    console.log("questionTwo", questionTwoMeaning)
    // console.log("questionfour", questionFourMeaning)
    
    // Fun to CalCulate the Average
    getAverage(questionTwoMeaning, questionTwoAnswers);
    getAverage(questionFourMeaning, questionFourAnswers);
   }
   
     //=========================================== fun Date  ===========================================//
   
   const dateOfReview = Reviews.map(el=> el.submitted_at);
   console.log("dateOfReview:",dateOfReview)
   const submitDateFormat =  dateOfReview.map(el => {
      const date = new Date(el);
      const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
      const submitDate = `${year}-${month + 1}-${day}`;
      return submitDate
    });
    console.log("submitDateFormat:",submitDateFormat)
  

  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

  function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      const [month, day, year] = [currentDate.getMonth(), currentDate.getDate(), currentDate.getFullYear()];
      const date = `${year}-${month + 1}-${day}`;
        dateArray.push(date);
        // dateArray.push(format(new Date (currentDate), 'yyyy-mm-dd'));
        currentDate = currentDate.addDays(1);
    }
    console.log("DurationOfDate:",dateArray)
    return dateArray;
}
getDates(selectedDateOne,selectedDateTwo);

// const diffInDays = Math.abs(differenceInDays(selectedDateTwo,selectedDateOne));
const diffInDays = getDates(selectedDateOne,selectedDateTwo).length;
console.log("diffInDays:",diffInDays);

  
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