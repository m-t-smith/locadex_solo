//camera script file (credit to Aaron Benjamin for the helpful tutorial:
// https://blog.prototypr.io/make-a-camera-web-app-tutorial-part-1-ec284af8dddf)

// constraints for video stream, facingmode either user or environment
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#cam-view"),
      cameraOutput = document.querySelector("#cam-out"),
      cameraSensor = document.querySelector("#cam-in"),
      idButton = document.querySelector("#identify"),
      obButton = document.querySelector("#observe")
    
// Access device camera and stream to cam-view element
function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {
    let track = stream.getTracks()[0];
    cameraView.srcObject = stream;
  })
  .catch(function(error) {
    console.error("Error: ", error);
  });
}

function resize(img) {
  const width = 28;
  const scaleFactor = width / img.width; 
}

//draw image to cam-out from video stream 
function toImageEl(){
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("image/webp");
}

function capture(tick) { 
  toImageEl();
  //consttf.browser.fromPixels(cameraOutput, 1);
  cameraOutput.classList.add("taken");
  console.log(tick);
}
// Take single picture on identify button click
idButton.onclick = function() {
  toImageEl();
  cameraOutput.classList.add("taken");
  console.log("image captured");
};

// Take multiple pictures on observe button click
obButton.onclick = function() { 
  var tick = 0;
  let timerId = setInterval(function() {
    //console.log(tick++);
    capture(tick++);
  }, 50, tick);
  setTimeout(clearInterval, 80000, timerId);
  
  //need to put code below somewhere else, should just collect images here 
  
  //cameraOutput.onload = function() {
   // const greyTensor = tf.browser.fromPixels(cameraSensor, 3);
                                      // .mean(2)
                                      // .toFloat()
                                      // .expandDims(2);
    // const denom = tf.scalar(255);
    // const frac = greyTensor.div(denom);
    // console.log(frac.toString());
    // var greyImg = tf.browser.toPixels(frac, cameraSensor);
    // cameraOutput.src = cameraSensor.toDataUrl("image/webp");
    // cameraOutput.classList.add("taken");
    
 // }
};

// video stream on window load event
window.addEventListener("load", cameraStart, false);