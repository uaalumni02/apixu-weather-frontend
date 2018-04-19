require('dotenv').config();

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var axios = require('axios');
var app = express();


var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    return res.render('home')
});

app.post('/', (req, res) => {
    var city = req.body.city;

    console.log(city);
    var requestUrl = 'https://temp-search.herokuapp.com/weather?q=' + city;

    return axios.get(requestUrl)
        .then((response) => {
            const responseData = response.data;

            return res.status(200)
                .render('result', { response: responseData });
        })
        .catch((err) => {
            res.send(err.message);
        });
});

app.listen(PORT, () => {
    console.log('Running on 8080');
})