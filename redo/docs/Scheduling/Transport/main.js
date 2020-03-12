const synth = new Tone.PluckSynth().toMaster();

//this function is called right before the scheduled time
function triggerSynth(time){
    //the time is the sample-accurate time of the event
    synth.triggerAttackRelease('C2', '8n', time);
}

//schedule a few notes
Tone.Transport.schedule(triggerSynth, 0);
Tone.Transport.schedule(triggerSynth, '0:2');
Tone.Transport.schedule(triggerSynth, '0:2:2.5');

//set the transport to repeat
Tone.Transport.loopEnd = '1m';
Tone.Transport.loop = true;

const button = document.getElementById('play');
button.addEventListener('click', () => {


    //start/stop the transport
    Tone.Transport.toggle();
});