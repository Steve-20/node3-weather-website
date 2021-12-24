const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

//Define static directory for server
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Andrew Mead"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Andew Mead"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "This is some helpful text",
        title: "Help",
        name: "Andrew Mead"
    })
})

app.get("/weather", (req, res) => {
    const inputAddress = req.query.address;

    if (!inputAddress) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(inputAddress, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData,
                address: inputAddress
            })
        })
    })
})


app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Andrew Mead",
        errorMsg: "Help article not found"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Andrew",
        errorMsg: "Page not found"
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})