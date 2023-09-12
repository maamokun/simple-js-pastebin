require('dotenv').config();
const express = require('express');
const {getAndDecrypt, encrypt} = require('./helpers/EncryptionManager');
const app = express();

app.get ('/', (req, res) => {
    res.send('Hello, world!');
})

app.get('/view/', (req, res) => {
    const id = req.query.id;
    const key = req.query.key;
    const decrypted = getAndDecrypt(key, id);
    res.send(decrypted);
})

app.get(/encrypt/, (req, res) => {
    res.statusCode = 405;
    res.send('Method not allowed: Please use POST instead of GET');
})


app.post('/encrypt/', (req, res) => {
    const data = req.query.data;
    const encrypted = encrypt(data);
    const url = process.env.BASE_URL + '/view/?id=' + encrypted.id + '&key=' + encrypted.readableKey;
    res.json(`View your paste at ${url}`);
})
    
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})
