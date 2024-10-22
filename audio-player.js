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

// song source
const songSource = ["/assests/songs/pokemon-theme-1.mp3", "/assests/songs/pokemon-theme-2.mp3", "/assests/songs/pokemon-theme-3.mp3"];

// define text for song of choice
const songName = ["Gotta Catch 'Em all!", "Adventures in the Orange Islands by Pokemon", "The Johto Journeys by Pokemon"];

// image sources
const songImageSource = ["/assests/images/theme-1.jpg", "/assests/images/theme-2.jpg", "/assests/images/theme-3.jpg"]
const coverImage = document.getElementById("cover-img");

// define html element constants - song selection
const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");
const songText = document.getElementById("song-text");

// audioPlayer.src is the first song of the audio player by default
audioPlayer.src = "/assests/songs/pokemon-theme-1.mp3";
audioPlayer.volume = 0.5;

//playing stop if the audioPlayer is currently playing
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
  clickNextFunction();
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

// store which song is currently being displayed
let songCounter = 1;

/**
 * Update character counter and display next character.
 * Sets counter back to 1 if 3 has been surpassed.
 * @returns when character is chosen
 */

function clickNextFunction() {
  // update character counter
  songCounter = songCounter + 1;

  // if beyond 3 -> set character counter to 1
  if (songCounter > 3) {
    songCounter = 1;
  }

  updateFunction();
}

function clickPreviousFunction() {
  // update character counter
  songCounter = songCounter - 1;

  // if beyond 3 -> set character counter to 1
  if (songCounter < 1) {
    songCounter = 3;
  }

  updateFunction();
}

function updateFunction() {
  // find image related to specific character
  // Images are 0,1,2 so image sources -1 to each character counter to select correct image
  coverImage.src = songImageSource[songCounter - 1];
  songText.innerHTML = songName[songCounter - 1];
  audioPlayer.src = songSource[songCounter - 1];

  if (playing) {
    audioPlayer.play();
  }
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


// Assignment area for functions
nextButton.onclick = clickNextFunction;
previousButton.onclick = clickPreviousFunction;