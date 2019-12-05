
import { myCamera as cam } from './camera.js'
import { localizer as loc } from './local.js'
import { scribe } from './infoViewController.js'
import * as hwdData from './data.js'

var init = (function() {
  
  var idDemo = true;
  
  function initilize() {    
    cam.cameraStart();
    loc.updateLocation();
  }
  
  return {
    
    ilize: initilize
  
  };
  
}());

window.addEventListener("load", init.ilize, false);
