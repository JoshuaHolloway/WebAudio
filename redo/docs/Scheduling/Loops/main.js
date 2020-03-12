const synth = new Tone.MembraneSynth().toMaster()

//create a loop
const loop = new Tone.Loop(function(time){
	synth.triggerAttackRelease("C1", "8n", time)
}, "4n")

//play the loop between 0-2m on the transport
loop.start(0).stop('2m')

//start/stop the transport
const play = document.querySelector('#play');
play.addEventListener('click', (event) => {
    console.log('clicked');
    return Tone.Transport.toggle();
});