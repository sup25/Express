const express = require('express')
const router = express.Router();
const path = require('path')


router.get('^/$|/index(.html)?', (req, res) => { //making .html optional while typing in browser

    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

// router.get('/new-page(.html)?', (req, res) => {

//     res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'))
// })

// //handle redirect
// router.get('/old-page(.html)?', (req, res) => {

//     res.redirect(301, '/new-page.html'); //302 by default, so define 301 in begining of redirect
// })

module.exports = router