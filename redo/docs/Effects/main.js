const distortion = new Tone.Distortion(0.6);
const tremolo = new Tone.Tremolo().start();

var polySynth = new Tone.PolySynth(4, Tone.Synth).chain(distortion, tremolo, Tone.Master);

const chord = document.querySelector('#chord');
chord.addEventListener('mousedown', () => { 
	polySynth.triggerAttack(['C4', 'E4', 'G4', 'B4']) 
})

chord.addEventListener('mouseup', () => { 
	polySynth.triggerRelease(['C4', 'E4', 'G4', 'B4']) 
})