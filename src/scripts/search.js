const words = ['ISAIAH','HEBREW', 'GOD','MAN' ,'JESUS', 'ISAAC', 'MOSES', 'ABRAHAM','JOSHUA', 'JOSEPH'];
const gridSize = 10;
let count = 0
let starge = 6;
let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

function getStage(){
    let stageNum = document.getElementById('stageNum');
    const params = new URLSearchParams(window.location.search);
    const stage = params.get('stage');

    stageNum.innerHTML = stage;
}
getStage()
function placeWords() {
    for (const word of words) {
    let placed = false;
    while (!placed) {
        const dir = Math.random() < 0.5 ? 'H' : 'V';
        const row = Math.floor(Math.random() * (dir === 'H' ? gridSize : gridSize - word.length));
        const col = Math.floor(Math.random() * (dir === 'V' ? gridSize : gridSize - word.length));
        let fits = true;

        for (let i = 0; i < word.length; i++) {
        const r = row + (dir === 'V' ? i : 0);
        const c = col + (dir === 'H' ? i : 0);
        if (grid[r][c] && grid[r][c] !== word[i]) {
            fits = false;
            break;
        }
        }

        if (fits) {
        for (let i = 0; i < word.length; i++) {
            const r = row + (dir === 'V' ? i : 0);
            const c = col + (dir === 'H' ? i : 0);
            grid[r][c] = word[i];
        }
        placed = true;
        }
    }
    }

    // Fill empty spaces with random letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
        if (!grid[r][c]) {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
        }
    }
    }
}

let isMouseDown = false;
let path = [];

function buildGrid() {
    const container = document.getElementById('grid');
    container.innerHTML = '';
    for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
        const div = document.createElement('div');
        div.className = 'cell';
        div.textContent = grid[r][c];
        div.dataset.row = r;
        div.dataset.col = c;
        container.appendChild(div);
    }
    }
}

function updateWordList() {
    const list = document.getElementById('word-list');
    list.innerHTML = '<h3>Find These Words:</h3>';
    for (const word of words) {
    const span = document.createElement('span');
    span.textContent = word;
    span.id = 'word-' + word;
    list.appendChild(span);
    list.appendChild(document.createElement('br'));
    }
}

function attachEvents() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
    cell.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        cell.classList.add('selected');
        path.push(cell);
    });

    cell.addEventListener('mouseover', (e) => {
        if (isMouseDown && !cell.classList.contains('selected')) {
        cell.classList.add('selected');
        path.push(cell);
        }
    });

    cell.addEventListener('mouseup', (e) => {
        isMouseDown = false;
        const selectedWord = path.map(c => c.textContent).join('');
        const reversedWord = path.map(c => c.textContent).reverse().join('');
        if (words.includes(selectedWord) || words.includes(reversedWord)) {
        path.forEach(c => c.classList.add('found'));
        document.getElementById('word-' + selectedWord)?.classList.add('found-word');
        document.getElementById('word-' + reversedWord)?.classList.add('found-word');
        }
        path.forEach(c => c.classList.remove('selected'));
        path = [];
    });
    });

    document.body.addEventListener('mouseup', () => {
    isMouseDown = false;
    path.forEach(c => c.classList.remove('selected'));
    path = [];
    });
}

// Initialize game
placeWords();
buildGrid();
updateWordList();
attachEvents();