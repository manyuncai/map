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
          name : 'zumaya Ryokan',
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


//initMap();


var myLocation = function(data) {
  this.reservation = ko.observable(data.reservation);
  this.name = ko.observable(data.name);
  this.city = ko.observable (data.city);
  this.date = ko.observable(data.date);
  //add nickname array to cat
  this.location = ko.observableArray(data.location);
};




var ViewModel = function () {
  var self = this;

  this.locationList = ko.observableArray([]);

  locations.forEach(function(locationItem){
    self.locationList.push( new myLocation(locationItem));
  });
  this.currentLocation = ko.observable(this.locationList()[0]); //first cat on the list
  this.setLocation = function(clickedLocation){
    self.currentLocation(clickedLocation);
  };
}; //end of the var ViewModel

//this like the main, it will run ViewModel
ko.applyBindings(new ViewModel());
//function to initial the map
var map;
function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.6784656, lng: 135.4601305},
    zoom: 14
    });
    return map;
  };
this.initMap();
