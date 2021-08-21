const express = require ('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Placeholder");
});

app.listen(9000, () => console.log('Backend running on localhost:9000'));