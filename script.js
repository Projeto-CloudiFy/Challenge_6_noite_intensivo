const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const cover = document.getElementById("cover");
const covermini = document.getElementById("cover-mini");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");
const progressoBar = document.getElementById("current-progress");
const progress = document.getElementById("progress-bar");
const like = document.getElementById("like");
const minilike = document.getElementById("mini-like");
const playerBar = document.getElementById("player-bar");
const minimizeButton = document.getElementById("minimize");
const miniPlayPause = document.getElementById("mini-play-pause");
const miniSongName = document.getElementById("mini-song-name");
const miniBandName = document.getElementById("mini-band-name");
const miniProgressBar = document.getElementById("mini-current-progress");
const buttons = document.querySelectorAll('.buttonTop');
const playlistSections = document.querySelectorAll(".playlist");
const input = document.querySelector('.theme-switcher input')


let isPlaying = false;
let songLike = false;
let index = 0;

// Playlist
const playlist = [
  { songName: "Man in the Box", artist: "Acoustic n´ Roll", file: "man" },
  { songName: "Igor", artist: "Tyler the Creator", file: "igor" },
]

//Função para alterar o tema
input.addEventListener('change', (e) => {
  if (e.target.checked) {
    document.body.setAttribute('data-theme', 'light')
  } else {
    document.body.setAttribute('data-theme', 'dark')
}
})

// Adicionar evento de clique para cada botão
buttons.forEach(button => {
  button.addEventListener('click', () => {
      // Remover a classe 'selected' de todos os botões
      buttons.forEach(b => b.classList.remove('selected'));
      
      // Adicionar a classe 'selected' ao botão clicado
      button.classList.add('selected');
  });
});

// Adicione um evento de clique para cada section
playlistSections.forEach((section, idx) => {
  section.addEventListener("click", () => {
    index = idx; // Atualize o índice global
    loadSong();  // Carregue a música correspondente
    playSong();  // Reproduza a música
  });
});

// Alternar entre players
function togglePlayers(toFullscreen) {
  if (toFullscreen) {
    playerBar.classList.add("player-hidden");
    document.querySelector(".music-conteiner").classList.remove("hidden");
  } else {
    document.querySelector(".music-conteiner").classList.add("hidden");
    playerBar.classList.remove("player-hidden");
  }
}

// Minimizar o player fullscreen
minimizeButton.addEventListener("click", () => {
  togglePlayers(false);
});

// Maximizar o player compacto
playerBar.addEventListener("click", () => {
  togglePlayers(true);
});

// Função para alternar play/pause
function playSong() {
  play.querySelector(".bi").classList.replace("bi-play-circle", "bi-pause-circle");
  miniPlayPause.innerHTML = '<i class="bi bi-pause-circle"></i>';
  song.play();
  isPlaying = true;
}

function pauseSong() {
  play.querySelector(".bi").classList.replace("bi-pause-circle", "bi-play-circle");
  miniPlayPause.innerHTML = '<i class="bi bi-play-circle"></i>';
  song.pause();
  isPlaying = false;
}

function playPauseDecider() {
  isPlaying ? pauseSong() : playSong();
}

// Sincronizar estado dos botões de play/pause
play.addEventListener("click", playPauseDecider);
miniPlayPause.addEventListener("click", (e) => {
  e.stopPropagation();
  playPauseDecider();
});

// Carregar música
function loadSong() {
  cover.src = `imagem/${playlist[index].file}.jpg`;
  covermini.src = `imagem/${playlist[index].file}.jpg`;
  song.src = `musica/${playlist[index].file}.mp3`;
  songName.innerText = playlist[index].songName;
  bandName.innerText = playlist[index].artist;
  miniSongName.innerText = playlist[index].songName;
  miniBandName.innerText = playlist[index].artist;
  loadLikeState();
  loadProgress();
}

// Funções de navegação
function anteriorSong() {

  localStorage.removeItem('progress')

  index = index === 0 ? playlist.length - 1 : index - 1;
  loadSong();
  playSong();
}

function proximoSong() {
  
  localStorage.removeItem('progress')
  
  index = index === playlist.length - 1 ? 0 : index + 1;
  loadSong();
  playSong();
}

anterior.addEventListener("click", anteriorSong);
proximo.addEventListener("click", proximoSong);

function saveProgress() {
  if (song.duration && song.currentTime) { // Verifica se song.duration está definido
    const progress = Math.floor((song.currentTime / song.duration) * 100); // Calcula o progresso em porcentagem
    progressoBar.style.width = progress + '%'; // Atualiza a barra de progresso visualmente
    localStorage.setItem("progress", JSON.stringify(progress)); // Salva o progresso no localStorage
    localStorage.setItem("duration", JSON.stringify(song.duration)); // Salva o duração no localStorage
    console.log("Entrou no if")
  } else console.log("Não entrou no if")
}

function loadProgress() {
  const savedProgress = localStorage.getItem("progress");
  const savedDuration = localStorage.getItem("duration")
  console.log(savedProgress)
  console.log(savedDuration)
  if (savedProgress && savedDuration) { // Verifica se o progresso salvo e a duração estão disponíveis
    const progress = JSON.parse(savedProgress);
    song.currentTime = (progress / 100) * savedDuration; // Ajusta o tempo da música
    progressoBar.style.width = progress + '%'; // Atualiza a barra de progresso
    console.log("Carragando")
  } else {
    console.log("Não carragando")
  }
}



//Atualizar o progresso com o toque
function setProgress(event){
  const width = progress.offsetWidth;
  const clickx = Math.min(Math.max(event.offsetX, 0), width);;
  const duration = song.duration;

  if (duration) {
    song.currentTime = (clickx / width) * duration;
  }

  // Calcula a posição do toque
  const newTime = (clickx/width)*duration;
  song.currentTime = newTime;
}

// Atualizar progresso automaticamente
song.addEventListener("timeupdate", () => {
  if (song.duration) {
    const progressPercent = (song.currentTime / song.duration) * 100;
    progressoBar.style.width = `${progressPercent}%`;
    miniProgressBar.style.width = `${progressPercent}%`;
    saveProgress();
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

// Funções de curtida
function likeSong() {
  like.querySelector(".bi").classList.replace("bi-heart", "bi-heart-fill");
  minilike.querySelector(".bi").classList.replace("bi-heart", "bi-heart-fill");
  songLike = true;
  localStorage.setItem(`like_${playlist[index].file}`, true);
}

function deslikeSong() {
  like.querySelector(".bi").classList.replace("bi-heart-fill", "bi-heart");
  minilike.querySelector(".bi").classList.replace("bi-heart-fill", "bi-heart");
  songLike = false;
  localStorage.setItem(`like_${playlist[index].file}`, false);
}

function likeSongDecider() {
  songLike ? deslikeSong() : likeSong();
}

like.addEventListener("click", likeSongDecider);
minilike.addEventListener("click", likeSongDecider);

function loadLikeState() {
  const savedLike = localStorage.getItem(`like_${playlist[index].file}`);
  savedLike === "true" ? likeSong() : deslikeSong();
}

// Inicializar
window.addEventListener("load", () => {
  togglePlayers(false);
  loadSong();
});