let audio = document.getElementById("audio");    // Берём элемент audio
let time = document.querySelector(".time");      // Берём аудио дорожку
let btnPlay = document.querySelector(".play");   // Берём кнопку проигрывания
let btnPause = document.querySelector(".pause"); // Берём кнопку паузы
let btnPrev = document.querySelector(".prev");   // Берём кнопку переключения предыдущего трека
let btnNext = document.querySelector(".next");   // Берём кнопку переключение следующего трека
console.log(audio);
console.log(time);
console.log(btnPlay);
console.log(btnPause);
console.log(btnPrev);
console.log(btnNext);


let playlist = [
	'Dance_on_Sad.wav',
	'Fear.wav',
	'Illusion.wav',
	'Search.wav',
	'Take_a_Break.wav',
	'Без_Разницы.wav',
	'Хорошо_и_Плохо.wav'
];

let playedMusicId = [];
 
let treck; // Переменная с индексом трека

function getRandomInt() {
  return Math.floor(Math.random() * playlist.length);
}

function chooseNextRandomMusic(){
    playedMusicId.unshift(treck);
    if(playedMusicId.length == playlist.length){
        playedMusicId.splice(4,3);
    }
    treck = getRandomInt();
    while(playedMusicId.includes(treck)){
        treck = getRandomInt();
    }
    console.log(playedMusicId);
}

function choosePrevMusic(){
    if (playedMusicId.length > 0){
        treck = playedMusicId[0];
        playedMusicId.shift(treck);
    }
    else {
        temp = treck;
        treck = getRandomInt();
        while(treck == temp){
            treck = getRandomInt();
        }
    }
    console.log(playedMusicId);
    console.log(treck);
}

function playMusic(){
    audio.play(); // Запуск песни
    // Запуск интервала 
    audioPlay = setInterval(function() {
        // Получаем значение на какой секунде песня
        let audioTime = Math.round(audio.currentTime);
        // Получаем всё время песни
        let audioLength = Math.round(audio.duration)
        // Назначаем ширину элементу time
        time.style.width = (audioTime * 100) / audioLength + '%';
        // Сравниваем, на какой секунде сейчас трек и всего сколько времени длится
        // И проверяем что переменная treck меньше четырёх
        if (audioTime == audioLength) {
            chooseNextRandomMusic();
            switchTreck(treck);
        }
    }, 10)
}

function pauseMusic(){
    audio.pause(); // Останавливает песню
    clearInterval(audioPlay) // Останавливает интервал
}

// Событие перед загрузкой страницы
window.onload = function() {
    treck = getRandomInt(); // Присваиваем переменной ноль
    audio.src = './assets/audios/' + playlist[treck];
    audio.volume = 0.2;
}

//document.body.addEventListener("mousemove", function () {
//    playMusic();
//})

//document.body.addEventListener("touchstart", function () {
//    playMusic();
//})

function switchTreck (numTreck) {
    // Меняем значение атрибута src
    audio.src = './assets/audios/' + playlist[numTreck];
    // Назначаем время песни ноль
    audio.currentTime = 0;
    // Включаем песню
    audio.play();
}

btnPlay.addEventListener("click", function() {
    playMusic();
});

btnPause.addEventListener("click", function() {
    pauseMusic();
});

btnPrev.addEventListener("click", function() {
    choosePrevMusic();
    switchTreck(treck);
});

btnNext.addEventListener("click", function() {
    chooseNextRandomMusic();
    switchTreck(treck); // Меняем песню
});

document.addEventListener("visibilitychange", function(){
    if (document.hidden){
        pauseMusic()
    } else {
        playMusic();    
    }
});