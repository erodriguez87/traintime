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

    var currentTime = moment();
    console.log('CURRENT TIME: '+moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTrainCon), 'minutes');
    console.log('difference in Time: '+ diffTime);

    // How many minutes are left
    var tRemainder = diffTime % frequency;
    console.log('remainder' + tRemainder);
    // How many minutes away is the next train
    var minAway = frequency - tRemainder;
    console.log('min away ' + minAway);

    var nextTrain = moment().add(minAway, "minutes");
    
    nextTrain = moment(nextTrain).format("hh:mm");
    console.log('next train ' + nextTrain);

    var newTrain = {
      name: name,
      destination: destination, 
      frequency: frequency,
      firstTrain: firstTrain,
      diffTime:  diffTime,
      minAway: minAway,
      nextTrain: nextTrain
    };

    database.ref().push(newTrain); 
      
  }); 


  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var diffTime = childSnapshot.val().diffTime;
    var minAway = parseInt(childSnapshot.val().minAway);
    var nextTrain = childSnapshot.val().nextTrain;

    // Prepare the train variable table data, table row and table body html elements
    var tBody = $('.train-board');
    var tRow = $('<tr>');

    var nameTd = $('<td class="name">').text(name);
    var destinationTd = $('<td class="destination">').text(destination);
    var freqTd = $('<td class="start">').text(frequency);
    var nextTd = $('<td class="next">').text(nextTrain);;
    var minTd = $('<td class="minAway">').text(minAway);;

    // Adds trains. Add the table data to the table row and add the row to the train board
    tRow.append(nameTd, destinationTd, freqTd, nextTd,minTd);
    tBody.append(tRow);


    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});