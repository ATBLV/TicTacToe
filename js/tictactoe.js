console.log("PROJECT: TIC TAC TOE");


let arrayGrid = ["", "", "", "", "", "", "", "", ""];
let cross = '<img src="img/close_black_24dp.svg" alt="X">';
let circle = '<img src="img/circle.svg" width="100px" alt="O">';
let winSolutions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


const player = (name, symbol) => {
    return { name, symbol };
};

const playerOne = player('Player 1', '');
const playerTwo = player('Player 2', '');


document.addEventListener('click', (event) => {
    console.log("TARGET ID: ", event.target.id);
    gamePlay(event.target.id);

});

// for keypad usage and testing
document.addEventListener('keydown', (event) => {
    console.log(event.key);
    let key = playWithKeypad(event.key);
    gamePlay(key);
});


const grid = ((player, index, arrayGrid) => {

    function _renderGrid() {
        for (let i = 0; i < 9; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', i);
            document.getElementById('grid').appendChild(square);
        }
    }

    selectPlayer();

    _renderGrid();
    return () => {
    }
})();

let gridTest = grid;


function playWithKeypad(key) {
    let index, symbol;
    switch (key) {
        case '1':
            index = 6;
            break;
        case '2':
            index = 7;
            break;
        case '3':
            index = 8;
            break;
        case '4':
            index = 3;
            break;
        case '5':
            index = 4;
            break;
        case '6':
            index = 5;
            break;
        case '7':
            index = 0;
            break;
        case '8':
            index = 1;
            break;
        case '9':
            index = 2;
            break;
        case 'x':
            index = 'x';
            break;
        case 'o':
            index = 'o';
            break;
        case 'r':
            window.location.reload();
        default:
            break;
    }
    return index;
}


const gamePlay = (index, player) => {

    function updateGrid(index, symbol) {
        if (arrayGrid[index] === '') arrayGrid[index] = symbol;

        // output the corresponding symbol element in arrayGrid on to grid
        arrayGrid.forEach((element, index) => {
            if (element === 'x') {
                document.getElementById(index).innerHTML = cross;
            } else if (element === 'o') {
                document.getElementById(index).innerHTML = circle;
            }
        });
    }

    if (playerOne.symbol !== '' && arrayGrid[index] === '') {
        let countEmptySpaces = arrayGrid.filter((element) => (element === '')).length;

        if (countEmptySpaces >= 1 && winTest().length != 1) {

            if (countEmptySpaces % 2 !== 0) {
                arrayGrid[index] = playerOne.symbol;
            } else {
                arrayGrid[index] = playerTwo.symbol;
            }
            if (index <= 9 && index >= 0) {
                updateGrid();
            }
            if ((countEmptySpaces === 1) && (winTest())) {
                gameOver('Game is a draw!!');
            }

        } else {
            gameOver();
        }

    } else if (index === 'x' || index === 'o') {
        if (playerOne.symbol === '') {
            playerOne.symbol = index;
            playerOne.symbol === 'x' ? playerTwo.symbol = 'o' : playerTwo.symbol = 'x';
            playerChoiceDisplay(index);
        }

    } else if (index === 'reset') {
        window.location.reload();
    }

    let testWin = winTest();
    arrayGrid[testWin[0][0]] ? gameOver("PLAYER 1 WINS!!") : gameOver("PLAYER 2 WINS!!");

    function winTest() {
        return winSolutions.filter((element, index) => {
            return element.every((x) => arrayGrid[x] === "x") || element.every((x) => arrayGrid[x] === "o");
        });
    }

    if (testWin.length >= 1) {
        for (let i = 0; i < testWin[0].length; i++) {
            testWin[0].forEach((element, index, _arrayGrid) => {
                document.getElementById(testWin[0][i]).classList.add('squareWin');
                let square = document.getElementById(x[0]);
            })
        };
    }
    return () => {
    };

};

function gameOver(msg) {

    document.getElementById('container').classList.add('grid_fade');

    let endGame = document.createElement('div');
    document.getElementById('main').appendChild(endGame);
    endGame.classList.add('endGame');
    endGame.setAttribute('id', 'endGame');
    document.getElementById('endGame').style.zIndex = 2;
    document.getElementById('endGame').innerHTML = "<div>" + msg + "</div>";

    let resetButton = document.createElement('BUTTON');
    resetButton.innerHTML = '(r)eset';
    resetButton.classList.add('reset', 'waves-effect', 'waves-light', 'btn');
    resetButton.setAttribute('id', 'reset');
    document.getElementById('endGame').appendChild(resetButton);
}

function selectPlayer() {
    let startGame = document.createElement('div');
    document.getElementById('main').appendChild(startGame);
    startGame.classList.add('startGame');
    startGame.setAttribute('id', 'startGame');
    document.getElementById('startGame').style.zIndex = 2;
    document.getElementById('startGame').innerHTML = "<div>Choose a symbol to begin</div>";
}

// Displays player symbol choice 
function playerChoiceDisplay(symbol) {
    if (symbol === 'x') {
        let player = document.getElementById('players');
        player.innerHTML = "<h5>Player 1</h5><h5>Player 2</h5>";
    } else {
        document.getElementById('players').innerHTML = "<h5>Player 2</h5><h5>Player 1</h5>";
    }
    document.getElementById('startGame').remove();
}
