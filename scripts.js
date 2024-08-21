const audio = new Audio();
const fileInput = document.getElementById('fileInput');
const playPauseBtn = document.getElementById('playPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeLabel = document.getElementById('currentTime');
const durationLabel = document.getElementById('duration');
const volumeControl = document.getElementById('volumeControl');
const volumeLabel = document.getElementById('volumeLabel');

let isPlaying = false;

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        audio.src = URL.createObjectURL(file);
        audio.addEventListener('loadedmetadata', () => {
            durationLabel.textContent = formatTime(audio.duration);
            progressBar.max = audio.duration;
        });
    }
});

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseBtn.textContent = 'Play';
    isPlaying = false;
});

audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime;
    currentTimeLabel.textContent = formatTime(audio.currentTime);
});

progressBar.addEventListener('input', (e) => {
    audio.currentTime = e.target.value;
});

volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
    volumeLabel.textContent = `${e.target.value}%`;
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
