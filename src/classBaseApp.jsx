import './App.css';
import React from 'react';
import MaterialUIPickers from './components/data-picker/data-picker.component'

class App extends React.Component {
    state = {
        Reviews: null,
        Questions: null,
        selectedDateOne: new Date('2019-08-18T21:11:54'),
        selectedDateTwo: new Date('2019-08-18T21:11:54'),
        dateFrom: null,
        dateTo: null
    }

    componentDidMount() {
        const token = `SLSmxK17vjRInEWIiFQjwE1QIDfeSM`;
        var myHeaders = new Headers();
        myHeaders.append('Content-type', "application/json");
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        var requestOptions = {
            method: 'Get',
            headers: myHeaders,
            redirect: 'follow'
        };
        // GET Reviews
        fetch('https://staging.mymelior.com/v1/branches/1/progress?date_from=2020-1-10&date_to=2020-08-10', requestOptions)
            .then(response => response.json())
            .then(
                data => {
                    console.log('AllData =', data);
                    this.setState({ Reviews: data.line_chart_data }, () => {
                        console.log('Reviews:', this.state.Reviews)
                    })
                }
            )
            .catch(error => console.log(error));

        // GET Questions
        fetch('https://staging.mymelior.com/v1/questions', requestOptions)
            .then(response => response.json())
            .then(
                data => {
                    // console.log('Questions =', data);
                    this.setState({ Questions: data }, () => {
                        console.log('Questions =', this.state.Questions)
                    })
                }
            )
            .catch(error => console.log(error));
    }
    handleDateChange = (date) => {
        this.setState({ selectedDateONe: date, s });
        const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
        const dateFormateOne = `${year}-${month + 1}-${day}`;
        setDateFrom(dateFormateOne);
        // console.log(dateFormateOne);
    };
    handleDateChangeTwo = (date) => {
        this.setState({ selectedDateTwo: date });
        const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
        const dateFormateTwo = `${year}-${month + 1}-${day}`;
        setDateTo(dateFormateTwo);
        // console.log(dateFormateTwo);
    };


    render() {
        console.log(this.state.dateFrom);
        console.log(this.state.dateTo);
        return (
            <div className="App">
                <MaterialUIPickers />
            </div>
        );
    }
}

export default App;

