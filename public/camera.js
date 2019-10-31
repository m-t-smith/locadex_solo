//camera script file (credit to Aaron Benjamin for the helpful tutorial:
// https://blog.prototypr.io/make-a-camera-web-app-tutorial-part-1-ec284af8dddf)

// constraints for video stream, facingmode either user or environment
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#cam-view"),
    cameraOutput = document.querySelector("#cam-out"),
    cameraSensor = document.querySelector("#cam-in"),
    cameraTrigger = document.querySelector("#capture")
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
// Take picture on capture button click
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    console.log("image captured");
};
// video stream on window load event
window.addEventListener("load", cameraStart, false);