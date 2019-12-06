
import { myCamera as cam } from './camera.js'
import { localizer as loc } from './local.js'
import { identifier  as id} from './identifier.js'
import { scribe } from './infoViewController.js'


var init = (function() {
  
  //control flags determine execution path on startup
  var mlDemo = false; //trains and saves example model
  var hwdDemo = true; //loads example data
  
  function startApp() {    
    cam.cameraStart();
    loc.updateLocation();
    id.mode = mlDemo;
    scribe.mode = hwdDemo;
    id.init();
    scribe.init();
  }
  
  return {
    
    startApp: startApp
  
  };
  
}());

window.addEventListener("load", init.startApp, false);
