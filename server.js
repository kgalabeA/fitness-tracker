const express = require('express');

const app = express();

app.use(express.static('./dist/fitness-tracker'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/fitness-tracker/'}),
);

app.listen(process.env.PORT || 8080);
