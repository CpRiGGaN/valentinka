let isAnimating = false;
let zIndexCounter = 100;

// Старт анимации конверта
function openLetterAnim() {
    if (isAnimating) return;
    isAnimating = true;
    document.querySelector('.pixel-letter-container').classList.add('is-opening');
    document.querySelector('.click-hint').style.display = 'none';
    setTimeout(startGame, 1200);
}

// Переход на рабочий стол
function startGame() {
    const startScreen = document.getElementById('screen-start');
    startScreen.style.opacity = '0';
    setTimeout(() => {
        startScreen.style.display = 'none';
        document.getElementById('screen-desktop').style.display = 'block';
        openWindow('win-letter');
    }, 800);
}

// Управление окнами
function openWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'flex';
    win.style.zIndex = ++zIndexCounter;
    
    // Центрирование при первом открытии
    if (!win.style.top) {
        win.style.left = (window.innerWidth/2 - 250) + (Math.random()*40-20) + 'px';
        win.style.top = (window.innerHeight/2 - 150) + (Math.random()*40-20) + 'px';
    }
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

// Часы
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = 
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}
setInterval(updateClock, 1000);
updateClock();

// Музыка
function playSong(url, element) {
    const player = document.getElementById('audio-player');
    player.src = url;
    player.play();
    document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
}

// Логика перемещения окон (Drag and Drop)
document.querySelectorAll('.window').forEach(win => {
    const titleBar = win.querySelector('.title-bar');
    let isDragging = false, offsetX, offsetY;

    titleBar.onmousedown = (e) => {
        isDragging = true;
        win.style.zIndex = ++zIndexCounter;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
    };

    document.onmousemove = (e) => {
        if (isDragging) {
            win.style.left = (e.clientX - offsetX) + 'px';
            win.style.top = (e.clientY - offsetY) + 'px';
        }
    };

    document.onmouseup = () => isDragging = false;
});