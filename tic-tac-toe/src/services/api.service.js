

class ApiService {
    baseUrl = "http://localhost:9000";
    endpoints = {
        game: "/game/"
    };

    constructor() {
    }

    getGameId() {
        return localStorage.getItem("gameId");
    }

    getGame(id) {
        return fetch(this.baseUrl + this.endpoints.game + id).then((result) => result.json());
    }

    updateGame(id, turn, tiles) {
        let body = {
            turn: turn,
            tiles: tiles
        };
        return fetch(
            this.baseUrl + this.endpoints.game + id,
            {
                method: "POST",
                body: JSON.stringify(body)
            }
        ).then((result) => result.json());
    }
}