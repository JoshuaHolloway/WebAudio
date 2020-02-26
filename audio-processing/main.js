console.clear();

// instigate our audio context

// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// load some sound
const audioElement = document.querySelector('audio');
const track = audioCtx.createMediaElementSource(audioElement);

const playButton = document.querySelector('.tape-controls-play');

// play pause audio
playButton.addEventListener('click', function () {

    // check if context is in suspended state (autoplay policy)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
        // if track is playing pause it
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }

    let state = this.getAttribute('aria-checked') === "true" ? true : false;
    this.setAttribute('aria-checked', state ? "false" : "true");

}, false);

// if track ends
audioElement.addEventListener('ended', () => {
    playButton.dataset.playing = 'false';
    playButton.setAttribute("aria-checked", "false");
}, false);

// volume
const gainNode = audioCtx.createGain();

const volumeControl = document.querySelector('[data-action="volume"]');
volumeControl.addEventListener('input', function () {
    gainNode.gain.value = this.value;
}, false);

// panning
const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioCtx, pannerOptions);

const pannerControl = document.querySelector('[data-action="panner"]');
pannerControl.addEventListener('input', function () {
    panner.pan.value = this.value;
}, false);

//======================================================
// main.mjs

//======================================================
// Audio Processing:

// Create a ScriptProcessorNode
const bufferSize = 2048;
const processor = audioCtx.createScriptProcessor(bufferSize);

// Assign the onProcess function to be called for every buffer
processor.onaudioprocess = onProcess;

function onProcess(e) {
    let leftIn = e.inputBuffer.getChannelData(0);
    let rightIn = e.inputBuffer.getChannelData(1);
    let leftOut = e.outputBuffer.getChannelData(0);
    let rightOut = e.outputBuffer.getChannelData(1);

    // let weights = [0.0525, 0,-0.0379,0,0.0537,0,-0.0771,0,0.1172,0,-0.060,0,
    //     0.6345,1.0000,0.6345,0,-0.2060,0,0.1172,0,-0.0771,0,0.0537,0,-0.0379,      0,0.0525];


    const weights = [2.279093e-04, 4.338670e-04, 7.800471e-04, 1.226644e-03, 1.734934e-03, 2.230406e-03, 2.602548e-03, 2.710722e-03, 2.398645e-03, 1.516924e-03, -4.865758e-05, -2.345731e-03, -5.325363e-03, -8.819384e-03, -1.252988e-02, -1.603491e-02, -1.881341e-02, -2.028914e-02, -1.989036e-02, -1.711956e-02, -1.162531e-02, -3.266574e-03, 7.840238e-03, 2.129938e-02, 3.644446e-02, 5.237976e-02, 6.805157e-02, 8.234249e-02, 9.417876e-02, 1.026383e-01, 1.070463e-01, 1.070463e-01, 1.026383e-01, 9.417876e-02, 8.234249e-02, 6.805157e-02, 5.237976e-02, 3.644446e-02, 2.129938e-02, 7.840238e-03, -3.266574e-03, -1.162531e-02, -1.711956e-02, -1.989036e-02, -2.028914e-02, -1.881341e-02, -1.603491e-02, -1.252988e-02, -8.819384e-03, -5.325363e-03, -2.345731e-03, -4.865758e-05, 1.516924e-03, 2.398645e-03, 2.710722e-03, 2.602548e-03, 2.230406e-03, 1.734934e-03, 1.226644e-03, 7.800471e-04, 4.338670e-04, 2.279093e-04];



    // weights = [1,1,1];

    // for (let i = 0; i < leftIn.length; i++) {
    //     // flip left and right channels
    //     // leftOut[i] = Math.random() * rightIn[i];
    //     rightOut[i] = leftIn[i];
    //     // let sum = 0;
    //     // for (let k = 0; k < 3; k++)
    //     //     sum += leftIn[i+k];
    // }

    var al = leftIn.length;
    var wl = weights.length;
    var offset = ~~(wl / 2);
    // var output = new Array(al);

    // Low-pass
    for (var i = 0; i < al; i++) {
        var kmin = (i >= offset) ? 0 : offset - i;
        var kmax = (i + offset < al) ? wl - 1 : al - 1 - i + offset;

        leftOut[i] = 0;
        for (var k = kmin; k <= kmax; k++)
            leftOut[i] += leftIn[i - offset + k] * weights[k];
        
    }




    
    // leftOut = convolve(leftIn, h);
    // leftOut = leftIn;
    // console.log(leftOut);
    console.log('leftIn.length = ', leftIn.length);
    console.log('leftOut.length = ', leftOut.length);

}
//======================================================

// connect our graph
//track.connect(gainNode).connect(panner).connect(audioCtx.destination);
track.connect(gainNode).connect(panner).connect(processor).connect(audioCtx.destination);

const powerButton = document.querySelector('.control-power');

powerButton.addEventListener('click', function () {
    if (this.dataset.power === 'on') {
        audioCtx.suspend();
        this.dataset.power = 'off';
    } else if (this.dataset.power === 'off') {
        audioCtx.resume();
        this.dataset.power = 'on';
    }
    this.setAttribute("aria-checked", state ? "false" : "true");
    console.log(audioCtx.state);
}, false);

// Track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons 




