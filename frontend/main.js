// Globals
let loopBeat;
let Track_0, Track_1, Track_2;

class Track {

    // Fields
    name = 'Untitled Track';
    player = null;

    constructor(name) {
        this.name = name;
        this.player = new Tone.Player('./' + name).toMaster();
    }

    // Methods
    change(name) {
        this.player = new Tone.Player('./' + name).toMaster();
    }
}

let Tracks = [new Track('hh_sample.mp3'), new Track('clap_sample.mp3'), new Track('bass_sample.mp3')];

//create a synth and bass and connect them to the master output (your speakers)
// let bassSynth = new Tone.MembraneSynth().toMaster();
// let synth = new Tone.Synth().toMaster()

//attach a click listener to a play button
document.querySelector('#play_button').addEventListener('click', async () => {
    // -The await expression causes async function execution to pause until 
    //  a Promise is settled (that is, fulfilled or rejected), and to resume 
    //  execution of the async function after fulfillment.
    await Tone.start();
    console.log('audio is ready');

    loopBeat = new Tone.Loop(callback, '4n');
    Tone.Transport.bpm.value = 180;
    Tone.Transport.start(0);

    loopBeat.start(0);
})

const stop_button = document.getElementById('stop_button');
stop_button.addEventListener('click', () => {
    loopBeat.stop();
});

const vol_slider = document.getElementById('volume');

let volume;
vol_slider.addEventListener('change', () => {
    volume = Number(vol_slider.value);
    console.log('volume = ' + volume + ', type: ' + typeof volume);
});

// TODO: 
//  -Default each track
//  -Default the song pattern
//  -Create a default track for synth
//  -Create a default track for bass


let track_1 = [false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let track_2 = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let track_3 = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];


function callback(time) {

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
    document.querySelector('#time').innerHTML = 'Time: ' + time;

    const beats_1 = document.querySelectorAll('.beats-1');
    const beats_2 = document.querySelectorAll('.beats-2');
    const beats_3 = document.querySelectorAll('.beats-3');
    // console.dir(beats_1);

    beats_1[bar].style.background = 'yellow';
    beats_2[bar].style.background = 'yellow';
    beats_3[bar].style.background = 'yellow';
    if (bar > 0) {
        beats_1[bar - 1].style.background = 'green';
        beats_2[bar - 1].style.background = 'green';
        beats_3[bar - 1].style.background = 'green';
    }

    // TODO: Store tracks_x[]'s as 2D-array
    // TODO: Store tracks_x[]'s as 2D-array
    // TODO: Store tracks_x[]'s as 2D-array

    if (track_1[idx]) {
        // const velocity = volume;
        // bassSynth.triggerAttackRelease('c1', '8n', time, velocity);
        Tracks[0].player.start(time);
        Tracks[0].player.stop(time + 0.1);
    }
    if (track_2[idx]) {
        // const velocity = volume;
        //play a middle 'C' for the duration of an 8th note
        // synth.triggerAttackRelease('C4', '8n', time, velocity)
        Tracks[1].player.start(time);
        Tracks[1].player.stop(time + 0.1);
    }
    if (track_3[idx]) {
        Tracks[2].player.start(time);
        Tracks[2].player.stop(time + 0.1);
    }

    console.log('time: ' + time);
}

// Grab each individual beat and  
const beat_1 = document.querySelectorAll('.beat-1');
beat_1.forEach((val, i) => {

    beat_1[i].addEventListener('click', () => {
        if (track_1[i]) beat_1[i].style.background = 'rgba(255, 154, 72)';
        else beat_1[i].style.background = 'black';

        track_1[i] = !track_1[i];
    });
});

const beat_2 = document.querySelectorAll('.beat-2');
beat_2.forEach((val, i) => {

    beat_2[i].addEventListener('click', () => {
        if (track_2[i]) beat_2[i].style.background = 'rgba(255, 154, 72)';
        else beat_2[i].style.background = 'black';

        track_2[i] = !track_2[i];
    });
});

const beat_3 = document.querySelectorAll('.beat-3');
beat_3.forEach((val, i) => {

    beat_3[i].addEventListener('click', () => {
        if (track_3[i]) beat_3[i].style.background = 'rgba(255, 154, 72)';
        else beat_3[i].style.background = 'black';

        track_3[i] = !track_3[i];
    });
});



// TODO: Change load_x's to an arrays

// Player
load_0.onchange = function () {
    // Step 1: Get name
    const files = this.files;
    const name = files[0].name;

    // Step 2: Load into player via: new Tone.Player('./' + name).toMaster();
    // -Assumes in current directory
    Tracks[0].change(name);

    // Step 3: Write name to Track-1 title
};


load_1.onchange = function () {
    // Step 1: Get name
    const files = this.files;
    const name = files[0].name;

    // Step 2: Load into player via: new Tone.Player('./' + name).toMaster();
    // -Assumes in current directory
    Tracks[1].change(name);

    // Step 3: Write name to Track-1 title
};

load_2.onchange = function () {
    // Step 1: Get name
    const files = this.files;
    // const file = URL.createObjectURL(files[0]);
    const name = files[0].name;

    // Step 2: Load into player via: new Tone.Player('./' + name).toMaster();
    // -Assumes in current directory
    Tracks[2].change(name);

    // Step 3: Write name to Track-1 title
};

console.dir(load_2);