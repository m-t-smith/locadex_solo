//tensorflow.js test/prototype


function log(){ 
  console.log("goodbye world");
  };


/*
//import tensorflow.js
import * as tf from '@tensorflow/tfjs';

//declare layer function variables
const {conv2d, maxPooling2d, flatten, dense} = layers;

//model constructor 
export class MnistModelBuilder {
  static LEARNING_RATE = 0.15;

  static build() {
    const model = sequential();
    model.add(conv2d({inputShape: [28, 28, 1], kernelSize: 3, filters: 16, activation: 'relu'}));
    model.add(maxPooling2d({poolSize: 2, strides: 2}));
    model.add(conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
    model.add(maxPooling2d({poolSize: 2, strides: 2}));
    model.add(conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
    model.add(flatten());
    model.add(dense({units: 64, activation: 'relu'}));
    model.add(dense({units: 10, activation: 'softmax'}));
    model.compile(
      {optimizer: MnistModelBuilder.optimizer, loss: 'categoricalCrossentropy', metrics: ['accuracy']}
    );
    return model;
  }

  static get optimizer() {
    return train.sgd(MnistModelBuilder.LEARNING_RATE);
  }
}

//training parameters
static BATCH_SIZE = 128;
static VALIDATION_SPLIT = 0.15;
trainEpochs = 5;

async loadData() {
  await this._data.load();
  this._trainData = this._data.trainData;
  this._testData = this._data.testData;
  this._totalNumBatches = Math.ceil(
    this._trainData.xs.shape[0] *
    (1 - MnistModel.VALIDATION_SPLIT) /
    MnistModel.BATCH_SIZE
  ) * this.trainEpochs;
}

//training 
async train(onBatchProcessed, onEpochProcessed, onFinished) {
  // During the long-running fit() call for model training, we include
  // callbacks, so that we can plot the loss and accuracy values in the page
  // as the training progresses.
  await this._model.fit(
    this._trainData.xs, 
    this._trainData.labels, 
    {
      batchSize: MnistModel.BATCH_SIZE,
      validationSplit: MnistModel.VALIDATION_SPLIT,
      epochs: this.trainEpochs,
      callbacks: {
        onBatchEnd: (batch, logs) => this.onTrainingBatchEnd(batch, logs, onBatchProcessed),
        onEpochEnd: (epoch, logs) => this.onTrainEpochEnd(epoch, logs, onEpochProcessed)
      }
  });
  const testResult = this._model.evaluate(this._testData.xs, this._testData.labels);
  onFinished(testResult);
}

//image
const image = new Image();
image.onload = () => {
  const canvas = document.createElement('canvas');
  canvas.width = outputSize;
  canvas.height = outputSize;
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, outputSize, outputSize);

  const imageData = context.getImageData(0, 0, outputSize, outputSize);
};
image.src = base64Image;

//image to tensor
const inputTensor = fromPixels(imageData, 1)
  .reshape([1, 28, 28, 1])
  .cast('float32')
  .div(scalar(255));
  
//prediction
const predictionResult =  this._model.predict(inputTensor).dataSync();
const recognizedDigit = predictionResult.indexOf(Math.max(...predictionResult));
*/

