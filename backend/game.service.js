const BoardState = require('./boardstate');
const AiService = require('./ai.service');

class GameService {
    createNewGame = () => {
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

    validateGameState = (gameState) => {
        // From here on, theres a host of things we -could- worry about such as validation of state, making sure the same user doesn't go twice, etc.
        // However, for brevity we're going to assume no one is trying to cheat here...
        return true;
    }

    // Provided a game state, assess if there is a winner and who's turn is next
    updateGame = (newGameState) => {
        let boardState = new BoardState(newGameState.tiles);
        let outcome = boardState.getOutcome();

        switch(outcome) {
            case -1:
                newGameState.outcome = "O";
                break;
            case 0:
                newGameState.outcome = "Tie";
                break;
            case 1:
                newGameState.outcome = "X";
                break;
            default:
                newGameState.outcome = null;
        }

        newGameState.turn = (newGameState.turn === "X") ? "O" : "X";
        return newGameState;
    }

    executeAIturn = (gameState) => {
        // At this stage the turn has already been swapped over
        console.log(gameState.turn + ": AI Turn...");
        console.log("Current state:")
        console.log(gameState);

        // just having some fun here
        let behavior = 2;//Math.floor(Math.random() * 3);

        switch(behavior) {
            case 0:
                gameState = this.earliestOpeningBehavior(gameState);
                break;
            case 1:
                gameState = this.randomBehavior(gameState);
                break;
            case 2:
            default:
                gameState = this.playToWin(gameState);
                break;
        }

        console.log("Turn taken, new state:")
        console.log(gameState);
        return this.updateGame(gameState);
    }

    earliestOpeningBehavior = (newGameState) => {
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

    randomBehavior = (newGameState) => {
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
            return this.earliestOpeningBehavior(newGameState);
        }

        return newGameState;
    }

    playToWin = (newGameState) => {
        let aiPlayer = new AiService(newGameState.tiles);
        let bestOption = aiPlayer.decideTurn();
        newGameState.tiles[bestOption.coord.y][bestOption.coord.x] = newGameState.turn;

        return newGameState;
    }
}

module.exports = GameService;