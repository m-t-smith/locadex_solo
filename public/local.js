
//check if geologocation is possible

var localizer = (function() {
  
  const current_loc = document.querySelector('#location');

  var loc_options = { 
    enableHighAccuracy: true,
    maximumAge        : 20000,
    timeout           : 50000
  };

  
  function displayPos(coords) {
    current_loc.textContent = coords;
  }

  function loc_error() { 
    current_loc.textContent = "localization error: turn on location services and reload";
  }
  
  function loc_success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    
    const loc = `Latitude: ${lat} , Longitude: ${lng}`;
    displayPos(loc);
  }
  
  function locate() {
    var watchID = navigator.geolocation.watchPosition(
                                            loc_success,
                                            loc_error,
                                            loc_options);
  }
  
  function updateLocation(){
  
    if(navigator.geolocation){
      
      current_loc.textContent = "Processing...";
      
      locate();
      
    } else {
      console.log("Geolocation is not available");
    }
    
  }

  return {
    
    updateLocation: updateLocation
    
  };
    
    
}());

export { localizer };
  