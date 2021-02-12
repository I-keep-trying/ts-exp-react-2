import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/api', function(req, res) {
    res.send('Example');
});

app.use(express.static('public'));

const port = 3000;

app.listen(port);

console.log(`Server started on port ${port}`);
