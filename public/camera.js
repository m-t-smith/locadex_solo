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
        sample = document.querySelector("#sample-view"),
        sampleCanvas = document.querySelector("sample-in"),
        sampleOut = document.querySelector("sample-out")
      
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

  // function resize(img) {
    // const width = 28;
    // const scaleFactor = width / img.width; 
  // }
  
  // function toGreyscale(images) {
    // var tempCanvas = document.createElement("canvas");
    // var tempImgEl = doc.createElement("img");
    // var tempCtxt = tempCanvas.getContext("2d");
    // const width = cameraSensor.width;
    // const height = cameraSensor.height;
    // var imgData;
    
    // const len = images.length - 1;
      // for(let i = 0; i < len; i ++){
        // tempCtxt.drawImage(images[i], 0, 0);
        // imgData = tempCtxt.getImageData(0, 0, width, height);
        
        // for(let j=0; j < imgData.height; j++) {
          // for(let k=0; k <imgData.width; k++){
            // let indx = (j*4)*imgData.width+(j*4);
            // let r = imgData.data[indx];
            // let g = imgData.data[indx + 1];
            // let b = imgData.data[indx + 2];
            // let avg = (r+g+b)/3;
            // imgData.data[indx] = avg;
            // imgData.data[indx + 1] = avg;
            // imgData.data[indx + 2] = avg;
          // }
        // }
        // img[i] = tempCanvas.toDataURL("img/webp");
      // }
      
  // }

  //draw image to cam-out from video stream 
  function toImageEl(){
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
  }
  
  // function getSample(){
    // //sampleCanvas = document.createElement("canvas");
    // sampleCanvas.width = sample.width;
    // sampleCanvas.height = sample.height;
    // sampleCanvas.getContext("2d").drawImage(sample, 0, 0);
    // sampleOut.src = sampleCanvas.toDataURL("image/webp");
    // let img = sampleOut.src;
    // console.log(img);
    
    // return {
      // img
    // };
  // }

  function capture() { 
    toImageEl();
    sample.src = cameraOutput.src;
    //samples.push(sample.src);
    samples.push(cameraOutput.src);
    cameraOutput.classList.add("taken");
  }
  
  // Take single picture on identify button click
  idButton.onclick = function() {
    toImageEl();
    sample.src = cameraOutput.src;
    cameraOutput.classList.add("taken");
    console.log("image captured");
  };
  
  function check() {
    console.log(samples[0]);
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