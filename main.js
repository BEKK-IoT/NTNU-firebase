$(function () {
  var Firebase = window.firebase
  var Particle = window.Particle
  var particle = new Particle();

  var access_token = '...'
  var deviceId = '...'
  var eventName = 'button-clicked';

  particle.getEventStream({ auth: access_token, deviceId: deviceId, name: eventName }).then(function(stream) {
    stream.on('event', function(data) {
        console.log(data);
    });
  });

  $( "#content" ).click(function() {
    console.log("button clicked")
    particle.callFunction({ auth: access_token, deviceId: deviceId, name: 'ledoff', argument: 'some data' });
  });

  //All this config is gotten from the startpage of your apps console
  var config = {
    apiKey: "apikey",
    authDomain: "authdomain",
    databaseURL: "url",
    storageBucket: "storagebuccket",
    messagingSenderId: "senderid"
  };
  var firebaseApp = Firebase.initializeApp(config);


  firebaseApp.database().ref("/somereference").on('value', function(snapshot) {
   console.log(snapshot.val())
  });

  var someid = 'test';
  firebase.database().ref('someref/' + someid).set({
    username: "lars monsen",
    email: "myemail"
  });
})
