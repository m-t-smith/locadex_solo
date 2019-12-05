//camera script file (credit to Aaron Benjamin for the helpful tutorial:
// https://blog.prototypr.io/make-a-camera-web-app-tutorial-part-1-ec284af8dddf)

// constraints for video stream, facingmode either user or environment

var myCamera = (function() {

  var constraints = { video: { facingMode: "environment" }, audio: false };
  
  //declare array to store captured images on observation button click event
  var samples = [];
  
  // Define constants
  const cameraView = document.querySelector("#cam-view"),
        cameraOutput = document.querySelector("#cam-out"),
        cameraSensor = document.querySelector("#cam-in"),
        idButton = document.querySelector("#identify"),
        obButton = document.querySelector("#observe"),
        sampleView = document.querySelector("#sample-view"),
        // sampleCanvas = document.querySelector("#sample-in"),
        sampleOut = document.querySelector("#sample-out")
      
  // Access device camera and stream to cam-view element
  function cameraStart() {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(stream) {
      //let track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    })
    .catch(function(error) {
      console.error("Error: ", error);
    });
  }

  //draw image to cam-out from video stream 
  function toImageEl(){
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
  }

  function capture() { 
    toImageEl();
    //reduce image size via css for faster processing
    sampleView.src = cameraOutput.src;
    sampleView.onload = () => {
      //only take one channel for greyscale
      const tensor = tf.browser.fromPixels(sampleView, 1);
       samples.push(tensor);
      tf.browser.toPixels(tensor, sampleOut);
      
    }
    cameraOutput.classList.add("taken");
    //tensor.dispose();
  }
  
  // Take single picture on identify button click
  idButton.onclick = function() {
    toImageEl();
    //reduce image size via css for faster processing
    sampleView.src = cameraOutput.src;
    sampleView.onload = () => {
      //only take one channel for greyscale
      const tensor = tf.browser.fromPixels(sampleView, 1);
      samples.push(tensor);
      tf.browser.toPixels(tensor, sampleOut);
      console.log("sampled image tensor info: ");
      tensor.print(true);
      
    }
    cameraOutput.classList.add("taken");
    console.log("image captured");
  };
  
  function check() {
    const sam = samples[0];
    console.log(sam.shape);
    sam.print();
    console.log("number of samples taken: " + samples.length);
  }
  
  // Take multiple pictures on observe button click
  obButton.onclick = function() { 
    var tick = 0;
    let timerId = setInterval(function() {
       capture();
    }, 200);
    setTimeout((clearInterval, check), 5000, timerId);

  };

  return {
    
    cameraStart: cameraStart
    
  };

}());

export { myCamera };

// video stream on window load event
//window.addEventListener("load", cameraStart, false);