var locations = [
        {
            reservation : 'AirBnB.com',
            name : 'Ex Tenroku Apartment, Osaka',
            city: 'Osaka',
            date : '4/13-4/16',
            location: [34.709576, 135.5099030]
        },
        {
          reservation : 'booking.com',
          name : 'Zumaya Ryokan, Kyoto',
          city: 'Kyoto',
          date : '4/16-4/18',
          location: [ 34.9906701, 135.7512123]
        },
        {
          Reservation : 'booking.com',
          name : 'Hagi Takayama Kanko Hotel, Takayama',
          city: 'Takayama',
          date : '4/18-4/19',
          location: [ 36.1502081, 137.2584861]
        },
        {
          reservation : 'booking.com',
          name : 'Relax Hostel Takayama St, Takayama',
          city: 'Takayama',
          date : '4/19-4/20',
          location: [ 36.1412253, 137.2502873]
        },
        {
          reservation : 'booking.com',
          name : 'Hotel Listel Shinjuku, Tokyo',
          city: 'Tokyo',
          date : '4/20-4/23',
          location: [ 35.692833,  139.7092541]
        }
      ];

var markers = [];
var map;

//setting up location as ko.observable arry
var myLocation = function(data) {
  this.reservation = ko.observable(data.reservation);
  this.name = ko.observable(data.name);
  this.city = ko.observable (data.city);
  this.date = ko.observable(data.date);
  this.location = ko.observableArray(data.location);
};

// initMap is used for google API to set up map with markers.
function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.6784656, lng: 135.4601305},
    zoom: 20
    });
  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  // for loop: to set up makers for the map with google API
  for (var i = 0; i < locations.length; i++){
    var position = {lat: locations[i].location[0], lng:locations[i].location[1]};
    var name = locations[i].name;
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: name,
      animation: google.maps.Animation.DROP,
      id: i
    });
    markers.push(marker);
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    bounds.extend(markers[i].position);
  } //end of the for loop for each marker
  map.fitBounds(bounds);
  ko.applyBindings(new ViewModel());
}; // end of initialize the maps

//populate inforview windows with Four Square and maker information
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.setContent('');
      infowindow.marker = marker;
      //adding Four Square API for each maker's inforview contents
      clientID = "A5AP334QUNYVHP0YZXLG2TWX15IS1WYGECTAYBJSU4RIDEB3";
      clientSecret= "IFVBHFLAL2M0WP2SRE3NAHAHRKOOJF1RXAJF2NDIRL1AEEVJ";
      var foursquareURL="https://api.foursquare.com/v2/venues/explore?ll="+
          infowindow.marker.position.lat()+","+infowindow.marker.position.lng()+
          "&"+"client_id="+clientID+"&client_secret="+clientSecret+"&v=20190327"+
          "&limit=5&query=Ramen";
      //.getJSON (apiurl, function(){}).fail() method to retrive Four Square API
      $.getJSON(foursquareURL,function(data){
          //console.log(data);
          var respond = data.response.groups[0].items[0].venue;
          name ="Ramen Stand: " + respond.name;
          address = "Addrss: " +respond.location.formattedAddress[0]
                    + respond.location.formattedAddress[1] ;
          distance = "Distance: " + respond.location.distance + "m";
          //set inforwindow content right after the Four Square api call
          infowindow.setContent('<div>' + marker.title + '</div>' +
                    '<div>' + marker.position + '</div>' +
                    '<div>' + name + '</div>'+
                    '<div>' + address + '</div>'+
                  '<div>' + distance + '</div>');
          infowindow.open(map, marker);
        }).fail(function() {
                // Send alert
                alert(
                    "There was an issue loading the Foursquare API. Please refresh your page to try again."
                );
            });//end of Four Square api
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
        var myMarker = markers[i];
        if ((this.locationList()[i].name()).toLowerCase().includes(this.filter().toLowerCase())){
          result.push(this.locationList()[i]);
          markers[i].setVisible(true);
        } else {
          markers[i].setVisible(false);
        }// end of if
      } //end of for loop
      return result; //return mylocationsFilter result array
    },this); //end of mylocationsFilter

    this.showMarkerInforOnClick = function(){
      for (var i=0; i< markers.length; i++){
        if (this.name() == markers[i].title) {
          myMarker = markers[i];
        }
      }
      populateInfoWindow(myMarker, (new google.maps.InfoWindow()));
      myMarker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {myMarker.setAnimation(null);}, 750);
    } //end of showMarkerInforOnClick
  }; // end of ViewModel

  googleError = function googleError() {
      alert(
          'Oops. Google Maps did not load. Please refresh the page and try again!'
      );
  };
