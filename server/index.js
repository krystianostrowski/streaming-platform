const app = require('express')();
const port = 3001;

const videos = [
    {
        title: "Test",
    },
    {
        title: "Test2"
    }
]

app.get('/api/videos', (req, res) => {
    res.send(videos);
});

app.listen(port, () => console.log("Server listening at http://localhost:3001"));
