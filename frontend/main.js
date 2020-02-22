// Globals
let loopBeat;

// ========================================================

class Song {

}

// ========================================================

class Instrument {

    // Fields
    name = 'Untitled Instrument';
    player = null;
    pattern = new Array(16);
    instrument_name_elem;

    constructor(name, instrument_num) {
        this.name = name;
        this.player = new Tone.Player('./' + name).toMaster();

        const instrument_num_str = instrument_num.toString();
        this.instrument_name_elem = document.querySelector('#instrument-name-' + instrument_num);
        this.instrument_name_elem.innerHTML = 'Instrument-' + instrument_num_str;

        this.beats_elems = document.querySelectorAll('.beats-' + instrument_num);
        this.beat_elems = document.querySelectorAll('.beats-' + instrument_num + ' .beat');

        // Initialize beat pattern on default instruments
        switch (instrument_num) {
            case 0: this.set(); break;
            case 1: this.two_and_four(); break;
            case 2: this.one_and_three(); break;
            default: this.clear();
        }

        // Definitely not a pure function!
        const change_beat_color = (i) => {
            if (this.pattern[i]) this.beat_elems[i].style.background = 'black';
            else this.beat_elems[i].style.background = 'rgba(255, 154, 72)';
        };

        // Event-listener for drawing beat-pattern
        this.beat_elems.forEach((val, i) => {

            // Set initial beat-pattern graphics
            change_beat_color(i);

            // Change color of beat graphic upon click
            this.beat_elems[i].addEventListener('click', () => {
                this.pattern[i] = !(this.pattern[i]);
                change_beat_color(i);
            });
        });

        // Create callback for load button
        const load_instrument_elem = document.querySelector('#load_' + instrument_num.toString());
        console.dir(load_instrument_elem);
        load_instrument_elem.addEventListener('change', () => {

            // Step 1: Get name
            const name = load_instrument_elem.files[0].name;

            // Step 2: Load into player via: new Tone.Player('./' + name).toMaster();
            // -Assumes in current directory
            this.change(name);

            // Step 3: Write name to Instrument-1 title
            this.instrument_name_elem.innerHTML = name.split('.')[0];
        });
    }

    // Methods
    change = (name) => this.player = new Tone.Player('./' + name).toMaster();

    set() {
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
}

// ========================================================

let Instruments = [new Instrument('hh_sample.mp3', 0), new Instrument('clap_sample.mp3', 1), new Instrument('bass_sample.mp3', 2)];

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
    Tone.Transport.start();
    loopBeat.start();
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
//  -Create a default instrument for synth
//  -Create a default instrument for bass


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



    Instruments[0].beats_elems[bar].style.background = 'yellow';
    Instruments[1].beats_elems[bar].style.background = 'yellow';
    Instruments[2].beats_elems[bar].style.background = 'yellow';
    if (bar > 0) {
        Instruments[0].beats_elems[bar - 1].style.background = 'green';
        Instruments[1].beats_elems[bar - 1].style.background = 'green';
        Instruments[2].beats_elems[bar - 1].style.background = 'green';
    }



    if (Instruments[0].pattern[idx]) {
        // const velocity = volume;
        // bassSynth.triggerAttackRelease('c1', '8n', time, velocity);
        Instruments[0].player.start(time);
        Instruments[0].player.stop(time + 0.5);
    }
    if (Instruments[1].pattern[idx]) {
        // const velocity = volume;
        //play a middle 'C' for the duration of an 8th note
        // synth.triggerAttackRelease('C4', '8n', time, velocity)
        Instruments[1].player.start(time);
        Instruments[1].player.stop(time + 0.5);
    }
    if (Instruments[2].pattern[idx]) {
        Instruments[2].player.start(time);
        Instruments[2].player.stop(time + 0.5);
    }

    console.log('time: ' + time);
}

// ========================================================
