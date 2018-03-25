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
  var currentDate = moment(Date()).format('MMDDYYYY');

  $('button').on('click', function() {
    var name = $('#name').val().trim();
    var destination = $('#destination').val().trim();
    var frequency = $('#frequency').val().trim();
    var firstTrain = $('#firstTrain').val().trim();

    var next = 0;
    var minAway = 0; 

    next = firstTrain + parseInt(frequency);
    console.log(name,destination,frequency,firstTrain,next,minAway); 

    
    var newTrain = {
      name: name,
      destination: destination, 
      frequency: frequency,
      firstTrain: firstTrain,
      next: next,
      minAway: minAway
    };


    database.ref().push(newTrain); 
    
  
  }); // END button click to add employee
  
  // database.ref().orderByChild('dateAdded').limitToLast(1).on("child_added", function(snapshot){});  
    
  // This event will be triggered once for each initial child at this location, and it will be triggered again every time a new child is added. 
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    // console.log(snapshot.val());
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var next = childSnapshot.val().next;
    var minAway = parseInt(childSnapshot.val().minAway);

    // console.log(name);
    // console.log(destination);
    // console.log(frequency);
    // console.log(next);
  
    // // // Change the HTML to reflect
    var tBody = $('.train-board');
    var tRow = $('<tr>');
    var nameTd = $('<td class="name">').text(name);
    var roleTd = $('<td class="destination">').text(destination);
    var startTd = $('<td class="start">').text(frequency);
    var nextTd = $('<td class="next">').text('$' + next);;

    // Adds new employee to the DOM
    tRow.append(nameTd, roleTd, startTd, workedTd, nextTd, billedTd);
    tBody.append(tRow);


    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});