// store HTML elements of ids
const moveAudioPlayer = document.getElementById("audio-container");

// drop zone is the area where the audio player can be dropped
const dropZone = document.getElementById("main-container");

// offsetX and offsetY store the initial offset from clicking on the dragged image
let offsetX = 0;
let offsetY = 0;

// draggedImage store the current dragged image
let draggedImage = undefined;

function onDrop(event) {
    // bring audioplayer to the position (clientX and clientY)
    // calculate initial offset (offsetX offsetY)
    moveAudioPlayer.style.left = event.clientX - offsetX + "px";
    moveAudioPlayer.style.top = event.clientY - offsetY + "px";
}

function onDragOver(event) {
    event.preventDefault();
}

function onDragStart(event) {
    draggedImage = event.target;
    const style = window.getComputedStyle(draggedImage);

    if(sliderIsChanging) {
        event.preventDefault();
        return;
    }

    offsetX = event.clientX - parseInt(style.left);
    offsetY = event.clientY - parseInt(style.top);
}

dropZone.ondrop = onDrop;
dropZone.ondragover = onDragOver;
moveAudioPlayer.ondragstart = onDragStart;
