const express = require ('express');
const GameService = require ('./game.service');
const TestService = require ('./test.service');
const app = express();
const gameService = new GameService();

const cachedGameStates = {};

// app.use(express.json());

// app.get('/game/:id?', (req, res) => {
//     console.log("Request to get game #: " + req.params.id);
//     console.log("Current cached games are: " + Object.keys(cachedGameStates));

//     let game = cachedGameStates[req.params.id];
//     if(game === null || game === undefined) {
//         game = gameService.createNewGame();
//         cachedGameStates[game.id] = game;
//     }

//     res.send(JSON.stringify(game));
// });

// app.post('/game/:id', (req, res) => {
//     console.log("Request to update game #: " + req.params.id);
//     console.log(req.body);

//     let isValidState = gameService.validateGameState(req.body);

//     let game = cachedGameStates[req.params.id];
//     if(!isValidState || game === null || game === undefined) {
//         res.sendStatus(404);
//     }

//     let newGameState = gameService.updateGame(req.body);
//     if(newGameState.outcome !== "X" && newGameState.outcome !== "O" && newGameState.outcome !== "Tie") {
//         newGameState = gameService.executeAIturn(newGameState);
//     }

//     cachedGameStates[req.params.id] = newGameState;

//     console.log("Returning new state...");
//     res.end(JSON.stringify(newGameState));
// });

app.listen(9000, () => {
    console.log('Backend running on localhost:9000');
    console.log('Running test...');
    let testService = new TestService();
    testService.TestSimple();
});
