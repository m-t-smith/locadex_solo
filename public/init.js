
import { myCamera as cam } from './camera.js'
import { localizer as loc } from './local.js'

var init = (function() {
  
  function initilize() {    
    cam.cameraStart();
    loc.updateLocation();
  }
  
  return {
    
    ilize: initilize
  
  };
  
}());

window.addEventListener("load", init.ilize, false);
