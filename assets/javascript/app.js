$(document).ready(function() {
	  // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAAHDR8xsv0bqaZ1p_1pCQduDtwE4BFWPM",
      authDomain: "train-scheduler-6a152.firebaseapp.com",
      databaseURL: "https://train-scheduler-6a152.firebaseio.com",
      projectId: "train-scheduler-6a152",
      storageBucket: "",
      messagingSenderId: "642288717061"
    };
    firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding trains
  $("#submit-train").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var trainTime = moment($("#train-time").val().trim()).format("HH:mm");
    var trainFrequency = $("#train-frequency").val().trim();

    // Creates local object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      first_time: trainTime,
      frequency: trainFrequency
    };

    // Uploads new train to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first_time);
    console.log(newTrain.frequency);

    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-frequency").val("");
  });

  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().first_time;
    var trainFrequency = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    // Calculating the difference between the first train time and the current time
    var difference = moment().diff(moment.unix(trainTime, "minutes");

    // Calculating the number of times the train has arrived since it started until now
    var timeLeft = moment().diff(moment.unix(trainTime, 'minutes') % trainFrequency;

    // Calculating how many minutes are left until the next train
    var nextArrival = moment(trainFrequency - timeLeft, "mm").format('mm');

    // Add the minutes left to the current time to show the time the next train will arrive
    var minutesAway = moment().add(mins, "m").format("hh:mm A");
    
    // Add each train's data into the table
    $("#train-table > tbody").append('<tr><th scope="row">' + trainName + "</th><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
  });
});
