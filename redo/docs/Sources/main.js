const toggle = document.querySelector('#tone-play-toggle');
toggle.addEventListener('click', (e) => {

	console.log('clicked');

	//a pwm oscillator
	const pwm = new Tone.PWMOscillator("Bb3").toMaster();
	pwm.volume.value = -10;

	if (e.detail) {
	pwm.start()
	} else {
	pwm.stop()
	}
});