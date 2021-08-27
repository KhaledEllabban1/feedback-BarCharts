import './App.css';
import React, { useEffect, useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { getAverage, dateFormat, requestOptions, arraySplit } from './utils';
import { differenceInDays, format  } from 'date-fns';


//=========================================== start date Picker ===========================================//
const App = () => {
  const [selectedDateOne, setSelectedDateOne] = useState(new Date('2019-08-18T21:11:54'));
  const [selectedDateTwo, setSelectedDateTwo] = useState(new Date('2019-09-01T21:11:54'));
  const [dateFrom, setDateFrom] = useState(dateFormat(selectedDateOne));
  const [dateTo, setDateTo] = useState(dateFormat(selectedDateTwo));

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
  //=========================================== end date Picker ===========================================//

  const [Reviews, setReviews] = useState([]);
  const [Questions, setQuestions] = useState([]);
  //=========================================== start Requests ===========================================//
  useEffect(() => {
    // GET Reviews
    fetch(`https://staging.mymelior.com/v1/branches/1/progress?date_from=${dateFrom}&date_to=${dateTo}`, requestOptions)
    .then(response => response.json())
    .then(
      data => {

        setReviews(data.line_chart_data ? data.line_chart_data : []);
        // console.log('Reviews :', data.line_chart_data);
      }
    )
    .catch( error => console.log(error));
    // ******************************************************* Start Solution one of Getting Average to each certain amount of time *****************************//
    // const [QuestionTwoAverage, setQuestionTwoAverage ] = useState([]);
    // for (let i = 0; i < 4 ; i++) {
    //   let datesFrom = ["2019-08-01", "2019-10-01", "2019-12-1","2020-01-01"];
    //   let datesTo   = ["2019-09-01", "2019-11-01", "2019-12-31","2020-02-01"];
     
    // fetch(`https://staging.mymelior.com/v1/branches/1/progress?date_from=${datesFrom[i]}&date_to=${datesTo[i]}`, requestOptions)
    // .then(response => response.json())
    // .then(
    //   data => {
    //     console.log("result number: ",i)
    //     setReviews(data.line_chart_data ? data.line_chart_data : []);
    //     // console.log('Reviews :', data.line_chart_data);
    //   }
    // )
    // .catch( error => console.log(error));
    // }
    // ******************************************************* End Solution one of Getting Average to each certain amount of time *****************************//


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
  //=========================================== end Requests ===========================================//

  //  ================================ start Get Reviews(Answers) of Question 2 & 4 ================================//
  const dateOfReview = Reviews.map(el=> el.submitted_at);
  if( Questions.length > 0 && Reviews.length > 0) {
    const answers = Reviews.map(el=> el.answers);
    
    const questionTwoAnswers  = answers.map(answer => answer[ answer.findIndex(el => el.question === 2) ]);
    const dateOfReview = Reviews.map(el=> el.submitted_at);
    const questionTwoAnswersWithTime = () => {     
      for(let i=0; i < answers.length; i++){
            questionTwoAnswers[i].time = dateOfReview[i]
      }
    }
    questionTwoAnswersWithTime();
    const newAnsTwo = arraySplit(questionTwoAnswers.reverse(), (Math.round(questionTwoAnswers.length / 6)));
    console.log("newAnsTwo", newAnsTwo)
    // const start = questionTwoAnswers[0]
    // console.log(start);
    console.log("questionTwoAnswers", questionTwoAnswers);
    

    const questionFourAnswers = answers.map(answer => answer[ answer.findIndex(el => el.question === 4) ]);
    const questionFourAnswersWithTime = () => {     
      for(let i=0; i < answers.length; i++){
        questionFourAnswers[i].time = dateOfReview[i]
      }
    }
    questionFourAnswersWithTime();
    // console.log("questionFourAnswers", questionFourAnswers);

    //  ================================ end Get Reviews(Answers) of Question 2 & 4 ================================//

    // Get Questions objects
    const questionTwoMeaning = Questions.filter(question => question.id === 2);
    const questionFourMeaning = Questions.filter(question => question.id === 4);
    // console.log("questionTwo", questionTwoMeaning)
    // console.log("questionfour", questionFourMeaning)
    
    //  ================================ start Fun to CalCulate the Average ================================//
    getAverage(questionTwoMeaning, newAnsTwo[0] );
    // getAverage(questionFourMeaning, questionFourAnswers);

    const averageArrayOfTwo = () => {
      let average = [];
      let averageDate = []
      for (let i = 0; i < newAnsTwo.length ; i++ ) {
        let ave = getAverage(questionTwoMeaning, newAnsTwo[i]);
        let startDate = dateFormat(new Date(`${newAnsTwo[i][0].time}`));
        // console.log("startDate:",startDate )
        averageDate.push(startDate)
        // let endDate = dateFormat(new Date(`${newAnsTwo[i][newAnsTwo[i].length - 1].time}`));
        // console.log("endDate:", endDate)
        average.push(ave)
      }
      console.log(average)
      console.log(averageDate)
      return [average, averageDate]
   }
    averageArrayOfTwo()
    //  ================================ end Fun to CalCulate the Average ================================//

  }
   
     //=========================================== start fun Date  ===========================================//
   
  
  //  console.log("dateOfReview:",dateOfReview)
   const submitDateFormat =  dateOfReview.map(el => {
      const date = new Date(el);
      const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
      const submitDate = `${year}-${month + 1}-${day}`;
      return submitDate
    });
    // console.log("submitDateFormat:",submitDateFormat)
  

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
    // console.log("DurationOfDate:",dateArray);
    // arraySplit(dateArray)
    return dateArray;
}
getDates(selectedDateOne,selectedDateTwo);

// const diffInDays = Math.abs(differenceInDays(selectedDateTwo,selectedDateOne));
const diffInDays = getDates(selectedDateOne,selectedDateTwo).length;
// console.log("diffInDays:",diffInDays);

//=========================================== end fun Date  ===========================================//
  
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