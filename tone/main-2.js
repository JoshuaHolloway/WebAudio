let loopBeat;


//create a synth and bass and connect them to the master output (your speakers)
let bassSynth = new Tone.MembraneSynth().toMaster();
let synth = new Tone.Synth().toMaster()

const play_button = document.getElementById('play_button');
play_button.addEventListener('click', () => {


});




//attach a click listener to a play button
document.querySelector('#play_button').addEventListener('click', async () => {
    // -The await expression causes async function execution to pause until 
    //  a Promise is settled (that is, fulfilled or rejected), and to resume 
    //  execution of the async function after fulfillment.
    await Tone.start();
    console.log('audio is ready');

    loopBeat = new Tone.Loop(callback, '4n');
    Tone.Transport.bpm.value = 140;
    Tone.Transport.start();

    loopBeat.start(0);
})







const stop_button = document.getElementById('stop_button');
stop_button.addEventListener('click', () => {
    loopBeat.stop();
});

const vol_slider = document.getElementById('volume');
console.dir(vol_slider);

let volume;
vol_slider.addEventListener('change', () => {
    volume = Number(vol_slider.value);
    console.log('volume = ' + volume + ', type: ' + typeof volume);
});

function callback(time) {
    const velocity = volume;
    bassSynth.triggerAttackRelease('c1', '8n', time, velocity);
    console.log(time);

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease('C4', '8n', time, velocity)



    const currentBeat = Tone.Transport.position;
    const x = currentBeat.split(':');
    console.log(x);
    console.log(currentBeat);
    console.log(typeof currentBeat);



}