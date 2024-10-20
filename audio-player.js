// create the audio player object
const audioPlayer = new Audio();

// select play pause button element
const playPauseButton = document.getElementById("play-button");

// select progress slider
const progressSlider = document.getElementById("progress-slider");

// select volume slider
const volumeSlider = document.getElementById("volume-slider");

// select progress text spans
const progressText = document.getElementById("progress-text");
const durationText = document.getElementById("duration-text");

// audioPlayer.src is the first song of the audio player by default
audioPlayer.src = "assets/sound/allthethingsshesaid.mp3";
audioPlayer.volume = 0.5;

//playing stores if the audioPlayer is currently playing
let playing = false;

//updatingProgress stores if the user is updating the progress in the progressBar
let updatingProgress = false;

/**
 * if audio player is playing -> do not play sound
 * if audio player is not playing -> play sound
 */
function onPlayPauseClick() {
  if (playing) {
    audioPlayer.pause();
    playPauseButton.innerHTML = "Play";
    playing = false;
  } else {
    audioPlayer.play();
    playPauseButton.innerHTML = "Pause";
    playing = true;
  }
}

/**
 * onLoadedMetadata updates the maximum of the progressSlider and the innerHTMl of the durationText to the new audioPlayer.duration - formatted where necessary
 */
function onLoadedMetadata() {
  progressSlider.max = audioPlayer.duration;

  durationText.innerHTML = secondsToMMSS(audioPlayer.duration);
}

/**
 * onTimeUpdate updates the value of the progressSlider and the innerHTML of the progressText to audioPlayer.currentTime - formatted where necessary.
 * If the user is updating the progressSlider, the value of the progressSlider will not be updated.
 */
function onTimeUpdate() {
  if (!updatingProgress) {
    progressSlider.value = audioPlayer.currentTime;
  }

  progressText.innerHTML = secondsToMMSS(audioPlayer.currentTime);
}

/**
 * onEnd resets all necessary values for song to start playing again
 */
function onEnd() {
  progressSlider.value = 0;
  playPauseButton.innerHTML = "Play";
  playing = false;
  progressText.innerHTML = "00:00";
}

/**
 * take value of the volumeSlider and update audioPlayer.volume
 */
function onVolumeSliderChange() {
  audioPlayer.volume = volumeSlider.value * 0.01;
}

/**
 * onProgressMouseDown updates the updatingProgress boolean to mark the user is updating the progressSlider
 */
function onProgressMouseDown() {
  updatingProgress = true;
}

/**
 * onProgressSliderChange updates the currentTime of the audioPlayer to the value of the progressSlider and updatingProgress to false, to mark the user is not moving the slider anymore
 */
function onProgressSliderChange() {
  audioPlayer.currentTime = progressSlider.value;
  updatingProgress = false;
}

/**
 * 
 * @param {Number} seconds time in seconds
 * @returns time formatted as "MM:SS"
 */
function secondsToMMSS(seconds) {
  const integerSeconds = parseInt(seconds);

  //calculate seconds
  let MM = parseInt(integerSeconds / 60);
  if (MM < 10) MM = "0" + MM;

  //calculate minutes
  let SS = integerSeconds % 60;
  if (SS < 10) SS = "0" + SS;

  return MM + ":" + SS;
}

//play pause button events
playPauseButton.onclick = onPlayPauseClick;

//audio player events
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;

//volume slider events
volumeSlider.onchange = onVolumeSliderChange;

// progress slider events
progressSlider.onchange = onProgressSliderChange;
progressSlider.onmousedown = onProgressMouseDown;