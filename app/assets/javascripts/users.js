// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
$( document ).ready(function() {
	var handler;
	var markers;
		
		
	function draw(hash){
	  handler = Gmaps.build('Google');
	  handler.buildMap({ provider: {}, internal: {id: 'map'}}, function(){
	    markers = handler.addMarker(hash);
	    handler.bounds.extendWith(markers);
	    handler.fitMapToBounds();
	  });
	  live();
	}

	
	// Initialize Firebase
	var config = {
	  apiKey: "AIzaSyARQoO1-rO1IrXhQ7x9tF8K2xUvQRIFzLw",
	  authDomain: "livemap-8212d.firebaseapp.com",
	  databaseURL: "https://livemap-8212d.firebaseio.com",
	  storageBucket: "livemap-8212d.appspot.com",
	  messagingSenderId: "662876714740"
	};
	firebase.initializeApp(config);
	var bigOne = document.getElementById('bigOne');
	var dbRef =  firebase.database().ref().child('text');

	dbRef.once('value', function(snapshot){
		draw(snapshot.val());
	});

	function live(){
		dbRef.on('value', function(snapshot){
		bigOne.innerText = snapshot.val().lat;
		redraw(snapshot.val());
		console.log(snapshot.val());
		});
	}

	function redraw(hash){
		handler.removeMarker(markers);
		markers = handler.addMarker(hash);
	}
	
});