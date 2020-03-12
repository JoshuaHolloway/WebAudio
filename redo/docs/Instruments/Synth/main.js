//-----------------------------
//Synths are capable of a wide range of sounds depending on their settings
const synthA = new Tone.Synth({
  oscillator: {
    type: 'fmsquare',
    modulationType: 'sawtooth',
    modulationIndex: 3,
    harmonicity: 3.4
  },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 0.1,
    release: 0.1
  }
}).toMaster();
//-----------------------------
const synthB = new Tone.Synth({
  oscillator: {
    type: 'triangle8'
  },
  envelope: {
    attack: 2,
    decay: 1,
    sustain: 0.4,
    release: 4
  }
}).toMaster();
//-----------------------------
//mouse events
const synth_A = document.querySelector('#synth-A');
synth_A.addEventListener('mousedown', function() {
  synthA.triggerAttack('C4');
})
synth_A.addEventListener('mouseup', function() {
  synthA.triggerRelease();
});
//=============================
const synth_B = document.querySelector('#synth-B');
synth_B.addEventListener('mousedown', function() {
    console.log('Synth B Mouse Down');
    synthB.triggerAttack('C4');
})
synth_B.addEventListener('mouseup', function() {

    console.log('Synth B Mouse Up');
    synthB.triggerRelease();
});
//=============================