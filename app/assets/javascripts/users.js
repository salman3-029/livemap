// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
$( document ).ready(function() {

	// Initialize Firebase
	var config = {
	  apiKey: "AIzaSyCDLaUKEkG3T0MCzjEVwS6RTNAGrzuLX34",
	  authDomain: "delivodriver.firebaseapp.com",
	  databaseURL: "https://delivodriver.firebaseio.com",
	  storageBucket: "delivodriver.appspot.com",
	  messagingSenderId: "15367859857"
	};
	firebase.initializeApp(config);
	var dbRef =  firebase.database().ref().child('AgentsLocation');

	var handler;
	var markers;

	function redraw(hash){
		handler.removeMarkers(markers);
		//console.log(markers);
		markers = handler.addMarkers(hash);
	}

	function live(){
		dbRef.on('value', function(snapshot){
		redraw(snapshot.val());
		console.log(snapshot.val());
		});
	}
		
	function draw(hash){
	  handler = Gmaps.build('Google');
	  handler.buildMap({ provider: {}, internal: {id: 'map'}}, function(){
	    markers = handler.addMarkers(hash);
	    handler.bounds.extendWith(markers);
	    handler.fitMapToBounds();
	  });
	  live();
	}

	dbRef.once('value', function(snapshot){
		draw(snapshot.val());
	});

	

	
});