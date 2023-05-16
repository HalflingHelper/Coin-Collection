const express = require('express');
const mongoose = require('mongoose');
const Coin = require('./models/coin');
const path = require('path');
const { stringify } = require('querystring');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/coin')

app.set('view engine', 'ejs')
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//Change to default homepage
app.get('/', async (req, res) => {
    coin = new Coin();
    res.render('index.ejs',{ coin: new Coin()});
});

//Coin gallery page
app.get('/gallery', async (req, res) => {
    const coins = await Coin.find().sort({ denomination: 'ascending', year: 'ascending'});
    res.render('gallery.ejs', {coins: coins});
})

app.post('/delete/:id', async (req, res) => {
    await Coin.findByIdAndRemove(req.params.id);
    res.redirect('/gallery')
})

//Specifically the searching 
app.get('/:id', async(req, res) => {
    const coin = await Coin.findById(req.params.id);
    res.render('index.ejs', {coin: coin})
})

app.post('/search', async function (req, res) {
    let coin = new Coin()
    coin.denomination = req.body.denomination
    coin.year = req.body.year
    coin.design = req.body.design
    coin.mint = req.body.mint
    coin = await coin.save()


    // if (Coin.exists({year: "bananna"})) {
    //     console.log(req.body.year);
    // } else {
    //     console.log("That coin doesn't exist, adding to database.")
    //     coin.denomination = req.body.denomination
    //     coin.year = req.body.year
    //     coin.design = req.body.design
    //     coin.mint = req.body.mint
    //     coin = await coin.save()
    // }

    // console.log(coin);
    // some code insert data to db
    // then do nothing to res. The page will stay but keep loading.
    res.redirect(`/${coin.id}`)
    console.log(coin)
});


app.listen(8000);
