// //create a synth and connect it to the master output (your speakers)
// var synth = new Tone.Synth().toMaster()
//
// //play a middle 'C' for the duration of an 8th note
// synth.triggerAttackRelease('C4', '8n')


// Globals:
let loopBeat;
let bassSynth;
let counter;

// Volume:
const vol_elem = document.getElementById('vol');
let volume = 0.1;
vol_elem.addEventListener('change', () => {
    volume = vol_elem.value
    if (volume > 0.5) volume = 0.5;
    else if (volume < 0.2) volume = 0.2;
});

// Note:
const note_elem = document.getElementById('note');
let note = 'c1';
note_elem.addEventListener('change', () => {
    console.log('note changed');
    note = note_elem.value;
});

// Beats per measure
const bp_measure_elem = document.getElementById('bp_measure_elem');
let bp_measure = '16n';
bp_measure_elem.addEventListener('change', () => {
    console.log('bp_measure_elem.value: ' + bp_measure_elem.value);
    bp_measure = bp_measure_elem.value;

    // How to update this??

    // Update loopBeat with new Beats-per-Measure
    // loopBeat = new Tone.Loop(song, bp_measure);
    // // Tone.Transport.bpm.value = 140;
    // Tone.Transport.start();
    // loopBeat.start(0);
});

// Individual-Beats
const beats = document.querySelectorAll('.beat');
console.log('=========beats:==========');
for (let beat of beats) {
    console.log(beat.style);
}


// Play button
const play_button = document.getElementById('play_button');
play_button.addEventListener('click', () => {

    console.log('Inside click');
});




function setup() {
    console.log('setup()');

    counter = 0;
    bassSynth = new Tone.MembraneSynth().toMaster();

    console.log('bp_measure = ' + bp_measure);
    loopBeat = new Tone.Loop(song, bp_measure);

    // Tone.Transport.bpm.value = 140;

    Tone.Transport.start();
    loopBeat.start(0);
}

