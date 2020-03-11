//start/stop the transport
const tone_play_toggle = document.getElementById('tone-play-toggle');
tone_play_toggle.addEventListener('changed', e => {

    console.log('tone play toggle button pressed');

    var synth = new Tone.MetalSynth().toMaster();

    function triggerSynth(time){
        synth.triggerAttackRelease('16n', time);
    }

    Tone.Transport.schedule(triggerSynth, 0)
    Tone.Transport.schedule(triggerSynth, 2 * Tone.Time('8t'))
    Tone.Transport.schedule(triggerSynth, Tone.Time('4n') + Tone.Time('8t'))
    Tone.Transport.schedule(triggerSynth, Tone.Time('4n') + 2 * Tone.Time('8t'))
    Tone.Transport.schedule(triggerSynth, Tone.Time('0:2') + Tone.Time('8t'))
    Tone.Transport.schedule(triggerSynth, Tone.Time('0:3') + Tone.Time('8t'))

    Tone.Transport.loopEnd = '1m';
    Tone.Transport.loop = true;


    Tone.Transport.toggle();
});

//start/stop the transport
const tone_slider = document.getElementById('tone-slider');
tone_slider.addEventListener('change', e => {
    console.log('Tone Slider changed');
    Tone.Transport.bpm.value = e.detail;
});