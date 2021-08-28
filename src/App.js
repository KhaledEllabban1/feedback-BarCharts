import './App.css';
import React, { useEffect, useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { getAverage, dateFormat, requestOptions, arraySplit, getDates } from './utils';
import { differenceInDays, format  } from 'date-fns';


//=========================================== start date Picker ===========================================//
const App = () => {
  const [selectedDateOne, setSelectedDateOne] = useState(new Date('2019-08-01T21:11:54'));
  const [selectedDateTwo, setSelectedDateTwo] = useState(new Date('2019-09-01T21:11:54'));
  const [dateFrom, setDateFrom] = useState(dateFormat(selectedDateOne));
  const [dateTo, setDateTo] = useState(dateFormat(selectedDateTwo));

  const handleDateChange = (date) => {
    setSelectedDateOne(date);
    const dateFormatOne = dateFormat(date)
    setDateFrom(dateFormatOne);
    // console.log("dateFormatOne", dateFormatOne);
    certainAverageOfTime("Two", 2);
    certainAverageOfTime("Four", 4);
  };
  const handleDateChangeTwo = (date) => {
    setSelectedDateTwo(date);
    setDateTo(dateFormat(date));
    // console.log("dateFormatTwo", dateFormatTwo);
    certainAverageOfTime("Two", 2);
    certainAverageOfTime("Four", 4);
  };
  //=========================================== end date Picker ===========================================//

  const [Reviews, setReviews] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const [QuestionTwoAverage, setQuestionTwoAverage ] = useState([]);
  const [QuestionFourAverage, setQuestionFourAverage] = useState([]);
  const [DatesQuestion, setDatesQuestion] = useState([]);


  //===========================================**************************** start Requests ************************ ===========================================//
  useEffect(() => {

    // ******************************************************* GET Questions *****************************//
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
    // ******************************************************* GET Questions *****************************//

    // ******************************************************* GET Reviews *****************************//
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
    // ******************************************************* GET Reviews *****************************//



  }, [dateFrom,dateTo]);

  //===========================================**************************** end Requests ************************ ===========================================//


  
  // ******************************************************* Start Solution one of Getting Average to each certain amount of time ***************************//
  const duration = getDates(selectedDateOne,selectedDateTwo);
  console.log("duration:", duration)
  const certainAverageOfTime = (questionString, questionNumber) => {
    let average = [];
    let startDates = [];
    for (let i = 0; i < 6 ; i++) {
      let datesFrom = duration[i][0]
      let datesTo   = duration[i][duration[i].length - 1]
      // console.log(datesFrom);console.log(datesTo)
    fetch(`https://staging.mymelior.com/v1/branches/1/progress?date_from=${datesFrom}&date_to=${datesTo}`, requestOptions)
    .then(response => response.json())
    .then(
      data => {
        // console.log("result number: ", i)
        const Reviews = data.line_chart_data ? data.line_chart_data : [] ;
        const answers = Reviews.map(el=> el.answers);
        const questionAnswers  = answers.map(answer => answer[ answer.findIndex(el => el.question === questionNumber) ]);
        // console.log("question", questionAnswers)
        const questionMeaning =  Questions.filter(question => question.id === questionNumber);
        let ave = getAverage(questionMeaning, questionAnswers );
        // average.push([i, ave]);
        average.push({order : i, average: ave});
        startDates.push({order : i, datesFrom: datesFrom});
        }
      )
      .catch( error => console.log(error));
    }
    eval(`setQuestion${questionString}Average`)(average) ;
    setDatesQuestion(startDates);
  }
  console.log("QuestionTwoAverage", QuestionTwoAverage)
  console.log("QuestionFourAverage", QuestionFourAverage)
  console.log("DatesQuestion", DatesQuestion)

  // ******************************************************* End Solution one of Getting Average to each certain amount of time *****************************//

  //  ================================ start Get Reviews(Answers) of Question 2 & 4 ================================//
  
  if( Questions.length > 0 && Reviews.length > 0) {
    const answers = Reviews.map(el=> el.answers);
    const questionTwoAnswers  = answers.map(answer => answer[ answer.findIndex(el => el.question === 2) ]);
    console.log("questionTwoAnswers", questionTwoAnswers);
    const questionFourAnswers = answers.map(answer => answer[ answer.findIndex(el => el.question === 4) ]);
    console.log("questionFourAnswers", questionFourAnswers);
    
     const dateOfReview = Reviews.map(el=> el.submitted_at);

     const questionTwoAnswersWithTime = () => {     
        for(let i=0; i < answers.length; i++){
              questionTwoAnswers[i].time = dateOfReview[i]
        }
      }
      questionTwoAnswersWithTime();

      const questionFourAnswersWithTime = () => {     
        for(let i=0; i < answers.length; i++){
          questionFourAnswers[i].time = dateOfReview[i]
        }
      }
      questionFourAnswersWithTime();

    //  ================================ end Get Reviews(Answers) of Question 2 & 4 ================================//

    // Get Questions objects
    const questionTwoMeaning = Questions.filter(question => question.id === 2);
    const questionFourMeaning = Questions.filter(question => question.id === 4);
    // console.log("questionTwoMeaning", questionTwoMeaning)
    // console.log("questionFourMeaning", questionFourMeaning)
    
    //  ================================ start Fun to CalCulate the Average ================================//

    const TotalAverageOfTwo = getAverage(questionTwoMeaning, questionTwoAnswers );
    console.log("TotalAverageOfTwo", TotalAverageOfTwo)
    const TotalAverageOfFour = getAverage(questionFourMeaning, questionFourAnswers);
    console.log("TotalAverageOfFour", TotalAverageOfFour)
    
    
    //  ================================ end Fun to CalCulate the Average ================================//
    
// ******************************************************* Start Solution Two of Getting Average to each certain amount of time *****************************//  
  // after questionTwoAnswers => place
  // const questionTwoAnswersWithTime = () => {     
  //   for(let i=0; i < answers.length; i++){
  //         questionTwoAnswers[i].time = dateOfReview[i]
  //   }
  // }
  // questionTwoAnswersWithTime();
  // const questionFourAnswersWithTime = () => {     
  //   for(let i=0; i < answers.length; i++){
  //     questionFourAnswers[i].time = dateOfReview[i]
  //   }
  // }
  // questionFourAnswersWithTime();
  // // console.log("questionFourAnswers", questionFourAnswers);
  // const dateOfReview = Reviews.map(el=> el.submitted_at);
  //   const newAnsTwo = arraySplit(questionTwoAnswers.reverse(), (Math.round(questionTwoAnswers.length / 6)));
  //   const avTwo = getAverage(questionTwoMeaning, questionTwoAnswers );
  //   console.log("avTwo:", avTwo)
  //   const averageArrayOfTwo = () => {
  //     let average = [];
  //     let averageDate = []
  //     for (let i = 0; i < newAnsTwo.length ; i++ ) {
  //       let ave = getAverage(questionTwoMeaning, newAnsTwo[i]);

  //       let startDate = dateFormat(new Date(`${newAnsTwo[i][0].time}`));
  //       let endDate = dateFormat(new Date(`${newAnsTwo[i][newAnsTwo[i].length - 1].time}`));
  //       // console.log("endDate:", endDate)
  //       // console.log("startDate:", startDate)
  //       average.push(ave)
  //       averageDate.push([startDate , endDate])
  //       // averageDate.push(endDate) 
  //     }
  //     console.log(average)
  //     console.log("averageDate => that has startDate and EndDate of the average :", averageDate)
  //     return [average, averageDate]
  //  }
  //   averageArrayOfTwo()   
// ******************************************************* end Solution Two of Getting Average to each certain amount of time *****************************// 
    

  }
   
     //=========================================== start fun Date  ===========================================//
   
  
    //   const dateOfReview = Reviews.map(el=> el.submitted_at);
    //   console.log("dateOfReview:",dateOfReview)
    //  const questionTwoAnswersWithTime = () => {     
    //     for(let i=0; i < answers.length; i++){
    //           questionTwoAnswers[i].time = dateOfReview[i]
    //     }
    //   }
    //   questionTwoAnswersWithTime();
  //  const submitDateFormat =  dateOfReview.map(el => {
  //     const date = new Date(el);
  //     const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  //     const submitDate = `${year}-${month + 1}-${day}`;
  //     return submitDate
  //   });
  // console.log("submitDateFormat:",submitDateFormat)
  



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