const qs = (el) => document.querySelector(el);

// Dados Iniciais
let square = {
a1: '', a2: '', a3: '',
b1: '', b2: '', b3: '',
c1: '', c2: '', c3: ''
};
let playerTurn = '';
let warning = '';
let playing = false;

reset();
// Eventos
qs('.reset').addEventListener('click', reset);
qs('div[data-item=a1]').addEventListener('click', itemClick);
qs('div[data-item=a2]').addEventListener('click', itemClick);
qs('div[data-item=a3]').addEventListener('click', itemClick);
qs('div[data-item=b1]').addEventListener('click', itemClick);
qs('div[data-item=b2]').addEventListener('click', itemClick);
qs('div[data-item=b3]').addEventListener('click', itemClick);
qs('div[data-item=c1]').addEventListener('click', itemClick);
qs('div[data-item=c2]').addEventListener('click', itemClick);
qs('div[data-item=c3]').addEventListener('click', itemClick);

// Funções
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if(square[item] === '') {
        square[item] = playerTurn;
        renderSquare();
        togglePlayer();
    }
}

function reset() {
    warning = '';
    let random = Math.floor(Math.random() * 2);
    if(random === 0) {
        playerTurn = 'x';
    } else {
        playerTurn = 'o';
    }
    for(let i in square) {
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for(let i in square) {
        let item = qs(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    checkGame();
}

function renderInfo() {
    qs('.vez').innerHTML = playerTurn;
    qs('.resultado').innerHTML = warning;
}

function togglePlayer() {
    if(playerTurn === 'x') {
        playerTurn = 'o';
    } else {
        playerTurn = 'x';
    };
    renderInfo();
}