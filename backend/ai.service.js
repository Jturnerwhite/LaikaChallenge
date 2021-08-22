const BoardState = require('./boardstate');

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

        let outcome = boardState.getOutcome();
        if(outcome != null) {
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
        let nextTurn = (turn == "X") ? "O" : "X";

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

        // debug logging
        // if(depth === 0) {
        //     console.log("Top branch");
        //     console.log("Options:");
        //     console.log(options);
        //     console.log("Best:");
        //     console.log(bestOption);
        // }

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