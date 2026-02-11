let isAnimating = false;
let zIndexCounter = 100;

function openLetterAnim() {
    if (isAnimating) return;
    isAnimating = true;
    document.querySelector('.pixel-letter-container').classList.add('is-opening');
    document.querySelector('.click-hint').style.display = 'none';
    setTimeout(startGame, 1200);
}

function startGame() {
    document.getElementById('screen-start').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('screen-start').style.display = 'none';
        document.getElementById('screen-desktop').style.display = 'block';
        openWindow('win-letter');
    }, 800);
}

function openWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'flex';
    win.style.zIndex = ++zIndexCounter;
    
    // Центрирование
    if (!win.style.top) {
        const width = win.offsetWidth;
        const height = win.offsetHeight;
        win.style.left = (window.innerWidth/2 - width/2) + (Math.random()*40-20) + 'px';
        win.style.top = (window.innerHeight/2 - height/2) + (Math.random()*40-20) + 'px';
    }
}

function closeWindow(id) { document.getElementById(id).style.display = 'none'; }

function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}
setInterval(updateClock, 1000); updateClock();

function playSong(url, element) {
    const player = document.getElementById('audio-player');
    player.src = url; player.play();
    document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
}

// Перетаскивание (Drag & Drop)
document.querySelectorAll('.window').forEach(win => {
    const titleBar = win.querySelector('.title-bar');
    let isDragging = false, offsetX, offsetY;
    titleBar.onmousedown = (e) => {
        isDragging = true; win.style.zIndex = ++zIndexCounter;
        offsetX = e.clientX - win.offsetLeft; offsetY = e.clientY - win.offsetTop;
    };
    document.onmousemove = (e) => { if (isDragging) { win.style.left = (e.clientX - offsetX) + 'px'; win.style.top = (e.clientY - offsetY) + 'px'; } };
    document.onmouseup = () => isDragging = false;
});