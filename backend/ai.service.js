class BoardState {
    tiles = [];

    constructor(tiles) {
        // deep copy
        this.tiles = tiles.map((row) => {
            return Array.from(row);
        });
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

    // +1 if X won, -1 if O won, 0 if tied, null if still open
    getOutcome = () => {
        let winner = null;
        let winValue = this.tiles.length;

        // Admittedly this is a lot more convoluted than just doing new iterations
        let totalFilled = 0;
        let downRightDiagValue = 0;
        let downLeftDiagValue = 0;
        for(var y = 0; y < this.tiles.length; y++) {
            let totalRowValue = 0;
            let totalColValue = 0;

            for(var x = 0; x < this.tiles[y].length; x++) {
                // check for row-based wins by recording occurrences
                if(this.tiles[y][x] === "X") {
                    totalFilled++;
                    totalRowValue++;
                }
                else if(this.tiles[y][x] === "O") {
                    totalFilled++;
                    totalRowValue--;
                }

                // Unintuitively, we can simultaneously check for column wins like this
                if(this.tiles[x][y] === "X") {
                    totalColValue++;
                }
                else if(this.tiles[x][y] === "O") {
                    totalColValue--;
                }

                if(x === y) {
                    if(this.tiles[y][x] === "X") {
                        downRightDiagValue++;
                    }
                    else if(this.tiles[y][x] === "O") {
                        downRightDiagValue--;
                    }
                }

                if((x + y) == this.tiles.length) {
                    if(this.tiles[y][x] === "X") {
                        downLeftDiagValue++;
                    }
                    else if(this.tiles[y][x] === "O") {
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
        if(!winner && totalFilled === (this.tiles.length * this.tiles[0].length)) {
            return 0;
        }

        return null;
    }
}

class AiService {
    currentState = null;

    constructor(tiles) {
        this.currentState = new BoardState(tiles);
    }

    decideTurn = () => {
        return this.compute(this.currentState, "O", 0);
    }

    // Returns: { coords: { x, y }, value: # } The value and option chosen is based on how favorable the tree of actions is
    // +1 = X's favor
    // 0 = Neutral
    // -1 = O's favor
    compute = (boardState, turn, depth) => {
        let options = boardState.getEmpty();

        if(options.length == 0) {
            let outcome = boardState.getOutcome();
            if(outcome > 0) {
                outcome = 10 - depth;
            }
            else if(outcome < 0) {
                outcome = depth - 10;
            }

            return {
                coord: null,
                value: outcome
            };
        }

        let lowest = Number.POSITIVE_INFINITY;
        let highest = Number.NEGATIVE_INFINITY;
        let bestOption = null;
        let nextTurn = turn == "X" ? "X" : "O";

        options.forEach((coord) => {
            let newState = this.nextState(boardState, turn, coord);
            // with the next state based off this option, get what the next action would be after
            // and the total value of the tree down
            // Think of it like "This action [x,y] yield ### points"
            let bestNextAction = this.compute(newState, nextTurn, depth + 1);

            if(bestNextAction.value > highest) {
                highest = bestNextAction.value;

                if(turn == "X") {
                    bestOption = { coord: coord, value: bestNextAction.value };
                }
            }

            if(bestNextAction.value < lowest) {
                lowest = bestNextAction.value;

                if(turn == "O") {
                    bestOption = { coord: coord, value: bestNextAction.value };
                }
            }
        });

        return bestOption;
    }

    // make a boardstate wherein the user executed their turn at the given index
    nextState = (currentState, turn, coord) => {
        let newState = new BoardState(currentState.tiles);
        newState.tiles[coord.y][coord.x] = turn;
        return newState;
    }
}

module.exports = AiService;