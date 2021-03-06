//neural network model for hand written digits
//identification demo (idDemo)

import {MnistData} from './data.js';

var ml = (function () {

  async function showExamples(data) {
    // Create a container in the visor
    const surface =
      tfvis.visor().surface({ name: 'Input Data Examples', tab: 'Input Data'});  

    // Get the examples
    const examples = data.nextTestBatch(20);
    const numExamples = examples.xs.shape[0];
    
    // Create a canvas element to render each example
    for (let i = 0; i < numExamples; i++) {
      const imageTensor = tf.tidy(() => {
        // Reshape the image to 28x28 px
        return examples.xs
          .slice([i, 0], [1, examples.xs.shape[1]])
          .reshape([28, 28, 1]);
      });
      
      const canvas = document.createElement('canvas');
      canvas.width = 28;
      canvas.height = 28;
      canvas.style = 'margin: 4px;';
      await tf.browser.toPixels(imageTensor, canvas);
      surface.drawArea.appendChild(canvas);

      imageTensor.dispose();
    }
  }

  async function displaySingle(data) {
    var example = data.nextTestBatch(1);
    var imageTensor = tf.tidy(() => {
      //reshape image to 28x28
      return example.xs
        .slice([0, 0], [1, example.xs.shape[1]])
        .reshape([28, 28, 1]);
    });
    
    var canvas = document.getElementById("myCanvas");
    
    //canvas.width = 28;
    //canvas.height = 28;
    //canvas.style = 'margin: 4px;';
    
    await tf.browser.toPixels(imageTensor, canvas);
    
    imageTensor.dispose();
    
    return example;
  }

  //load data, create and train model
  async function init() {
    var data = new MnistData();
    await data.load();
    
    var model = getModel();
    
    await train(model, data);
    
    var trainedModel = await model.save('localstorage://hwd-model');
    
    await console.log("model is trained and saved in local storage");
    
  }
  //retrieve single example. load saved model, predict and display class of example image
  async function runSingle() {  
    const data = new MnistData();
    await data.load();
   //display single image example and store for prediction
    var singleImage = await displaySingle(data);
    //load trained model
    var model = await tf.loadLayersModel('localstorage://hwd-model');
    //use model to classify single image example
    await predictSingle(model, singleImage);
  }

  async function modelFromLocal() {
    var model = await tf.loadLayersModel('localstorage://hwd-model');
    //await tf.io.removeModel('localstorage://hwd-model');
    //console.log(model);
    return model;
  }


  //load data, train model, and display visualizations and metrics
  async function runVisual() {  
    const data = new MnistData();
    await data.load();
    await showExamples(data);
    
    var model = getModel();
    tfvis.show.modelSummary({name: 'Model Architecture'}, model);
    
    await trainVisual(model, data);
    
    await showAccuracy(model, data);
    await showConfusion(model, data);
  }

  async function predictSingle(model, data, testDataSize = 1){
    
    var IMAGE_WIDTH = 28;
    var IMAGE_HEIGHT = 28;
    //var testxs = data.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
    var testxs = data.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
    //use model to predict class of example data
    var pred = model.predict(testxs).argMax([-1]);
    //convert prediction result to string
   // var resultString = pred.toString();
    const resultArr = pred.toInt();

    const result = resultArr.dataSync();

    const intRes = result[0];
    console.log(intRes);
    //update page output element with prediction result
    //document.getElementById("result").value = resultString;
    
    //return prediction
    return intRes;
    
  }

  // //This is old UI code I used to get used to using tensorflow.js
  // //just ignore it

  // //initialize array of button elements from html buttonForm
  // var buttons = document.forms["buttonForm"].elements["clickable"];
  // //iterate through button elements
  // for(var button of buttons) {
   // //define behavior of buttons on click events
   // button.onclick = function(form) { 
    // //train model button logic
    // if (this.value == 'train') {

      // init();
      // console.log("retrieving data, creating and training model");
    // //example button logic
    // } else if (this.value == 'example') {

      // runSingle();
      // console.log("displaying single classification example");
      // //visualization button logic
      // } else {

      // runVisual();

      // console.log("running visual example");

      // }
  // //stop form submission so page won't refresh on button click
      // form.preventDefault(); 

    // }
  // }

  function getModel() {
    const model = tf.sequential();
    
    const IMAGE_WIDTH = 28;
    const IMAGE_HEIGHT = 28;
    const IMAGE_CHANNELS = 1;  
    
    // In the first layer of our convolutional neural network we have 
    // to specify the input shape. Then we specify some parameters for 
    // the convolution operation that takes place in this layer.
    model.add(tf.layers.conv2d({
      inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
      kernelSize: 5,
      filters: 8,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'varianceScaling'
    }));

    // The MaxPooling layer acts as a sort of downsampling using max values
    // in a region instead of averaging.  
    model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
    
    // Repeat another conv2d + maxPooling stack. 
    // Note that we have more filters in the convolution.
    model.add(tf.layers.conv2d({
      kernelSize: 5,
      filters: 16,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'varianceScaling'
    }));
    model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
    
    // Now we flatten the output from the 2D filters into a 1D vector to prepare
    // it for input into our last layer. This is common practice when feeding
    // higher dimensional data to a final classification output layer.
    model.add(tf.layers.flatten());

    // Our last layer is a dense layer which has 10 output units, one for each
    // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9).
    const NUM_OUTPUT_CLASSES = 10;
    model.add(tf.layers.dense({
      units: NUM_OUTPUT_CLASSES,
      kernelInitializer: 'varianceScaling',
      activation: 'softmax'
    }));

    
    // Choose an optimizer, loss function and accuracy metric,
    // then compile and return the model
    const optimizer = tf.train.adam();
    model.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });

    return model;
  }

  async function train(model, data) {
    const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
    const container = {
      name: 'Model Training', styles: { height: '1000px' }
    };
    
    const BATCH_SIZE = 512;
    const TRAIN_DATA_SIZE = 5500;
    const TEST_DATA_SIZE = 1000;

    const [trainXs, trainYs] = tf.tidy(() => {
      const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
      return [
        d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
        d.labels
      ];
    });

    const [testXs, testYs] = tf.tidy(() => {
      const d = data.nextTestBatch(TEST_DATA_SIZE);
      return [
        d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
        d.labels
      ];
    });

    return model.fit(trainXs, trainYs, {
      batchSize: BATCH_SIZE,
      validationData: [testXs, testYs],
      epochs: 10,
      shuffle: true
    });
    
  }

  async function trainVisual(model, data) {
    const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
    const container = {
      name: 'Model Training', styles: { height: '1000px' }
    };
    const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);
    
    const BATCH_SIZE = 512;
    const TRAIN_DATA_SIZE = 5500;
    const TEST_DATA_SIZE = 1000;

    const [trainXs, trainYs] = tf.tidy(() => {
      const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
      return [
        d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
        d.labels
      ];
    });

    const [testXs, testYs] = tf.tidy(() => {
      const d = data.nextTestBatch(TEST_DATA_SIZE);
      return [
        d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
        d.labels
      ];
    });

    return model.fit(trainXs, trainYs, {
      batchSize: BATCH_SIZE,
      validationData: [testXs, testYs],
      epochs: 10,
      shuffle: true,
      callbacks: fitCallbacks
    });
    
  }


  const classNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

  function doPrediction(model, data, testDataSize = 500) {
    const IMAGE_WIDTH = 28;
    const IMAGE_HEIGHT = 28;
    const testData = data.nextTestBatch(testDataSize);
    const testxs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
    const labels = testData.labels.argMax([-1]);
    const preds = model.predict(testxs).argMax([-1]);

    testxs.dispose();
    return [preds, labels];
  }


  async function showAccuracy(model, data) {
    const [preds, labels] = doPrediction(model, data);
    const classAccuracy = await tfvis.metrics.perClassAccuracy(labels, preds);
    const container = {name: 'Accuracy', tab: 'Evaluation'};
    tfvis.show.perClassAccuracy(container, classAccuracy, classNames);

    labels.dispose();
  }

  async function showConfusion(model, data) {
    const [preds, labels] = doPrediction(model, data);
    const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
    const container = {name: 'Confusion Matrix', tab: 'Evaluation'};
    tfvis.render.confusionMatrix(
        container, {values: confusionMatrix}, classNames);

    labels.dispose();
  }

  return {
    get model() {
      return modelFromLocal();
    },
    init: init,
    getPredictId: predictSingle
  };

}());

export { ml };