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
// console.dir(vol_slider);

let volume;
vol_slider.addEventListener('change', () => {
    volume = Number(vol_slider.value);
    console.log('volume = ' + volume + ', type: ' + typeof volume);
});

//const N = 16;
// let track_1 = new Array(16);
// let track_2 = new Array(16);
// for (let i = 0; i < N; ++i) {
//     track_1[i] = 0;
//     track_2[i] = 0;
// }

let track_1 = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let track_2 = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

function callback(time) {
    const velocity = volume;

    const BarsBeatsSixteenths = Tone.Transport.position;
    const Bars_Beats_Sixteenths = BarsBeatsSixteenths.split(':');
    // .position ↝ BarsBeatsSixteenths #
    // The Transport’s position in Bars:Beats:Sixteenths. Setting the value will jump to that position right away.
    //      BarsBeatsSixteenths
    //      A colon-separated representation of time in the form of Bars:Beats:Sixteenths.

    const bar = Number(Bars_Beats_Sixteenths[0]);
    // console.log(`bar: ${bar}`);

    const beat = Number(Bars_Beats_Sixteenths[1]);
    // console.log(`beat: ${beat}`);

    const sixteenth = Number(Bars_Beats_Sixteenths[2]);
    // console.log(`sixteenth: ${sixteenth}`);



    const idx = (bar * 4) + (beat);
    document.querySelector('#bar').innerHTML = 'Bar: ' + bar;
    document.querySelector('#beat').innerHTML = 'Beat ' + beat;
    document.querySelector('#index').innerHTML = 'Index: ' + idx;


    const beats_1 = document.querySelectorAll('.beats-1');
    const beats_2 = document.querySelectorAll('.beats-2');
    // console.dir(beats_1);

    beats_1[bar].style.background = 'yellow';
    beats_2[bar].style.background = 'yellow';
    if (bar > 0) {
        beats_1[bar - 1].style.background = 'green';
        beats_2[bar - 1].style.background = 'green';
    }



    if (track_1[idx]) {
        bassSynth.triggerAttackRelease('c1', '8n', time, velocity);
    }
    if (track_2[idx]) {
        //play a middle 'C' for the duration of an 8th note
        synth.triggerAttackRelease('C4', '8n', time, velocity)
    }

    // console.log(time);
}

// Grab each individual beat and  
const beat_1 = document.querySelectorAll('.beat-1');
beat_1.forEach(function (value, i) {

    beat_1[i].addEventListener('click', () => {
        if (track_1[i]) beat_1[i].style.background = 'rgba(255, 154, 72)';
        else beat_1[i].style.background = 'black';

        track_1[i] = !track_1[i];
    });
    //console.log('%d: %s', i, value);
});


const beat_2 = document.querySelectorAll('.beat-2');
beat_2.forEach(function (value, i) {

    beat_2[i].addEventListener('click', () => {
        if (track_2[i]) beat_2[i].style.background = 'rgba(255, 154, 72)';
        else beat_2[i].style.background = 'black';

        track_2[i] = !track_2[i];
    });
    //console.log('%d: %s', i, value);
});