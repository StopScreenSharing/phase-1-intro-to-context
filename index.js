function createEmployeeRecord (employeeArray) {
    return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray [3],
    timeInEvents: [],
    timeOutEvents: []
    };
}

function createEmployeeRecords (employeeData) {
    return employeeData.map(createEmployeeRecord)
};



function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
  
    const timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    };
  
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
  }


function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');

    const timeOutEvent = {
        type: "TimeOut", 
        date: date, 
        hour: parseInt(hour, 10)

    }
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}


function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date  === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date  === date);

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100

    return hoursWorked;
};


function wagesEarnedOnDate (employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);

    const wagesEarned = hoursWorked * employeeRecord.payPerHour;
    return wagesEarned;
}



function allWagesFor(employeeRecord) {

    if (!employeeRecord.timeInEvents || employeeRecord.timeInEvents.length === 0) {
        return 0;
    }
    return employeeRecord.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employeeRecord, event.date);
    }, 0);
}

    // for(let i = 0; i < employeeRecord.timeInEvents.length, i++;) {
    //     let timeIn = employeeRecord.timeInEvents[i];
    //     let timeOut = employeeRecord.timeOutEvents[i];

    //     let hoursWorked = (timeOut - timeIn) / 100;

    //     let dailyWages = hoursWorked * employeeRecord.payPerHour;

    //     totalWages += dailyWages;
//     }
//     return totalWages;
// }


function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
        return total + allWagesFor(employee);
    }, 0)
}