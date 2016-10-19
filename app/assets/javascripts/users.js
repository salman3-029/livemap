// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
var handler;
var markers;
function draw(hash){
  handler = Gmaps.build('Google');
  handler.buildMap({ provider: {}, internal: {id: 'map'}}, function(){
    markers = handler.addMarkers(hash);
    handler.bounds.extendWith(markers);
    handler.fitMapToBounds();
  });
  }

  function redraw(hash){
  	handler.removeMarkers(markers);
  	handler.addMarkers(hash);
  }
