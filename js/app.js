var locations = [
        {
            reservation : 'AirBnB.com',
            name : 'Ex Tenroku Apartment',
            city: 'Osaka',
            date : '4/13-4/16',
            location: [34.709576, 135.5099030]
        },
        {
          reservation : 'booking.com',
          name : 'Zumaya Ryokan',
          city: 'Kyoto',
          date : '4/16-4/18',
          location: [ 34.9906701, 135.7512123]
        },
        {
          Reservation : 'booking.com',
          name : 'Hagi Takayama Kanko Hotel',
          city: 'Takayama',
          date : '4/18-4/19',
          location: [ 36.1502081, 137.2584861]
        },
        {
          reservation : 'booking.com',
          name : 'Relax Hostel Takayama St',
          city: 'Takayama',
          date : '4/19-4/20',
          location: [ 36.1412253, 137.2502873]
        },
        {
          reservation : 'booking.com',
          name : 'Hotel Listel Shinjuku',
          city: 'Tokyo',
          date : '4/20-4/23',
          location: [ 35.692833,  139.7092541]
        }
      ];

var markers = [];
var map;

var myLocation = function(data) {
  this.reservation = ko.observable(data.reservation);
  this.name = ko.observable(data.name);
  this.city = ko.observable (data.city);
  this.date = ko.observable(data.date);
  this.location = ko.observableArray(data.location);
};

//////////////////make a new ViewModel with filter

////////////////////////////
//var ViewModel = function () {
//  var self = this;

//  this.locationList = ko.observableArray([]);

//  locations.forEach(function(locationItem){
//    self.locationList.push( new myLocation(locationItem));
//  });

//  this.currentLocation = ko.observable(this.locationList()[0]); //first location on the list
//  this.setLocation = function(clickedLocation){
//    self.currentLocation(clickedLocation);
    //alert(clickedLocation.name()); //how to pass the clickedLocation as maker?
//    for(var i=0; i<markers.length;i++){
//      if (clickedLocation.name() == markers[i].title){
        //alert(i);
//        populateInfoWindow(markers[i], new google.maps.InfoWindow() );
//      }
//    }
//  };
//}; //end of the var ViewModel


//this like the main, it will run ViewModel
//ko.applyBindings(new ViewModel());

//function to initial the map
//var map;
//var markers = [];

//var largeInfowindow = new google.maps.InfoWindow();

function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.6784656, lng: 135.4601305},
    zoom: 10
    });
  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < locations.length; i++){
    //alert(locations.length);
    var position = {lat: locations[i].location[0], lng:locations[i].location[1]};
    //alert(position.lng);
    var name = locations[i].name;
    //alert(name);

    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: name,
      animation: google.maps.Animation.DROP,
      id: i
    });
    //alert(marker);
    markers.push(marker);
    //alert("here...");
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    bounds.extend(markers[i].position);

  } //end of the for loop for each marker
  map.fitBounds(bounds);
  ko.applyBindings(new ViewModel());
}; // end of initialize the maps

function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    //alert("insider");
    if (infowindow.marker != marker) {
      //alert("insider");
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>' +
                '<div>' + marker.position + '</div>'  );
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
      });
    }
  }; // end of populateInfoWindow


  var ViewModel = function(){
    var self = this;
    this.filter = ko.observable("");
    this.locationList = ko.observableArray([]);
    //create locationList array with var location
    locations.forEach(function(locationItem){
       self.locationList.push( new myLocation(locationItem));
     });

     // this computed function returns selected location name and shows markers in the filter
    this.mylocationsFilter = ko.computed(function(){
      var result = [];
      for (var i = 0; i <this.locationList().length; i++){
        //alert (this.locationList()[i].name());
        var myMarker = markers[i];
        if (this.locationList()[i].name().toLowerCase().includes(this.filter().toLowerCase())){
          //alert (this.locationList()[i].name().toLowerCase());
          result.push(this.locationList()[i]);
          alert(result)
          markers[i].setVisible(true);
          //alert(this.markers[i]);
        } else {
          markers[i].setVisible(false);
        }
      } //end of for loop
      return result; //return mylocationsFilter result array
    },this); //end of mylocationsFilter

    this.showMarkerInforOnClick = function(){
      alet ("here....")
      this.populateInfoWindow(myMarker, self.largeInfoWindow);
      this.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout((function() {
        this.setAnimation(null);
      }).bind(this), 1400);
    }
  }; // end of ViewModel
