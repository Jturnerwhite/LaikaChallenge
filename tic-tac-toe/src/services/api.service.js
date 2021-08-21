

class ApiService {
    baseUrl = ""; //http://localhost:9000"; this is set in "proxy" of package.json to avoid CORS issues in development
    endpoints = {
        game: "/game/"
    };

    getGameId() {
        return localStorage.getItem("gameId");
    }

    getGame(id) {
        return fetch(this.baseUrl + this.endpoints.game + id)
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                localStorage.setItem("gameId", result.id);
                return result;
            });
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
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        ).then((result) => result.json());
    }
}

export default ApiService;