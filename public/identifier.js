//performs identification of subjects
import { ml } from './mlModel.js'
import { scribe } from './infoViewController.js' 

class SubjectData {
    constructor(options){
      this.name = name;
      ({categories : this.categories,
      catData : this.catData} = options);
    }
    setAttributes(options) {
            if (options.categories) {
              this.options.categories = options.categories;
            }
            if (options.catData) {
              this.options.catData = options.catData;
            }
            if (options.geo) {
              this.options.geo = options.geo;
            }
            if (options.imgTensor) {
              this.options.imgTensor = options.imgTensor;
              //check
              console.log("tensor in setImageTensor: ", imgTensor);
            }
            if (options.imgSrc) {
              this.options.imgSrc = options.imgSrc;
            }

          }
  }
  
var identifier = (function () {
  
  //app mode
  var isDemo = false; 
  
  //data object of identification subject
  
  
  function init() {
    //check
    console.log("In demo mode? " + isDemo);
    if(isDemo) {
      ml.init();
    } else {
      //network locator loads neural network
      //for current location or tells textViewController
      //that there isn't any info for this location
    }
  }
  
  function identify(myTensor) {
    
    let tensor = myTensor;
    //console.log("tensor in identify: ", tensor);
    
    function loadModel(tensor){
      return new Promise(function(resolve, reject) {
        var model = ml.model;
        if (model) {
          resolve(model);
        } else {
          reject(new Error("model failed to load"));
        }
      });
    }
    
    function useModel(model, tensor){
      return new Promise(function(resolve, reject) {
        var result = ml.getPredictId(model, tensor);
       // console.log("subject identity: " + result);
        if(result){
          resolve(result);
          console.log(result);
        } else {
          reject(new Error("prediction set failed"));
        }
      });
    }
    
    let promise = loadModel(myTensor);
    
    promise.then(function(promisedModel, broken) {
      return useModel(promisedModel, tensor);
       //useModel(promisedModel, tensor);
    }).then(function(promisedId, broken){
      
      scribe.loadSubjectData(promisedId);

    });
  }
   
  return {
    set mode(bool) {
        isDemo = bool;
    },
    get mode() {
        return isDemo;
    },
//    SubjectData: SubjectData,
//    subjectData: subjectData,
    identify: identify,
    init: init
  };

}());

export { identifier, SubjectData };