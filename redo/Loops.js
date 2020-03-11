

//start/stop the transport
const loops = document.getElementById('Loops');
loops.addEventListener('click', e => {

    var synth = new Tone.MembraneSynth().toMaster()

    //create a loop
    var loop = new Tone.Loop(function(time){
        synth.triggerAttackRelease("C1", "8n", time)
    }, "4n")

    //play the loop between 0-2m on the transport
    loop.start(0).stop('2m')

    console.log('loops button pressed');
    Tone.Transport.toggle();
});