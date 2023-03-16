
//express handles the routes like a waterfall

const express = require('express')
const app = express();

const path = require('path');
const PORT = process.env.PORT || 2000;

app.get('/', (req, res) => {
    //one way to server file
    //res.sendFile('./views/index.html', { root: __dirname })
    //another way 
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {   //making .html optional

    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

//handle redirect
app.get('/old-page(.html)?', (req, res) => {

    res.redirect(301, '/new-page.html'); //302 by default, so define 301 in begining of redirect
})

//Route handlers
app.get('/hi(.html)?', (req, res, next) => {
    console.log('attempted to load hi.html')
    next()
}, (req, res) => {
    res.send('Hi mom!');
})

//chaninig route handlers

const one = (req, res, next) => {
    console.log('one')
    next();
}
const two = (req, res, next) => {
    console.log('two')
    next();
}
const three = (req, res) => {
    console.log('three')
    res.send('Finished')
}

app.get('/chain(.html)?', [one, two, three]);

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html')) //chain in 404 because we have 404 file that means it sends 200 status code which is correct 
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));