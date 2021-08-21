class BoardState {
    tiles = [];
    turn = "X";

    constructor(existing) {
        this.tiles = Array.from(existing.tiles);
        this.turn = existing.turn;
    }

    // Get an array of indexes of the tileset which are empty
    getEmpty = () => {
        return this.tiles.reduce((accu, currentValue, index) => {
            if(currentValue === "") {
                accu.push(index);
            }
            return accu;
        }, []);
    }

    getOutcome = () => {
        
    }
}

class AiService {
    currentState = new BoardState();
    currentlyRunning = false;

    constructor(tiles) {
        currentState = new BoardState(tiles, "O");
        this.currentlyRunning = false;

        // enough fun, lets parse this to something simple
        // ["X", "O", "", "","","", "","",""] style
        tiles.forEach((row) => {
            row.forEach(entry => {
                this.tiles.push(entry);
            });
        })
    }

    // Get an array of indexes of the tileset which are empty
    getEmpty = (tiles) => {
        return tiles.reduce((accu, currentValue, index) => {
            if(currentValue === "") {
                accu.push(index);
            }
            return accu;
        }, []);
    }

    compute = (boardState, turn, depth) => {
        let emptyTiles = this.getEmpty(tiles);

        // end of the line
        if(emptyTiles.length === 0) {
            return 0;
        }

        let next = emptyTiles.map((pos) => {
            // what does it look like if this action was taken?
            let newState = predictTurn(boardState, turn, pos);

            // Whats the result of taking this action?
            return compute(newState);
        });
    }

    // make a boardstate wherein the user executed their turn at the given index
    predictTurn = (tiles, turn, index) => {
        let newState = new BoardState(tiles, turn);
        newState.tiles[index] = turn;
        return newState;
    }
}

module.exports = AiService;