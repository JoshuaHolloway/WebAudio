// Globals
let loopBeat;
let Track_0, Track_1, Track_2;

class Track {

    // Fields
    name = 'Untitled Track';
    player = null;
    pattern = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    beats_1 = document.querySelectorAll('.beats-1');

    constructor(name) {
        this.name = name;
        this.player = new Tone.Player('./' + name).toMaster();
    }

    // Methods
    change(name) {
        this.player = new Tone.Player('./' + name).toMaster();
    }

    set() {
        // for (let pattern of this.pattern)
        //     pattern = true;
        for (let i = 0; i < this.pattern.length; ++i)
            this.pattern[i] = true;
    }

    clear() {
        for (let pattern of this.pattern)
            pattern = false;
    }

    print() {
        for (let pattern of this.pattern)
            console.log(pattern);
    }

    one_and_three() {
        this.pattern[0] = true;
        this.pattern[8] = true;
    }

    two_and_four() {
        this.pattern[4] = true;
        this.pattern[12] = true;
    }

    sync_style() {

    }
}

let Tracks = [new Track('hh_sample.mp3'), new Track('clap_sample.mp3'), new Track('bass_sample.mp3')];

track_3 = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

Tracks[0].set();
Tracks[1].two_and_four();
Tracks[2].one_and_three();

// ========================================================

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

// TODO: Move these into the class
// TODO: Move these into the class
// TODO: Move these into the class
// TODO: Move these into the class

const beats_2 = document.querySelectorAll('.beats-2');
const beats_3 = document.querySelectorAll('.beats-3');

// Grab each individual beat and  
const beat_1 = document.querySelectorAll('.beats-1 .beat');
const beat_2 = document.querySelectorAll('.beats-2 .beat');
const beat_3 = document.querySelectorAll('.beat-3');

console.dir(beat_1);
beat_1.forEach((val, i) => {

    beat_1[i].addEventListener('click', () => {
        if (Tracks[0].pattern[i]) {
            beat_1[i].style.background = 'rgba(255, 154, 72)';
            console.log('Clicked');
        }
        else {
            beat_1[i].style.background = 'black';
            console.log('Clicked again');
        }

        Tracks[0].pattern[i] = !(Tracks[0].pattern[i]);
    });
});

beat_2.forEach((val, i) => {

    beat_2[i].addEventListener('click', () => {
        if (Tracks[1].pattern[i]) beat_2[i].style.background = 'rgba(255, 154, 72)';
        else beat_2[i].style.background = 'black';

        Tracks[1].pattern[i] = !(Tracks[1].pattern);
    });
});


beat_3.forEach((val, i) => {

    beat_3[i].addEventListener('click', () => {
        if (Tracks[2].pattern[i]) beat_3[i].style.background = 'rgba(255, 154, 72)';
        else beat_3[i].style.background = 'black';

        Tracks[2].pattern[i] = !(Tracks[2].pattern);
    });
});

// ========================================================

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



    Track[0].beats_1[bar].style.background = 'yellow';
    beats_2[bar].style.background = 'yellow';
    beats_3[bar].style.background = 'yellow';
    if (bar > 0) {
        Track[0].beats_1[bar - 1].style.background = 'green';
        beats_2[bar - 1].style.background = 'green';
        beats_3[bar - 1].style.background = 'green';
    }



    if (Tracks[0].pattern[idx]) {
        // const velocity = volume;
        // bassSynth.triggerAttackRelease('c1', '8n', time, velocity);
        Tracks[0].player.start(time);
        Tracks[0].player.stop(time + 0.5);
    }
    if (Tracks[1].pattern[idx]) {
        // const velocity = volume;
        //play a middle 'C' for the duration of an 8th note
        // synth.triggerAttackRelease('C4', '8n', time, velocity)
        Tracks[1].player.start(time);
        Tracks[1].player.stop(time + 0.5);
    }
    if (Tracks[2].pattern[idx]) {
        Tracks[2].player.start(time);
        Tracks[2].player.stop(time + 0.5);
    }

    console.log('time: ' + time);
}

// ========================================================

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


