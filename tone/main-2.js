const play_button = document.getElementById('play_button');
play_button.addEventListener('click', () => {
    bassSynth = new Tone.MembraneSynth().toMaster();
    loopBeat = new Tone.Loop(callback, '4n');
    Tone.Transport.bpm.value = 140;
    Tone.Transport.start();
    loopBeat.start(0);

    function callback(time) {
        const velocity = 0.1;
        bassSynth.triggerAttackRelease('c1', '8n', time, velocity);
        console.log(time);
    }
});