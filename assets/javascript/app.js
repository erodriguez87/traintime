// Thomas the Train Tracker


// Wait for the page to finish loading and set up firebase
// ===========================================================================
$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyDJOoAuDN_nvZXyWrPfRFt9zh_hsdhSgGQ",
    authDomain: "train-2f8b9.firebaseapp.com",
    databaseURL: "https://train-2f8b9.firebaseio.com",
    projectId: "train-2f8b9",
    storageBucket: "train-2f8b9.appspot.com",
    messagingSenderId: "915229857323"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
// ===========================================================================

// On click for the form to submit
// ===========================================================================
  

  $('button').on('click', function() {
    var name = $('#name').val().trim();
    var destination = $('#destination').val().trim();
    var frequency = $('#frequency').val().trim();
    var firstTrain = $('#firstTrain').val().trim();

    firstTrainCon = moment(firstTrain, "HH:mm");
        console.log(firstTrainCon); 

    var currentTime = moment();
    console.log('CURRENT TIME: '+moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTrainCon), 'minutes');
    console.log('difference in Time: '+ diffTime);

    var tRemainder = diffTime % frequency;
    console.log('remainder' + tRemainder);

    var minAway = frequency - tRemainder;
    
    var newTrain = {
      name: name,
      destination: destination, 
      frequency: frequency,
      firstTrain: firstTrain,
      diffTime:  diffTime,
      minAway: minAway
    };

    database.ref().push(newTrain); 
      
  }); 


  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var diffTime = childSnapshot.val().diffTime;
    var minAway = parseInt(childSnapshot.val().minAway);

    // Prepare the train variable table data, table row and table body html elements
    var tBody = $('.train-board');
    var tRow = $('<tr>');

    var nameTd = $('<td class="name">').text(name);
    var destinationTd = $('<td class="destination">').text(destination);
    var freqTd = $('<td class="start">').text(frequency);
    var diffTimeTd = $('<td class="next">').text('$' + diffTime);;
    var minTd = $('<td class="minAway">').text('$' + minAway);;

    // Adds trains. Add the table data to the table row and add the row to the train board
    tRow.append(nameTd, destinationTd, freqTd,  diffTimeTd,minTd);
    tBody.append(tRow);


    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});