let counts = [0, 0];
function song(time) {
    const duration = '8n';
    const velocity = volume; // volume
    bassSynth.triggerAttackRelease(note, duration, time, velocity);
    // -triggerAttackRelease is a combination of two methods: 
    //      --triggerAttack when the amplitude is rising 
    //          ---(for example from a ‘key down’ or ‘note on’ event)
    //      --triggerRelease is when the amplitude is going back to 0
    //          ---(‘key up’ / ‘note off’).
    //  -The first argument to triggerAttackRelease is the frequency which 
    //   can either be a number(like 440) or as “pitch - octave” notation(like "D#2").
    //  -The second argument is the duration that the note is held.
    //      --This value can either be in seconds, or as a tempo - relative value.
    //  -The third(optional) argument is when the note should be scheduled to play.
    //      --With no argument, the note plays immediately, 
    //            but it can also be scheduled to play anytime in the future.



    const currentBeat = split(Tone.Transport.position, ':');
    // console.log(Tone.Transport.position);
    console.log(currentBeat[0] + ' ' + currentBeat[1] + ' ' + floor(currentBeat[2]));



    const x = currentBeat[1];
    if (x == 0) {

        beats[4].style.background = 'yellow';
        beats[5].style.background = 'yellow';
        beats[6].style.background = 'yellow';
        beats[7].style.background = 'yellow';

        beats[8].style.background = 'yellow';
        beats[9].style.background = 'yellow';
        beats[10].style.background = 'yellow';
        beats[11].style.background = 'yellow';

        beats[12].style.background = 'yellow';
        beats[13].style.background = 'yellow';
        beats[14].style.background = 'yellow';
        beats[15].style.background = 'yellow';

        const current = floor(currentBeat[2]);
        if (current == 0) {
            beats[0].style.background = 'red';
            beats[1].style.background = 'yellow';
            beats[2].style.background = 'yellow';
            beats[3].style.background = 'yellow';
        }
        else if (current == 1) {
            beats[0].style.background = 'yellow';
            beats[1].style.background = 'red';
            beats[2].style.background = 'yellow';
            beats[3].style.background = 'yellow';
        }
        else if (current == 2) {
            beats[0].style.background = 'yellow';
            beats[1].style.background = 'yellow';
            beats[2].style.background = 'red';
            beats[3].style.background = 'yellow';
        }
        else if (current == 3) {
            beats[0].style.background = 'yellow';
            beats[1].style.background = 'yellow';
            beats[2].style.background = 'yellow';
            beats[3].style.background = 'red';
        }
    }
    else if (x == 1) {

        beats[0].style.background = 'yellow';
        beats[1].style.background = 'yellow';
        beats[2].style.background = 'yellow';
        beats[3].style.background = 'yellow';

        beats[8].style.background = 'yellow';
        beats[9].style.background = 'yellow';
        beats[10].style.background = 'yellow';
        beats[11].style.background = 'yellow';

        beats[12].style.background = 'yellow';
        beats[13].style.background = 'yellow';
        beats[14].style.background = 'yellow';
        beats[15].style.background = 'yellow';

        const current = floor(currentBeat[2]);
        if (current == 0) {
            beats[4].style.background = 'red';
            beats[5].style.background = 'yellow';
            beats[6].style.background = 'yellow';
            beats[7].style.background = 'yellow';
        }
        else if (current == 1) {
            beats[4].style.background = 'yellow';
            beats[5].style.background = 'red';
            beats[6].style.background = 'yellow';
            beats[7].style.background = 'yellow';
        }
        else if (current == 2) {
            beats[4].style.background = 'yellow';
            beats[5].style.background = 'yellow';
            beats[6].style.background = 'red';
            beats[7].style.background = 'yellow';
        }
        else if (current == 3) {
            beats[4].style.background = 'yellow';
            beats[5].style.background = 'yellow';
            beats[6].style.background = 'yellow';
            beats[7].style.background = 'red';
        }
    }
    else if (x == 2) {

        beats[0].style.background = 'yellow';
        beats[1].style.background = 'yellow';
        beats[2].style.background = 'yellow';
        beats[3].style.background = 'yellow';
        beats[4].style.background = 'yellow';
        beats[5].style.background = 'yellow';
        beats[6].style.background = 'yellow';
        beats[7].style.background = 'yellow';
        beats[12].style.background = 'yellow';
        beats[13].style.background = 'yellow';
        beats[14].style.background = 'yellow';
        beats[15].style.background = 'yellow';

        const current = floor(currentBeat[2]);
        if (current == 0) {
            beats[8].style.background = 'red';
            beats[9].style.background = 'yellow';
            beats[10].style.background = 'yellow';
            beats[11].style.background = 'yellow';
        }
        else if (current == 1) {
            beats[8].style.background = 'yellow';
            beats[9].style.background = 'red';
            beats[10].style.background = 'yellow';
            beats[11].style.background = 'yellow';
        }
        else if (current == 2) {
            beats[8].style.background = 'yellow';
            beats[9].style.background = 'yellow';
            beats[10].style.background = 'red';
            beats[11].style.background = 'yellow';
        }
        else if (current == 3) {
            beats[8].style.background = 'yellow';
            beats[9].style.background = 'yellow';
            beats[10].style.background = 'yellow';
            beats[11].style.background = 'red';
        }
    }
    else if (x == 3) {

        beats[0].style.background = 'yellow';
        beats[1].style.background = 'yellow';
        beats[2].style.background = 'yellow';
        beats[3].style.background = 'yellow';
        beats[4].style.background = 'yellow';
        beats[5].style.background = 'yellow';
        beats[6].style.background = 'yellow';
        beats[7].style.background = 'yellow';
        beats[8].style.background = 'yellow';
        beats[9].style.background = 'yellow';
        beats[10].style.background = 'yellow';
        beats[11].style.background = 'yellow';

        const current = floor(currentBeat[2]);
        if (current == 0) {
            beats[12].style.background = 'red';
            beats[13].style.background = 'yellow';
            beats[14].style.background = 'yellow';
            beats[15].style.background = 'yellow';
        }
        else if (current == 1) {
            beats[12].style.background = 'yellow';
            beats[13].style.background = 'red';
            beats[14].style.background = 'yellow';
            beats[15].style.background = 'yellow';
        }
        else if (current == 2) {
            beats[12].style.background = 'yellow';
            beats[13].style.background = 'yellow';
            beats[14].style.background = 'red';
            beats[15].style.background = 'yellow';
        }
        else if (current == 3) {
            beats[12].style.background = 'yellow';
            beats[13].style.background = 'yellow';
            beats[14].style.background = 'yellow';
            beats[15].style.background = 'red';
        }
    }


}