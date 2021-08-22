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

                if((x + y) == (this.tiles.length - 1)) {
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

module.exports = BoardState;