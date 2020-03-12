
const play = document.getElementById('play');
play.addEventListener('click', () => {
	const filter = new Tone.Filter({
		type : 'bandpass',
		Q : 12
	}).toMaster()

	//schedule a series of frequency changes
	filter.frequency.setValueAtTime('C5', 0)
	filter.frequency.setValueAtTime('E5', 0.5)
	filter.frequency.setValueAtTime('G5', 1)
	filter.frequency.setValueAtTime('B5', 1.5)
	filter.frequency.setValueAtTime('C6', 2)
	filter.frequency.linearRampToValueAtTime('C1', 3)

	const noise = new Tone.Noise("brown").connect(filter).start(0).stop(3)

	//schedule an amplitude curve
	noise.volume.setValueAtTime(-20, 0)
	noise.volume.linearRampToValueAtTime(20, 2)
	noise.volume.linearRampToValueAtTime(-Infinity, 3)
});