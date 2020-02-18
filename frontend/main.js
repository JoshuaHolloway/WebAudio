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

    const BarsBeatsSixteenths = Tone.Transport.position;
    const Bars_Beats_Sixteenths = BarsBeatsSixteenths.split(':');
    console.log(Bars_Beats_Sixteenths);

    // .position ↝ BarsBeatsSixteenths #
    // The Transport’s position in Bars:Beats:Sixteenths. Setting the value will jump to that position right away.
    //      BarsBeatsSixteenths
    //      A colon-separated representation of time in the form of Bars:Beats:Sixteenths.

    const bar = Number(Bars_Beats_Sixteenths[0]);
    console.log(`bar: ${bar}`);

    const beat = Number(Bars_Beats_Sixteenths[1]);
    console.log(`beat: ${beat}`);

    const sixteenth = Number(Bars_Beats_Sixteenths[2]);
    console.log(`sixteenth: ${sixteenth}`);

    const bar_elem = document.querySelector('#bar');
    const beat_elem = document.querySelector('#beat');
    bar_elem.innerHTML = 'Bar: ' + bar;
    beat_elem.innerHTML = 'Beat ' + beat;

    const beats_1 = document.querySelectorAll('.beats-1');
    const beats_2 = document.querySelectorAll('.beats-2');
    console.dir(beats_1);

    beats_1[bar].style.background = 'yellow';
    beats_2[bar].style.background = 'yellow';
    if (bar > 0) {
        beats_1[bar - 1].style.background = 'green';
        beats_2[bar - 1].style.background = 'green';
    }
}

// Grab each individual beat and  
const beat_1 = document.querySelectorAll('.beat-1');
for (let b of beat_1) {
    b.addEventListener('click', () => {
        b.style.background = 'purple';
    });
}

const beat_2 = document.querySelectorAll('.beat-2');
for (let b of beat_2) {
    b.addEventListener('click', () => {
        b.style.background = 'purple';
    });
}