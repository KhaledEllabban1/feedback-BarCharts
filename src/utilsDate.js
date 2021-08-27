import { addDays, addWeeks, addMonths, addYears, toDate, format } from "date-fns";
const formatByPeriods = {
  day: { period: "yyyy-mm-dd", add: addDays },
  week: { period: "yyyy-WW", add: addWeeks },
  month: { period: "yyyy-mm", add: addMonths },
  year: { period: "yyyy", add: addYears }
};

class Utils_Date {
    static shortDate(date) {
      return format(toDate(date), "yyyy-mm-dd");
    }
  
    static getDates(startDate, stopDate, period = "day") {
      const dateArray = [];
      const datePeriod = formatByPeriods[period];
      const dateFormat = datePeriod.period;
      startDate = toDate(startDate);
      stopDate = toDate(stopDate);
      let currentDate = startDate;
      while (currentDate <= stopDate) {
        const dateVal = format(currentDate, dateFormat);
        dateArray.indexOf(dateVal) === -1 && dateArray.push(dateVal);
        currentDate = datePeriod.add(currentDate, 1);
      }
      return dateArray;
    }

    static getDates2(startDate, stopDate, dateFormat = "yyyy-mm-dd") {
        const dateArray = [];
        startDate = toDate(startDate);
        stopDate = toDate(stopDate);
        let currentDate = startDate;
        while (currentDate <= stopDate) {
          const dateVal = format(currentDate, dateFormat);
          dateArray.indexOf(dateVal) === -1 && dateArray.push(dateVal);
          currentDate = addDays(currentDate, 1);
        }
        return dateArray;
      }
    static diffInDays(date1, date2) {
        date1 = Date.toDate(date1);
        date2 = (date2 && Date.toDate(date2)) || Date.now();
        return ((date2 - date1) / (1000 * 60 * 60 * 24)).toFixed(1);
      }
    static addDate(date, daysToAdd) {
        return this.previousDate(date, daysToAdd * -1);
      }
    
    static previousDate(date, daysToSubstract) {
        const dateOffset = 24 * 60 * 60 * 1000 * daysToSubstract; //5 days
        date.setTime(date.getTime() - dateOffset);
        return date;
      }
    
}

export default Utils_Date;