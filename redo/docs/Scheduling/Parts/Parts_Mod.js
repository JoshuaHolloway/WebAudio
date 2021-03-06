//start/stop the transport
const parts = document.getElementById('Parts');
parts.addEventListener('click', e => {


    console.log('clicked');
    var synth = new Tone.Synth().toMaster()

    //pass in an array of events
    var part = new Tone.Part(function(time, event){

        //the events will be given to the callback with the time they occur
        synth.triggerAttackRelease(event.note, event.dur, time)

        }, [
            { 
                time : 0, 
                note : 'C4', 
                dur : '4n'
            },
            // { 
            //     time : 
            //     {
            //         '4n' : 1, 
            //         '8n' : 1
            //     }, 
            //     note : 'E4', 
            //     dur : '8n'
            // },
            // { 
            //     time : '2n', 
            //     note : 'G4', 
            //     dur : '16n'
            // },
            // { 
            //     time : 
            //     {
            //         '2n' : 1, 
            //         '8t' : 1
            //     },
            //     note : 'B4', 
            //     dur : '4n'
            // }
        ]
    );

    //start the part at the beginning of the Transport's timeline
    part.start(0);

    //loop the part 3 times
    part.loop = 3;
    // part.loopEnd = '1m';


    Tone.Transport.toggle();
});
