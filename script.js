const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const cover = document.getElementById("cover");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const progressoBar = document.getElementById("current-progress");
const player = document.getquerySelctor(".player")
let isPlaying = false;
let Colossus = {
  songName: "Colossus",
  artist: "tyler the creator",
  file: "Colossus"
}


songName.innerText = "Colossus";


//Função do botao pause para aparecer o botão play e dar play na musica
function playSong() {
  play.querySelector(".bi").classList.remove("bi-play-circle");
  play.querySelector(".bi").classList.add("bi-pause-circle");
  song.play();
  isPlaying = true;
}
//Função do botao play para aparecer o botão pause e dar pause na musica
function pauseSong() {
  play.querySelector(".bi").classList.add("bi-play-circle");
  play.querySelector(".bi").classList.remove("bi-pause-circle");
  song.pause();
  isPlaying = false;
}
//Função para decidir qual botão vai aparecer ao apertar para dar play ou pause
function playPauseDecider() {
  if (isPlaying === true) {
    pauseSong();
  }
  else { playSong(); }
}

audio.addEventListener('timeupdate', function ()
 {
    var progress = Math.floor((audio.currentTime/audio.duration)*100);
    progressoBar.style.width = progress + '%';             
  });



play.addEventListener('click', playPauseDecider);



event.currentTarget.classList.add('active');


