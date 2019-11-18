
//check if geologocation is possible

function locate() {
  
  const current_loc = document.querySelector('#location');
  
  if(navigator.geolocation){
    
    current_loc.textContent = "Processing...";
    
    var watchID = navigator.geolocation.watchPosition(
                                          loc_success,
                                          loc_error,
                                          loc_options);
  } else {
    console.log("Geolocation is not available");
  }

  var loc_options = { 
    enableHighAccuracy: true,
    maximumAge        : 20000,
    timeout           : 30000
  };

  
  function displayPos(coords) {
    current_loc.textContent = coords;
  }

  function loc_error() { 
    current_loc.textContent = "localization error: turn on location services and reload page";
  }
  
  function loc_success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    
    const loc = `Latitude: ${lat} , Longitude: ${lng}`;
    displayPos(loc);
  }

}

locate();
  