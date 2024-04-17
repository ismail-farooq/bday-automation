// Function to send birthday emails
function sendBirthdayEmails() {
  // Get today's date
  var today = new Date();
  var todayMonth = today.getMonth() + 1; // Months are 0-indexed
  var todayDay = today.getDate();

  var ss = SpreadsheetApp.openById('1PHMSkVUGtNG8ILigPZVQjnlNbuv24VlGhFxF6s8BaFk');
  var sheet = ss.getSheetByName('Employees');

  // Get all data in the sheet
  var data = sheet.getDataRange().getValues();

  // Loop through each row of data
  for (var i = 1; i < data.length; i++) { // Assuming first row is header
    var employeeName = data[i][0];
    var emailAddress = data[i][1];
    var birthdate = data[i][2];

    // Check if birthdate is a Date object
    if (Object.prototype.toString.call(birthdate) === '[object Date]' && !isNaN(birthdate.getTime())) {
      var birthMonth = birthdate.getMonth() + 1; // Months are 0-indexed
      var birthDay = birthdate.getDate();

      // Check if it's the employee's birthday
      if (todayMonth === birthMonth && todayDay === birthDay) {
        // Send birthday email
        var subject = 'Happy Birthday!';
        var message = 'Dear ' + employeeName + ',\n\nWishing you a fantastic birthday!';
        MailApp.sendEmail(emailAddress, subject, message);
      }
    }
  }
}


// Function to set up a daily trigger to run the script
function setupTrigger() {
  ScriptApp.newTrigger('sendBirthdayEmails')
    .timeBased()
    .everyDays(1) // Run every 24 hours
    .create();
}

// Basic unit test to ensure functions are working
function testSendBirthdayEmails() {
  // Assuming test data in the same format as the Google Sheet
  var testData = [
    ['John Doe', 'ismail_farooq@students.ocean.edu', '1990-04-17'],
    // Add more test data if needed
  ];

  // Loop through test data and simulate sending birthday emails
  for (var i = 0; i < testData.length; i++) {
    var employeeName = testData[i][0];
    var emailAddress = testData[i][1];
    var birthdate = testData[i][2];

    // Call the function to send the email
    var subject = 'Happy Birthday!';
    var message = 'Dear ' + employeeName + ',\n\nWishing you a fantastic birthday!';
    MailApp.sendEmail(emailAddress, subject, message);
  }
}

