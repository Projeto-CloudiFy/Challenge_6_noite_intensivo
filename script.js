const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const cover = document.getElementById("cover");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");
const progressoBar = document.getElementById("current-progress");
const progress = document.getElementById("progress-bar")
const like = document.getElementById("like")
let isPlaying = false;
let songLike = false;

let Colossus = {
  songName: "Colossus",
  artist: "tyler the creator",
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

// Atualizar a música e carregar o estado do botão "like"
function loadSong() {
  cover.src = `imagem/${playlist[index].file}.jpg`;
  song.src = `musica/${playlist[index].file}.mp3`;
  songName.innerText = playlist[index].songName;
  bandName.innerText = playlist[index].artist;
  loadLikeState(); // Verifica e aplica o estado salvo do botão "like"
}

//funão de voltar musica anterior
function anteriorSong() {
  if (index === 0) {
    index = playlist.length - 1;
  }
  else {
    index = index - 1;
  }
  loadSong();
  playSong();
};
//função de avançar para a proxima musica 
function proximoSong() {
  if (index === playlist.length - 1) {
    index = 0;
  }
  else {
    index = index + 1;
  }
  loadSong();
  playSong();
};
loadSong();

function saveProgress() {
  if (song.duration && song.currentTime) { // Verifica se song.duration está definido
    const progress = Math.floor((song.currentTime / song.duration) * 100); // Calcula o progresso em porcentagem
    progressoBar.style.width = progress + '%'; // Atualiza a barra de progresso visualmente
    localStorage.setItem("progress", JSON.stringify(progress)); // Salva o progresso no localStorage
  }
}

function loadProgress() {
  const savedProgress = localStorage.getItem("progress");
  if (savedProgress && song.duration) { // Verifica se o progresso salvo e a duração estão disponíveis
    const progress = JSON.parse(savedProgress);
    song.currentTime = (progress / 100) * song.duration; // Ajusta o tempo da música
    progressoBar.style.width = progress + '%'; // Atualiza a barra de progresso
  }
}

//Atualizar o progresso com o toque
function setProgress(event){
  const width = progress.offsetWidth;
  const clickx = event.offsetX;
  const duration = song.duration;

  // Calcula a posição do toque
  const newTime = (clickx/width)*duration;
  song.currentTime = newTime;
}

// Atualiza o progresso
song.addEventListener("timeupdate", () => {
  if (song.duration){
    const progressPercent = (song.currentTime / songduration)* 100;
    currentProgress.style.width = `${progressPercent}`;
  }
});

progress.addEventListener("click", setProgress);

let isDragging = false;

//Função de arraste da barra
progress.addEventListener("mousedown", () => (isDragging = true));
progress.addEventListener("mouseup", () => (isDragging = false));

progress.addEventListener("mousemove", (event) => {
  if (isDragging) {
    setProgress(event);
  }
});



// Evento para garantir que a duração da música esteja carregada antes de aplicar o progresso
song.addEventListener('loadedmetadata', function () {
  loadProgress(); // Carrega o progresso assim que os metadados estiverem disponíveis
});

// Evento para atualizar o progresso enquanto a música toca
song.addEventListener('timeupdate', function () {
  saveProgress(); // Atualiza o progresso a cada segundo
});

// Modifique o evento `window.onload` para não carregar o progresso diretamente
window.addEventListener("load", function () {
  loadSong(); // Carrega a música e o estado do botão "like"
});

like.addEventListener("click", likeSongDecider);
play.addEventListener('click', playPauseDecider);
anterior.addEventListener('click', anteriorSong);
proximo.addEventListener('click', proximoSong);


// Função para curtir a música
function likeSong() {
  like.querySelector(".bi").classList.remove("bi-heart");
  like.querySelector(".bi").classList.add("bi-heart-fill");
  songLike = true;
  localStorage.setItem(`like_${playlist[index].file}`, true); // Salva o estado no localStorage
}

// Função para descurtir a música
function deslikeSong() {
  like.querySelector(".bi").classList.add("bi-heart");
  like.querySelector(".bi").classList.remove("bi-heart-fill");
  songLike = false;
  localStorage.setItem(`like_${playlist[index].file}`, false); // Salva o estado no localStorage
}

// Decide o estado do botão "like"
function likeSongDecider() {
  if (songLike) {
    deslikeSong();
  } else {
    likeSong();
  }
}

// Carregar o estado do botão "like" ao mudar ou carregar a música
function loadLikeState() {
  const savedLike = localStorage.getItem(`like_${playlist[index].file}`);
  if (savedLike === "true") {
    likeSong();
  } else {
    deslikeSong();
  }
}

