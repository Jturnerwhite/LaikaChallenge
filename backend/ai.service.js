class BoardState {
    tiles = [];
    turn = "X";

    constructor(existing) {
        // deep copy
        this.tiles = existing.tiles.map((row) => {
            return Array.from(row);
        });

        this.turn = existing.turn;
    }

    // array of { y, x } open coordinates
    getEmpty = () => {
        let coordinates = [];

        this.tiles.forEach((row, yIndex) => {
            row.forEach((value, xIndex) => {
                if(value === "") {
                    coordinates.push({ y: yIndex, x: xIndex });
                }
            });
        });

        return coordinates;
    }

    getOutcome = () => {
        let winner = null;
        let winValue = this.tiles.length;

        // Admittedly this is a lot more convoluted than just doing new iterations
        let totalFilled = 0;
        let downRightDiagValue = 0;
        let downLeftDiagValue = 0;
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
                    if(tiles[y][x] === "X") {
                        downRightDiagValue++;
                    }
                    else if(tiles[y][x] === "O") {
                        downRightDiagValue--;
                    }
                }

                if((x + y) == tiles.length) {
                    if(tiles[y][x] === "X") {
                        downLeftDiagValue++;
                    }
                    else if(tiles[y][x] === "O") {
                        downLeftDiagValue--;
                    }
                }
            }

            if(totalRowValue === winValue || totalColValue === winValue) {
                winner = "X";
            }
            else if(totalRowValue === -winValue || totalColValue === -winValue) {
                winner = "O";
            }
        }

        if(downRightDiagValue === winValue || downLeftDiagValue === winValue) {
            winner = "X";
        }
        else if(downRightDiagValue === -winValue || downLeftDiagValue === -winValue) {
            winner = "O";
        }

        if(winner) {
            return (winner == "X") ? 1 : -1;
        }
        if(!winner && totalFilled === (tiles.length * tiles[0].length)) {
            return 0;
        }

        return null;
    }
}

class AiService {
    currentState = new BoardState();
    currentlyRunning = false;

    constructor(tiles) {
        this.currentState = new BoardState(tiles, "O");
        this.currentlyRunning = false;
    }

    decideTurn = () => {
        // Since AI is O, we want the "lowest" score
        let lowest = Number.POSITIVE_INFINITY;
        let options = this.currentState.getEmpty();
        let bestOption = null;

        options.forEach((coord) => {
            let newState = this.nextState(this.currentState, "O", coord);
            let valueOfOption = this.compute(newState, "O", 0);
            if(valueOfOption < lowest) {
                lowest = valueOfOption;
                bestOption = coord;
            }
        });

        return bestOption;
    }

    // Returns a value based on how favorable the tree of actions is
    // +1 = X's favor
    // 0 = Neutral
    // -1 = O's favor
    compute = (boardState, turn, depth) => {
        // Since AI is O, we want the "lowest" score
        let lowest = Number.POSITIVE_INFINITY;
        let options = this.currentState.getEmpty();
        let bestOption = null;

        options.forEach((coord) => {
            let newState = this.nextState(this.currentState, "O", coord);
            let valueOfOption = this.compute(newState, "O", 0);
            if(valueOfOption < lowest) {
                lowest = valueOfOption;
                bestOption = coord;
            }
        });
    }

    // make a boardstate wherein the user executed their turn at the given index
    nextState = (tiles, turn, coord) => {
        let newState = new BoardState(tiles, turn);
        newState.tiles[coord.y][coord.x] = turn;
        return newState;
    }
}

module.exports = AiService;