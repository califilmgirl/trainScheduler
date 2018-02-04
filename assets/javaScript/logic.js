// Initialize Firebase
var config = {
  apiKey: "AIzaSyCCz0sNY2Jbiqp6QVjBOhWlnMK9D4x6nB4",
  authDomain: "trainscheduler-44d13.firebaseapp.com",
  databaseURL: "https://trainscheduler-44d13.firebaseio.com",
  projectId: "trainscheduler-44d13",
  storageBucket: "trainscheduler-44d13.appspot.com",
  messagingSenderId: "181010961184"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding train schedules
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#firstTrain-input").val().trim(), "hh:mm:ss").format("hh:mm:ss");
  var frequency = moment($("#frequency-input").val().trim(), "mm").format("mm");

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destination,
    first: firstTrain,
    frequency: frequency,

  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  // Alert
  alert("New Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("firstTrain-input").val("");
  $("#frequency-input").val("");

});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var frequency  = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

var trainMinutes = tMinutesTillTrain;
var tFrequency = frequency;
var firstTime = firstTrain;

  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
 console.log(firstTimeConverted);

 var currentTime = moment();
 console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

 var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
 console.log("DIFFERENCE IN TIME: " + diffTime);

 var tRemainder = diffTime % tFrequency;
 console.log(tRemainder);

 var tMinutesTillTrain = tFrequency - tRemainder;
 console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

 var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

 $("#train-table > tbody").append(
   "<tr><td>" + trainName +
   "</td><td>" + destination +
   "</td><td>" + frequency + " mins" +
   "</td><td>" + moment(nextTrain).format("hh:mm") +
   "</td><td>" + tMinutesTillTrain + " mins" +
   "</td></tr>");
});
