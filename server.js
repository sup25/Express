
//express handles the routes like a waterfall

const express = require('express')
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const PORT = process.env.PORT || 2000;

//custom-middleware logger
app.use(logger)

//third party middleware
//cross origin resource sharing
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:3000', 'http://localhost:2000']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin)//if the domain is in whitelist
        {
            callback(null, true)
        } else {
            callback(new Error('not allowed by CORS'))
        }
    }, optionSuccessStatus: 200
}
app.use(cors(corsOptions))


//built in middleware to handle urlencoded data
//in other words, form  data:
//'content-type:application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

//built in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, '/public')))


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

//app.use doesnot use Regex it is for middleware
//app.all use Regex, used more for routing 

app.all('*', (req, res) => { //put in 404 because we have 404 file(404.html) that means it sends 200 status code which is correct 
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }
    else if (req.accepts('json')) {
        res.json({ error: '404 not found' })
    }
    else {
        res.type('txt').send('404 not found')
    }

})

//node has built in error handling but let us customize error handling

app.use(errorHandler) //go to this page


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));