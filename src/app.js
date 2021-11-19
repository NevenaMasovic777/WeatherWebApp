const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
//hbs je biblioteka koja lakse implementira handlebars u express, plugin za express
//u pozadini koristi handlebars biblioteku

const app = express();

//setup paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//for static content
app.use(express.static(publicDirectoryPath)); //for static content

//setup handlers engine and views location
app.set('views', viewsPath);
app.set('view engine','.hbs') //get handlebars set up for dynamic content
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
    res.render('index', {
        title: "Main page",
        message: "This is main page",
        name: "Nevena"
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        message: "This is page about something",
        name: "Nevena"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: "Page where you can find help",
        name: "Nevena"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.location){
        return res.send({error: "Location must be provided"})
    }
    geocode.getGeolocation(req.query.location, (error, response) => {
        if(error){
            res.send({error: error})
            return;
        }
        geocode.getWeather(response.latitude, response.longitude, (err, resp) => {
            if(err){
                res.send({error:err})
                return;
            }
            res.send({
                location: req.query.location,
                weather: resp.currentWeather
            })
        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: "404",
        message: "Page within help section not found",
        name: "Nevena"
    })
})

app.get('*', (req, res) => {
    res.render('not-found', {
        title: "404",
        message: "Page not found",
        name: "Nevena"
    })
})

// app.get('/help', (req, res) => {
//     res.send({
//         name: "Nevena",
//         age: 29
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h2>Page about the weather</h2><br><p>Welcome</p>')
// }) //ako odem na rutu, prikazuje mi se ovo, ako odem na about.html prikazuje mi se html strana



app.listen(3000, () => {
    console.log('Server up and running')
});