let song;

function setup() {
  // song = loadSound('assets/Lucky_Dragons_-_01_-_heartbreaker.mp3');
  song = loadSound(
    "{% static 'app/js/assets/Lucky_Dragons_-_01_-_heartbreaker.mp3' %}"
  );
  createCanvas(720, 200);
  background(255, 0, 0);
}

function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}
