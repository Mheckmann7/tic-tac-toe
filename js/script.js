/*----- constants -----*/
// MODEL

// All caps means it should never be reassigned 
const COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]; 

const LOOKUP = {
    '1': 'X',
    '-1': 'O',
    'null': '',
};  

/*----- app's state (variables) -----*/

// MODEL

let turn, winner, gameboard; 

/*----- cached element references -----*/

// VIEW

const $gameboardEl = $('#gameboard');
const $squareEls = $('.square'); 
const $buttonEl = $('#reset-btn');
const $messageEl = $('#message'); 

/*----- event listeners -----*/
//CONTROLLER
$gameboardEl.on('click', handleMove);
$buttonEl.on('click', handleInit); 
/*----- functions -----*/

//CONTROLLER
handleInit(); 

function handleInit() {
    gameboard = new Array(9).fill().map(() => null); //Creates an array with 9 values of null 
    turn = 1; 
    winner = false;   
    render(); 
}

function checkWinner() {
    for(let i=0; i < COMBOS.length; i++) {
        if(Math.abs(gameboard[COMBOS[i][0]] + gameboard[COMBOS[i][1]] + gameboard[COMBOS[i][2]]) === 3) {
            return gameboard[COMBOS[i][0]]
        }
    } if(gameboard.includes(null)) return false; 
    return 'T'
}

function handleMove(event) {
    const position = event.target.dataset.index;
    if(winner || gameboard[position]) return; //empty return prevents the rest of the code from running 
    gameboard[position] = turn; 
    //check winner 
    winner = checkWinner(); 
    turn *= -1; //toggles turn 
    render(); 
}

function render() {
    gameboard.forEach(function(value, index){
        $($squareEls[index]).text(LOOKUP[value])
    }); 
    if(!winner) {
        $messageEl.text(`It's Player ${LOOKUP[turn]}'s Turn`); 
    } else if (winner === 'T') {
        $messageEl.text(`Tie!`); 
    } else {
        $messageEl.text(`Congratulations ${LOOKUP[winner]} wins`)
    }
}