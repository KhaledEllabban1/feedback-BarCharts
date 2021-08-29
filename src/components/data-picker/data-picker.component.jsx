// import 'date-fns';
// import React, {useState} from 'react';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker
// } from '@material-ui/pickers';

// export default function MaterialUIPickers() {
//   // The first commit of Material-UI
//   const [selectedDateOne, setSelectedDateOne] = useState(new Date('2014-08-18T21:11:54'));
//   const [selectedDateTwo, setSelectedDateTwo] = useState(new Date('2014-08-18T21:11:54'));
//   const [dateFrom, setDateFrom] = useState(null);
//   const [dateTo, setDateTo] = useState(null);

//   const handleDateChange = (date) => {
//     setSelectedDateOne(date);
//     const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
//     const dateFormateOne = `${year}-${month + 1}-${day}`;
//     setDateFrom(dateFormateOne);
//     // console.log(dateFormateOne);
//   };
//   const handleDateChangeTwo = (date) => {
//     setSelectedDateTwo(date);
//     const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
//     const dateFormateTwo = `${year}-${month + 1}-${day}`;
//     setDateTo(dateFormateTwo);
//     // console.log(dateFormateTwo);
//   };


//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <Grid container justifyContent="space-around">
//         <KeyboardDatePicker
//           disableToolbar
//           variant="inline"
//           format="MM/dd/yyyy"
//           margin="normal"
//           id="date-picker-inline"
//           label="Date picker inline"
//           value={selectedDateOne}
//           onChange={handleDateChange}
//           KeyboardButtonProps={{
//             'aria-label': 'change date',
//           }}
//         />
//         <KeyboardDatePicker
//           disableToolbar
//           variant="inline"
//           margin="normal"
//           id="date-picker-dialog-1"
//           label="Date picker dialog"
//           format="MM/dd/yyyy"
//           value={selectedDateTwo}
//           onChange={handleDateChangeTwo}
//           KeyboardButtonProps={{
//             'aria-label': 'change date',
//           }}
//         />
        
//       </Grid>
//     </MuiPickersUtilsProvider>
//   );
// }