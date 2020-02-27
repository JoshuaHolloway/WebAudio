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

        // OLD UI:
        this.beats_elems = document.querySelectorAll('.beats-' + instrument_num);
        this.beat_elems = document.querySelectorAll('.beats-' + instrument_num + ' .beat');

        // NEW UI:
        this.Beats_elems = document.querySelectorAll('.Beats-' + instrument_num);
        this.Beat_elems = document.querySelectorAll('.Beats-' + instrument_num + ' .beat');

        // Initialize beat pattern on default instruments
        switch (instrument_num) {
            case 0: this.set(); break;
            case 1: this.two_and_four(); break;
            case 2: this.one_and_three(); break;
            default: this.clear();
        }

        // Definitely not a pure function!
        const change_beat_color = (i) => {
            if (this.pattern[i]) 
                this.beat_elems[i].style.background = 'black';
            else 
                this.beat_elems[i].style.background = 'rgba(255, 154, 72)';

            const j = i;
            if(this.pattern[j])
            {
                // console.log('i = ', i);
                if ((0<=j && j<4) || (8<=j && j<12)) // gray elements
                    this.Beat_elems[j].style.background = '#B2C2CC';
                else // red elements
                    this.Beat_elems[j].style.background = '#DEB1B3';
            }
            else {
                console.log('i = ', i);
                if ((0<=j && j<4) || (8<=j && j<12)) // gray elements
                    this.Beat_elems[j].style.background = '#555A5E';
                else // red elements
                    this.Beat_elems[j].style.background = '#655456';
            }


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
    change = name => this.player = new Tone.Player('./' + name).toMaster();

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

class Channel_Rack_TO_REMOVE {

    constructor() {

        function channel_rack_row_HTML(row_num) {
            return `
                <div class="channel-rack-col-left">
                    <span class="light"></span>
                    <span class="knob"></span>
                    <span class="knob"></span>
                    <span class="number"></span>
                    <span class="name"></span>
                    <span class="on-off"></span>  
                </div>
                <div class="Beats-${row_num}">
                    <span class="beat beat-l"></span>
                    <span class="beat beat-l"></span>
                    <span class="beat beat-l"></span>
                    <span class="beat beat-l"></span>
                    <span class="beat beat-r"></span>
                    <span class="beat beat-r"></span>
                    <span class="beat beat-r"></span>
                    <span class="beat beat-r"></span>
                    <span class="beat beat-l"></span>
                    <span class="beat beat-l"></span>
                    <span class="beat beat-l"></span>
                    <span class="beat beat-l"></span>                        
                    <span class="beat beat-r"></span>
                    <span class="beat beat-r"></span>
                    <span class="beat beat-r"></span>
                    <span class="beat beat-r"></span>
                </div>
                `;
        }


        // let num_channel_rack_rows = 0; // Used before prototype loop above
        const add_channel_rack_row_button = document.querySelector('#add-row');
        add_channel_rack_row_button.addEventListener('click', () => {
          
            // const num_rows = this.num_channel_rack_rows;
            const num_rows = 0;
            console.log('num_rows = ', num_rows);

            // Add to classes instruments
            const x = new Instrument('hh_sample.mp3', num_rows);
            // this.instruments.push();

            // Increase number of channel-rack rows (# of instruments)
            ++this.num_channel_rack_rows;

            
            console.log('Number of rows in channel rack = ', this.num_channel_rack_rows);



            // Apply to actual row in channel-rack:
            const channel_rack_center = document.getElementById('channel-rack-center');
            console.log(channel_rack_center);

            const new_channel_rack_row = document.createElement('div');
            new_channel_rack_row.classList.add('channel-rack-row');

            new_channel_rack_row.innerHTML = channel_rack_row_HTML(this.num_channel_rack_rows);

            channel_rack_center.appendChild(new_channel_rack_row);

            // TODO: Change original Channel rack to fit the contents dynamically
            //       instead of hard coding its height.
        });

    }
    
}

// ========================================================


// ========================================================

// let Instruments = [new Instrument('hh_sample.mp3', 0), new Instrument('clap_sample.mp3', 1), new Instrument('bass_sample.mp3', 2)];

class Channel_Rack {
    instruments = [new Instrument('hh_sample.mp3', 0), new Instrument('clap_sample.mp3', 1), new Instrument('bass_sample.mp3', 2)];
}
const channel_rack = new Channel_Rack();
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



    channel_rack.instruments[0].beats_elems[bar].style.background = 'yellow';
    channel_rack.instruments[1].beats_elems[bar].style.background = 'yellow';
    channel_rack.instruments[2].beats_elems[bar].style.background = 'yellow';
    if (bar > 0) {
        channel_rack.instruments[0].beats_elems[bar - 1].style.background = 'green';
        channel_rack.instruments[1].beats_elems[bar - 1].style.background = 'green';
        channel_rack.instruments[2].beats_elems[bar - 1].style.background = 'green';
    }



    if (channel_rack.instruments[0].pattern[idx]) {
        // const velocity = volume;
        // bassSynth.triggerAttackRelease('c1', '8n', time, velocity);
        channel_rack.instruments[0].player.start(time);
        channel_rack.instruments[0].player.stop(time + 0.5);
    }
    if (channel_rack.instruments[1].pattern[idx]) {
        // const velocity = volume;
        //play a middle 'C' for the duration of an 8th note
        // synth.triggerAttackRelease('C4', '8n', time, velocity)
        channel_rack.instruments[1].player.start(time);
        channel_rack.instruments[1].player.stop(time + 0.5);
    }
    if (channel_rack.instruments[2].pattern[idx]) {
        channel_rack.instruments[2].player.start(time);
        channel_rack.instruments[2].player.stop(time + 0.5);
    }

    console.log('time: ' + time);
}

// ========================================================

// TODO: Port into Channel Rack class

// ========================================================

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let channel_rack_TO_REMOVE = new Channel_Rack_TO_REMOVE();
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!