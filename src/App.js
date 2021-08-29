import './App.css';
import React, { useEffect, useState,useLayoutEffect } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { getAverage, dateFormat, requestOptions, getDates } from './utils';
import BarChart from './components/bar-chart/bar-chart.component';

//=========================================== Get the Size of Screen (component) ===========================================//
const  useWindowSize =() => {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  // console.log("size", size)
    return size
}
//=========================================== Get the Size of Screen (component) ===========================================//

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
  //=========================================== show 10 results on large screen, 6 results at mediem, 4 in results in small ===========================================//
  const width = useWindowSize();
  
  let value;
  if ( width < 768 ) {
    value = 4 
  } else if (width < 1400) {
    value = 6
  } else if ( 1401 < width ) {
    value = 10
  } else {
    value = 0
  }
  // console.log(value) 
  //=========================================== show 10 results on large screen, 6 results at mediem, 4 in results in small ===========================================//

  const [Reviews, setReviews] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const [QuestionTwoAverage, setQuestionTwoAverage ] = useState([]);
  const [QuestionFourAverage, setQuestionFourAverage] = useState([]);
  const [DatesQuestion, setDatesQuestion] = useState([]);


  //===========================================**************************** start Requests ************************ ===========================================//
  useEffect(() => {

    // ******************************************************* start GET Questions *****************************//
    fetch('https://staging.mymelior.com/v1/questions', requestOptions)
    .then(response => response.json())
    .then(
      data => {
        // console.log('Questions(ar & en):', data);
        //choose english version from questions
        const enQuestion = data.length ? data[data.findIndex(el => el.lang === "en")].questions : [] ;
        // console.log('enQuestions:',Questions) 
        setQuestions(enQuestion);
      }
    )
    .catch( error => console.log(error));
    // *******************************************************end GET Questions *****************************//

    // ******************************************************* start GET Reviews *****************************//
    fetch(`https://staging.mymelior.com/v1/branches/1/progress?date_from=${dateFrom}&date_to=${dateTo}`, requestOptions)
    .then(response => response.json())
    .then(
      data => {

        setReviews(data.line_chart_data ? data.line_chart_data : []);
        // console.log('Reviews :', data.line_chart_data);
      }
    )
    .catch( error => console.log(error));
    // ******************************************************* end GET Reviews *****************************//
  }, [dateFrom,dateTo]);

  //===========================================**************************** end Requests ************************ ===========================================//


  
  // ******************************************************* Start Solution one of Getting Average to each certain amount of time ***************************//

  // console.log("duration:", duration)
  const certainAverageOfTime = (questionString = "two", questionNumber = 2) => {
    let average = [];
    let startDates = [];
    for (let i = 0; i < value ; i++) {
      const duration = getDates(selectedDateOne,selectedDateTwo, value);
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
        average.push({order : i, average: ave});
        startDates.push({order : i, datesFrom: datesFrom});
        }
      )
      .catch( error => console.log(error));
    }
    eval(`setQuestion${questionString}Average`)(average) ;
    setDatesQuestion(startDates);
  }
  
  
  //                       arrays To Bar Chart                                //
  const QuestionTwoAverageArr = QuestionTwoAverage.sort(function(a, b) { 
    return a.order - b.order 
  }).map(el => el.average)
  console.log("QuestionTwoAverageArr", QuestionTwoAverageArr)
  
  const QuestionFourAverageArr = QuestionFourAverage.sort(function(a, b) { 
    return a.order - b.order 
  }).map(el => el.average)
  console.log("QuestionFourAverageArr", QuestionFourAverageArr)
  
  const DatesQuestionArr = DatesQuestion.sort(function(a, b) { 
    return a.order - b.order 
  }).map(el => el.datesFrom)
  console.log("DatesQuestionArr", DatesQuestionArr)
  
  //                  logs arrays
  // console.log("QuestionTwoAverage", QuestionTwoAverage)
  // console.log("QuestionFourAverage", QuestionFourAverage)
  // console.log("DatesQuestion", DatesQuestion)
  //                       arrays To Bar Chart                                //

  // ******************************************************* End Solution one of Getting Average to each certain amount of time *****************************//

  //  ================================ start Get Reviews(Answers) of Question 2 & 4 (Total Average through the Duration) ================================//
  
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

    //  ================================ end Get Reviews(Answers) of Question 2 & 4 (Total Average through the Duration) ================================//

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
  }
    
    return (
      <div className="App">
          <span>Window size: {width} </span>
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                disableToolbar
                InputProps={{ readOnly: true }}
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Start Date"
                value={selectedDateOne}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                InputProps={{ readOnly: true }}
                variant="inline"
                margin="normal"
                id="date-picker-dialog-1"
                label="End Date"
                format="MM/dd/yyyy"
                value={selectedDateTwo}
                onChange={handleDateChangeTwo}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              
            </Grid>
            <Grid>
              <BarChart QuestionTwo = {QuestionTwoAverageArr} QuestionFour = {QuestionFourAverageArr} Dates = {DatesQuestionArr}  />
            </Grid>
          </MuiPickersUtilsProvider>
      </div>
    );
}

export default App;