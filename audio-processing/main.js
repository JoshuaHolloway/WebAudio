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


    const weights_lpf = [2.279093e-04, 4.338670e-04, 7.800471e-04, 1.226644e-03, 1.734934e-03, 2.230406e-03, 2.602548e-03, 2.710722e-03, 2.398645e-03, 1.516924e-03, -4.865758e-05, -2.345731e-03, -5.325363e-03, -8.819384e-03, -1.252988e-02, -1.603491e-02, -1.881341e-02, -2.028914e-02, -1.989036e-02, -1.711956e-02, -1.162531e-02, -3.266574e-03, 7.840238e-03, 2.129938e-02, 3.644446e-02, 5.237976e-02, 6.805157e-02, 8.234249e-02, 9.417876e-02, 1.026383e-01, 1.070463e-01, 1.070463e-01, 1.026383e-01, 9.417876e-02, 8.234249e-02, 6.805157e-02, 5.237976e-02, 3.644446e-02, 2.129938e-02, 7.840238e-03, -3.266574e-03, -1.162531e-02, -1.711956e-02, -1.989036e-02, -2.028914e-02, -1.881341e-02, -1.603491e-02, -1.252988e-02, -8.819384e-03, -5.325363e-03, -2.345731e-03, -4.865758e-05, 1.516924e-03, 2.398645e-03, 2.710722e-03, 2.602548e-03, 2.230406e-03, 1.734934e-03, 1.226644e-03, 7.800471e-04, 4.338670e-04, 2.279093e-04];

    const weights_hpf = [-8.838946e-03, 1.206679e-02, 3.576959e-03, -1.027588e-03, -3.022487e-03, -3.361154e-03, -2.729399e-03, -1.604783e-03, -3.167874e-04, 8.927921e-04, 1.844037e-03, 2.413584e-03, 2.527457e-03, 2.159727e-03, 1.361024e-03, 2.565049e-04, -9.758543e-04, -2.113983e-03, -2.932345e-03, -3.250006e-03, -2.950908e-03, -2.033340e-03, -6.201774e-04, 1.068799e-03, 2.715955e-03, 3.999785e-03, 4.619744e-03, 4.384278e-03, 3.248876e-03, 1.344292e-03, -1.033788e-03, -3.466303e-03, -5.477312e-03, -6.627976e-03, -6.591328e-03, -5.246786e-03, -2.711477e-03, 6.484685e-04, 4.260996e-03, 7.449866e-03, 9.543220e-03, 1.000465e-02, 8.552852e-03, 5.235267e-03, 4.672161e-04, -5.003671e-03, -1.020736e-02, -1.409607e-02, -1.574028e-02, -1.450770e-02, -1.021148e-02, -3.203844e-03, 5.610695e-03, 1.484577e-02, 2.282965e-02, 2.777195e-02, 2.815225e-02, 2.280965e-02, 1.132134e-02, -6.002474e-03, -2.804255e-02, -5.291954e-02, -7.828756e-02, -1.015939e-01, -1.203522e-01, -1.325007e-01, 8.632965e-01, -1.325007e-01, -1.203522e-01, -1.015939e-01, -7.828756e-02, -5.291954e-02, -2.804255e-02, -6.002474e-03, 1.132134e-02, 2.280965e-02, 2.815225e-02, 2.777195e-02, 2.282965e-02, 1.484577e-02, 5.610695e-03, -3.203844e-03, -1.021148e-02, -1.450770e-02, -1.574028e-02, -1.409607e-02, -1.020736e-02, -5.003671e-03, 4.672161e-04, 5.235267e-03, 8.552852e-03, 1.000465e-02, 9.543220e-03, 7.449866e-03, 4.260996e-03, 6.484685e-04, -2.711477e-03, -5.246786e-03, -6.591328e-03, -6.627976e-03, -5.477312e-03, -3.466303e-03, -1.033788e-03, 1.344292e-03, 3.248876e-03, 4.384278e-03, 4.619744e-03, 3.999785e-03, 2.715955e-03, 1.068799e-03, -6.201774e-04, -2.033340e-03, -2.950908e-03, -3.250006e-03, -2.932345e-03, -2.113983e-03, -9.758543e-04, 2.565049e-04, 1.361024e-03, 2.159727e-03, 2.527457e-03, 2.413584e-03, 1.844037e-03, 8.927921e-04, -3.167874e-04, -1.604783e-03, -2.729399e-03, -3.361154e-03, -3.022487e-03, -1.027588e-03, 3.576959e-03, 1.206679e-02, -8.838946e-03];

    const al = leftIn.length;
    const wl_lpf = weights_lpf.length;
    const wl_hpf = weights_hpf.length;
    const offset_lpf = ~~(wl_lpf / 2);
    const offset_hpf = ~~(wl_hpf / 2);
    // var output = new Array(al);

    // Low-pass
    for (var i = 0; i < al; i++) {
        const kmin_lpf = (i >= offset_lpf) ? 0 : offset_lpf - i;
        const kmax_lpf = (i + offset_lpf < al) ? wl_lpf - 1 : al - 1 - i + offset_lpf;

        const kmin_hpf = (i >= offset_hpf) ? 0 : offset_hpf - i;
        const kmax_hpf = (i + offset_hpf < al) ? wl_hpf - 1 : al - 1 - i + offset_hpf;

        leftOut[i] = 0;
        rightOut[i] = 0;
        // for (let k = kmin_lpf; k <= kmax_lpf; k++)
            // leftOut[i] += leftIn[i - offset_lpf + k] * weights_lpf[k];

        for (let k = kmin_hpf; k <= kmax_hpf; k++)
            rightOut[i] += rightIn[i - offset_hpf + k] * weights_hpf[k];
            
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




