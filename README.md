Repository Location: https://github.com/manyuncai/map

### My Vacation Map
* This is a single page application featuring a map of a neighborhood I would like to visit. This map including highlighted locations, third-party data about those locations and various ways to browse the content.

### Setup and  Running the Application
* Download project <a href= "https://github.com/manyuncai/map" > My Vacation Map </a> and unzip files to a directory of your choice
* Open <a style="color:red">index.html </a> with browser(Chrome, IE  or Firefox)

### Asynchronous Data Usage: Utilized APIs
* Google Maps API : show maps and markers of interested places
* Four Square API: search ramen noodle restaurants and display the 1st one on the list. The name, address and distance from the marker are displayed in the <a style="color:red">inforviewWindow </a>

### CSS Style
* W3.CSS, a CSS framework with built-in responsiveness is used from <a href=
  "https://www.w3schools.com/w3css/4/w3.css"> W3.CSS </a>

### JS library and File description
* Knockout Framework <a  href= " https://knockoutjs.com/"> knockout.js </a>used to handle the list, filter, and any other information on the page that is subject to changing state. The library is downloaded in <a style="color:red"> /js/lib/knockout-3.2.0.js  </a>
* <a style="color:red"> /js/app.js </a> is js file including data and manipulate view model for the application
* <a style="color:red"> /index.html </a> is the .html file to display application to browser
* <a style="color:red"> jQuery's ajax() and .fail() </a> method is used to handle the Four Square API Json data and error handling.
* Used <a style="color:red"> onerror </a> event handler to handle Google Maps in synch and Fallback
