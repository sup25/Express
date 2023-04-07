const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }

}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewuser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'username and password is required' })
    //check for duplicate username in database
    const duplicate = userDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(400);//conflict
    try {
        //encrypt the password
        const hashPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser = { username: user, "password": hashPwd }
        userDB.setUsers([...userDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(userDB.users)
        );
        console.log(userDB.users);
        res.status(201).json({ "success": `New user ${user} created` })
    } catch (err) {
        res.status(500).json({ 'message': err.messge });
    }
}

module.exports = { handleNewuser };