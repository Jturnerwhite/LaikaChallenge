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
        let aiService = new AiService(tiles);
        console.log(aiService.decideTurn());
    }
}

module.exports = TestService;