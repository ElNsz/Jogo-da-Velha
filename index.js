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
    if(playing && square[item] === '') {
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

function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu.';
        playing = false;
    } else if(checkWinnerFor('o')){
        warning = 'O "o" venceu.';
        playing = false;
    } else if (isFull()) {
        warning = 'Deu empate.';
        playing = false;
    }
}

function checkWinnerFor(playerTurn) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1' 
    ];

    for (let pItem in pos) {
        let pArray = pos[pItem].split(','); //a1, a2, a3
        let hasWon = pArray.every((option)=>{
            if(square[option] === playerTurn) {
                return true;
            } else {
                return false;
            }
        });
        if(hasWon) {
            return true;
        }
    }
    return false;
}
function isFull() {
    for (let i in square) {
        if(square[i] === '' ) {
            return false;
        }
    }
    return true;
}