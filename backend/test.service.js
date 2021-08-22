const AiService = require ('./ai.service');

class TestService {

    TestSimple = () => {
        console.log("TestSimple");
        // Ai's turn, 2 options
        let tiles = [
            ["X","X","O"],
            ["O","X",""],
            ["X","","O"]
        ];
        console.log("Start State");
        this.PrintState(tiles);

        let aiService = new AiService(tiles);
        let bestOption = aiService.decideTurn();

        console.log(bestOption);
        tiles[bestOption.coord.y][bestOption.coord.x] = "O";
        console.log("Board state after turn:");
        this.PrintState(tiles);
    }

    TestEasy = () => {
        console.log("TestEasy");
        // Ai's turn, 2 options
        let tiles = [
            ["X","X",""],
            ["O","",""],
            ["X","","O"]
        ];
        console.log("Start State");
        this.PrintState(tiles);

        let aiService = new AiService(tiles);
        let bestOption = aiService.decideTurn();

        console.log(bestOption);
        tiles[bestOption.coord.y][bestOption.coord.x] = "O";
        console.log("Board state after turn:");
        this.PrintState(tiles);
    }

    TestMedium = () => {
        console.log("TestMedium");
        // Ai's turn, 2 options
        let tiles = [
            ["X","",""],
            ["","",""],
            ["X","","O"]
        ];
        console.log("Start State");
        this.PrintState(tiles);

        let aiService = new AiService(tiles);
        let bestOption = aiService.decideTurn();

        console.log(bestOption);
        tiles[bestOption.coord.y][bestOption.coord.x] = "O";
        console.log("Board state after turn:");
        this.PrintState(tiles);
    }

    TestHard = () => {
        console.log("TestMedium");
        // Ai's turn, 2 options
        let tiles = [
            ["X","",""],
            ["","",""],
            ["","",""]
        ];
        console.log("Start State");
        this.PrintState(tiles);

        let aiService = new AiService(tiles);
        let bestOption = aiService.decideTurn();

        console.log(bestOption);
        tiles[bestOption.coord.y][bestOption.coord.x] = "O";
        console.log("Board state after turn:");
        this.PrintState(tiles);
    }

    PrintState = (tiles) => {
        console.log(tiles[0]);
        console.log(tiles[1]);
        console.log(tiles[2]);
    }
}

module.exports = TestService;