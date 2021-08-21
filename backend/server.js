const express = require ('express');
const app = express();

const cachedGameStates = {};

app.use(express.json());

app.get('/game/:id?', (req, res) => {
    console.log("Request to get game #: " + req.params.id);
    console.log("Current cached games are: " + Object.keys(cachedGameStates));

    let game = cachedGameStates[req.params.id];
    if(game === null || game === undefined) {
        game = createNewGame();
        cachedGameStates[game.id] = game;
    }

    res.send(JSON.stringify(game));
});

app.post('/game/:id', (req, res) => {
    console.log("Request to update game #: " + req.params.id);
    console.log(req.body);

    let isValidState = validateGameState(req.body);

    let game = cachedGameStates[req.params.id];
    if(!isValidState || game === null || game === undefined) {
        res.sendStatus(404);
    }

    let newGameState = updateGame(req.body);
    if(newGameState.outcome !== "X" && newGameState.outcome !== "O" && newGameState.outcome !== "Tie") {
        newGameState = executeAIturn(newGameState);
    }

    cachedGameStates[req.params.id] = newGameState;

    console.log("Returning new state...");
    res.end(JSON.stringify(newGameState));
});

app.listen(9000, () => console.log('Backend running on localhost:9000'));

function createNewGame() {
    return {
        id: Date.now(),
        outcome: null,
        turn: "X",
        tiles: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]
    }
}

function validateGameState(gameState) {
    // From here on, theres a host of things we -could- worry about such as validation of state, making sure the same user doesn't go twice, etc.
    // However, for brevity we're going to assume no one is trying to cheat here...
    return true;
}

// Provided a game state, assess if there is a winner and who's turn is next
function updateGame(newGameState) {
    const winValue = 3;
    const { turn, tiles } = newGameState;
    let outcome = null;

    let totalFilled = 0;
    let downRightDiagValue = 0;
    for(var y = 0; y < tiles.length; y++) {
        let totalRowValue = 0;
        let totalColValue = 0;

        for(var x = 0; x < tiles[y].length; x++) {
            // check for row-based wins by recording occurrences
            if(tiles[y][x] === "X") {
                totalFilled++;
                totalRowValue++;
            }
            else if(tiles[y][x] === "O") {
                totalFilled++;
                totalRowValue--;
            }

            // Unintuitively, we can simultaneously check for column wins like this
            if(tiles[x][y] === "X") {
                totalColValue++;
            }
            else if(tiles[x][y] === "O") {
                totalColValue--;
            }

            if(x === y) {
                if(tiles[x][y] === "X") {
                    downRightDiagValue++;
                }
                else if(tiles[x][y] === "O") {
                    downRightDiagValue--;
                }
            }
        }

        if(totalRowValue === winValue || totalColValue === winValue) {
            outcome = "X";
        }
        else if(totalRowValue === -winValue || totalColValue === -winValue) {
            outcome = "O";
        }
    }

    if(downRightDiagValue === winValue || downRightDiagValue === winValue) {
        outcome = "X";
    }
    else if(downRightDiagValue === -winValue || downRightDiagValue === -winValue) {
        outcome = "O";
    }

    // wanted to move on from this, couldn't think of rapid+easy+clever check so heres the 'hard coded'
    if(tiles[0][2] === tiles[1][1] && tiles[1][1] === tiles[2][0] && tiles[1][1] === "X") {
        outcome = "X";
    }
    if(tiles[0][2] === tiles[1][1] && tiles[1][1] === tiles[2][0] && tiles[1][1] === "O") {
        outcome = "O";
    }

    if(!outcome && totalFilled === (tiles.length * tiles[0].length)) {
        outcome = "TIE";
    }

    newGameState.outcome = outcome;
    newGameState.turn = (turn === "X") ? "O" : "X";

    return newGameState;
}

function executeAIturn(gameState) {
    // At this stage the turn has already been swapped over
    console.log(gameState.turn + ": AI Turn...");
    console.log("Current state:")
    console.log(gameState);

    let behavior = Math.floor(Math.random() * 3);

    // just having some fun here
    switch(behavior) {
        case 0:
        case 1:
            gameState = randomBehavior(gameState);
            break;
        case 2:
        default:
            gameState = earliestOpeningBehavior(gameState);
            break;
    }

    console.log("Turn taken, new state:")
    console.log(gameState);
    return updateGame(gameState);
}

function earliestOpeningBehavior(newGameState) {
    let {tiles} = newGameState;
    let turnTaken = false;

    for(var y = 0; y < tiles.length; y++) {
        for(var x = 0; x < tiles[y].length; x++) {
            if(!turnTaken && tiles[y][x] === "") {
                tiles[y][x] = newGameState.turn;
                turnTaken = true;
                break;
            }
        }

        if(turnTaken) {
            break;
        }
    }

    return newGameState;
}

function randomBehavior(newGameState) {
    let turnTaken = false;
    let {tiles} = newGameState;
    let tries = 0;

    do
    {
        tries++;
        let y = Math.floor(Math.random() * 3);
        let x = Math.floor(Math.random() * 3);
        if(tiles[y][x] === "") {
            tiles[y][x] = newGameState.turn;
            turnTaken = true;
        }
    } while(tries < 10 && !turnTaken);
    
    if(!turnTaken) {
        return earliestOpeningBehavior(newGameState);
    }

    return newGameState;
}