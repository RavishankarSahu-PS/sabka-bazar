var express = require('express');
var router = express.Router();

const usersData = [
    {
        name: "U1",
        email: "u1@test.com",
        password: "u1",
        id: "u1"
    },
];
/* GET User data */
router.post('/login', function (req, res, next) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const validUser = usersData.filter(user => user.email === email && user.password === password);
        if (validUser.length > 0) {
            const { email, id, name } = validUser[0];
            const token = "uslsfjlsdfjsjdfkljsdf4234234sdafafdasdf";
            res.json({ userData: { email, id, name }, token });
        } else {
            res.json({ message: "Invalid Credential..." });
        }
    } catch (error) {
        res.json({ message: "Invalid Credential..." });
    }

});

//Add user information
router.post('/register', function (req, res, next) {
    usersData.push(req.body)
    res.json(cart);
});

module.exports = router;