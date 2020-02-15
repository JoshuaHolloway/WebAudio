//--------------------------------------------
let play_button;
let bpmCTRL, beat_length, cell_width;
let cnv; // canvas
let sPat; // sequence pattern for animation
let cursor_pos;
// ...
let hh, clap, bass; // INSTRUMENT: Will serve as a container to hold a sound source.
let hPat, cPat, bPat; // INSTRUMENT-PATTERN: Stores pattern of beat.
let hPhrase, cPhrase, bPhrase; // INSTRUMENT-PHRASE: Defines how the instrument-pattern is interpreted.
let drums; // PART: Parts and Phrases work together.
// -We will attach the phrase to the part,
//  which will serve as our transport to drive the phrase.
//--------------------------------------------
function set_canvas() {
    cnv = createCanvas(320, 60);
    cnv.mousePressed(canvas_pressed);

    // initiazlize globals:
    beat_length = 16;
    cell_width = width / beat_length;
    cursor_pos = 0;
}
//--------------------------------------------
function create_buttons() {
    play_button = createButton('loading');

    play_button.mousePressed(() => {
        if (hh.isLoaded() && clap.isLoaded() && bass.isLoaded()) {
            // console.log('---- Inside isLoaded() tests ----');
            if (!drums.isPlaying) {
                // console.log('---- Inside !drums.isPlaying ----');
                drums.loop();
                play_button.html('stop');
            } else {
                drums.stop();
                play_button.html('play');
            }
        }
    });
}
//--------------------------------------------
function load_sound() {
    hh = loadSound("js/assets/hh_sample.mp3", () => {
        // drums.loop();
        console.log('hi-hat sound is loaded');
    });

    clap = loadSound(
        "js/assets/clap_sample.mp3",
        () => {
            console.log('clap sound is loaded');

            // Below assumes clap is loaded last
            play_button.html('play');
        }
    );

    bass = loadSound(
        "js/assets/bass_sample.mp3",
        () => {
            console.log('bass sound is loaded');
        }
    );
}
//--------------------------------------------
function create_pattern() {
    hPat = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    cPat = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
    bPat = [1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1];
    sPat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
}
//--------------------------------------------
function init_phrases() {
    hPhrase = new p5.Phrase(
        'hh',
        time => {
            // 1st param in Phrase callback reports a scheduled delay-time named 'time'
            hh.play(time);
        },
        hPat
    );
    // - - - - - - - - - - -
    cPhrase = new p5.Phrase(
        'clap',
        time => {
            // 1st param in Phrase callback reports a scheduled delay-time named 'time'
            clap.play(time);
        },
        cPat
    );
    // - - - - - - - - - - -
    bPhrase = new p5.Phrase(
        'bass',
        time => {
            // 1st param in Phrase callback reports a scheduled delay-time named 'time'
            bass.play(time);
        },
        bPat
    );
}
//--------------------------------------------
function attach_to_phrase() {
    drums = new p5.Part();
    drums.addPhrase(hPhrase);
    drums.addPhrase(cPhrase);
    drums.addPhrase(bPhrase);
    drums.addPhrase('seq', sequence, sPat);
}
//--------------------------------------------
// Add listener to listen for any key pressed
function keyPressed() {
    if (key === ' ' || key === 'p') {
        // console.log('---- Inside key === space ----');
        if (hh.isLoaded() && clap.isLoaded() && bass.isLoaded()) {
            // console.log('---- Inside isLoaded() tests ----');
            if (!drums.isPlaying) {
                // console.log('---- Inside !drums.isPlaying ----');
                drums.loop();
                console.log('drums.loop();');
            } else {
                if (key === ' ') {
                    // Stop
                    drums.stop();
                    drums.metro.metroTicks = 0;
                } else if (key === 'p') {
                    // Pause
                    drums.stop();
                }
            }
        } else {
            console.log('drums not loaded yet!');
        }
    }
}
//--------------------------------------------
function create_bpm_slider() {
    let slider_min = 30;
    let slider_max = 180;
    let slider_init = 70;
    let slider_step = 1;
    bpmCTRL = createSlider(
        slider_min,
        slider_max,
        slider_init,
        slider_step
    );
    bpmCTRL.position(10, 120);
    bpmCTRL.input(() => {
        // update bpm when slider changes
        drums.setBPM(bpmCTRL.value());
    });
    drums.setBPM(bpmCTRL.value());
}
//--------------------------------------------
function draw_matrix() {
    background(80); // set background color to dark-gray
    stroke('gray');
    strokeWeight(2);
    fill('white');
    // noStroke();

    // Draw vertical lines
    for (let i = 0; i < beat_length; ++i) {
        // args: start_x, start_y, end_x, end_y
        line(i * cell_width, 0, i * cell_width, height);
    }

    // Draw horizontal lines
    for (let i = 0; i < 4; ++i) {
        line(0, i * (height / 3), width, i * (height / 3));
    }

    // Draw dots in each cell
    for (let i = 0; i < beat_length; ++i) {
        if (hPat[i] === 1) {
            ellipse(i * cell_width + 0.5 * cell_width, height / 6, 10);
        }
        if (cPat[i] === 1) {
            ellipse(i * cell_width + 0.5 * cell_width, height / 2, 10);
        }
        if (bPat[i] === 1) {
            ellipse(i * cell_width + 0.5 * cell_width, (height * 5) / 6, 10);
        }
    }
    console.log('leaving draw_matrix');
}
//--------------------------------------------
function canvas_pressed() {
    console.log('inside canvas pressed');
    let row_clicked = floor((3 * mouseY) / height);
    let index_clicked = floor((beat_length * mouseX) / width);

    const invert = x => (x ? 0 : 1);

    if (row_clicked === 0) {
        // console.log('first row with index = ' + index_clicked);
        hPat[index_clicked] = invert(hPat[index_clicked]);
    } else if (row_clicked === 1) {
        // console.log('second row with index = ' + index_clicked);
        cPat[index_clicked] = invert(cPat[index_clicked]);
    } else if (row_clicked === 2) {
        // console.log('third row with index = ' + index_clicked);
        bPat[index_clicked] = invert(bPat[index_clicked]);
    }
    draw_matrix();
}
//--------------------------------------------
function init_globals() {
    cursor_pos = 0;
}
//--------------------------------------------
function preload() { }
//--------------------------------------------
function setup() {
    set_canvas();
    create_buttons();
    load_sound();
    create_pattern();
    init_phrases();
    attach_to_phrase();
    create_bpm_slider();
    draw_matrix();
} // setup()
//--------------------------------------------
function draw_playHead(beatIndex) {
    // drawMatrix();
    stroke('red');
    const red = 255;
    const alpha = 30; // out of 255
    fill(red, 0, 0, alpha);
    rect((beatIndex - 1) * cell_width, 0, cell_width, height);
}
//--------------------------------------------
function sequence(time, beatIndex) {
    // fine-tune synchronize play-head animation with beat
    setTimeout(() => {
        // update graphics
        draw_matrix();

        // animage play-head
        draw_playHead(beatIndex);
    }, time * 1000); // time in units of ms.
}
//--------------------------------------------
// <h2> Press space to drop the beat!</h2 >
// <h4>Modify the beat by clicking in the cells.</h4>
// <h4>Space == Stop, p == Pause</h4>
// <h3>Top-row == hi-hat. Middle-row == snare. Bottom-row == bass-drum.</h3> -->