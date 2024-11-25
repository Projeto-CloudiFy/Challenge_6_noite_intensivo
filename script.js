const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const cover = document.getElementById("cover");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const like = document.getElementById("like");
const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");
const progressoBar = document.getElementById("current-progress");
let isPlaying = false;

let Colossus
  = {
  songName: "Man in the box",
  artist: "Acoustic n´ Roll",
  file: "Colossus"
  
};

let igor = {
  songName: "igor",
  artist: "tyler the creator",
  file: "igor"
};

songName.innerText = "Colossus";
//array com as musicas
const playlist = [Colossus, igor];
let index = 0;


//Função do botao pause para aparecer o botão play e dar play na musica
function like() {
  play.querySelector(".bi").classList.remove("bi-play-circle");
  play.querySelector(".bi").classList.add("bi-pause-circle");
  song.play();
  isPlaying = true;
}
//Função do botao play para aparecer o botão pause e dar pause na musica
function deslike() {
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

//Função do botao like da música
function playSong() {
  like.querySelector(".bi").classList.remove("bi bi-heart");
  like.querySelector(".bi").classList.add("bi bi-heart-fill");
}
//Função do botao deslike da música
function pauseSong() {
  like.querySelector(".bi").classList.add("bi bi-heart");
  like.querySelector(".bi").classList.remove("bi bi-heart-fill");
}

//funçao pra atualizar pra puxar as informações da musica

function loadSong() {
  cover.src= `imagem/${playlist[index].file}.jpg`;
  song.src=`musica/${playlist[index].file}.mp3`;
  songName.innerText = playlist[index].songName;
  bandName.innerText = playlist[index].artist;
}
//funão de voltar musica anterior
function anteriorSong() {
    if (index === 0) {
    index = playlist.length - 1;
}
  else{
    index = index -1;
  }
  loadSong();
  playSong();
 };
//função de avançar para a proxima musica 
function proximoSong() {
  if (index === playlist.length -1) {
  index = 0;
}
else{
  index = index +1;
}
loadSong();
playSong();
};
loadSong();

function saveProgress() {
  const progress = Math.floor((song.currentTime / song.duration) * 100); // Calcula o progresso em porcentagem
  localStorage.setItem("progress", JSON.stringify(progress)); // Salva o progresso no localStorage
  progressoBar.style.width = progress + '%'; // Atualiza a barra de progresso na interface
}

// Função para carregar o progresso salvo ao iniciar
function loadProgress() {
  const savedProgress = localStorage.getItem("progress");
  if (savedProgress) {
    const progress = JSON.parse(savedProgress);
    song.currentTime = (progress / 100) * song.duration; // Restaura o tempo atual da música com base no progresso salvo
    progressoBar.style.width = progress + '%'; // Atualiza a barra de progresso
  }
}

// Evento para atualizar o progresso enquanto a música toca
song.addEventListener('timeupdate', function () {
  saveProgress(); // Salva o progresso a cada atualização
});

// Carregar o progresso ao iniciar a página
window.addEventListener('load', function() {
  loadProgress(); // Tenta carregar o progresso salvo no localStorage
});

play.addEventListener('click', playPauseDecider);
anterior.addEventListener('click', anteriorSong);
proximo.addEventListener('click', proximoSong);

