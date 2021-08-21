class AiService {
    tiles = [];
    currentlyRunning = false;

    constructor(tiles) {
        this.tiles = [];
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

    compute = (tiles) => {
        let scoreCalc = Number.MAX_VALUE;
        let emptyTiles = this.getEmpty(tiles);

        let next = emptyTiles.map(() => {
            
        });
    }
}

module.exports = AiService;