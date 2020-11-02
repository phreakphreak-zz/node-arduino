const pedometer = require('pedometer').pedometer;
    
const options={
    windowSize:1, //Length of window in seconds
    minPeak:2, //minimum magnitude of a steps largest positive peak
    maxPeak:8, //maximum magnitude of a steps largest positive peak
    minStepTime: 0.3, //minimum time in seconds between two steps
    peakThreshold: 0.5, //minimum ratio of the current window's maximum to be considered a step
    minConsecutiveSteps: 3, //minimum number of consecutive steps to be counted
    maxStepTime: 0.8, //maximum time between two steps to be considered consecutive
    meanFilterSize: 1, //Amount of smoothing (Values <=1 disable the smoothing)
    debug:false //Enable output of debugging data in matlab/octave format
};
const steper = {
    pedometer,
    options
}

module.exports = steper;
// const steps=pedometer(data.acc,data.att,100,options);
// console.log("The algorithm detected "+steps.length+" steps.");
