//creates 4 instances of the Tone.Synth
const polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();

const chord = document.querySelector('#chord');
chord.addEventListener('mousedown', () => { 
	//an array of notes can be passed into PolySynth
	polySynth.triggerAttack(['C4', 'E4', 'G4', 'B4']) 
})

chord.addEventListener('mouseup', () => { 
	//unlike the other instruments, the notes need to be passed into triggerRelease
	polySynth.triggerRelease(['C4', 'E4', 'G4', 'B4']) 
})