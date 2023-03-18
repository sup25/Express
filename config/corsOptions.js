const whitelist = [
    'https://www.yoursite.com',
    'http://127.0.0.1:3000',
    'http://localhost:2000']
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
module.exports = corsOptions