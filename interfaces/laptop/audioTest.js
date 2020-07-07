const { createAudio } = require('node-mp3-player')
const Audio = createAudio();

const myFile = Audio('/CarterWS/Documents/vuforia-spatial-edge-server/addons/vurforia-spatial-robotic-addon-master/interfaces/laptop/hands.mp3')
myFile.play()