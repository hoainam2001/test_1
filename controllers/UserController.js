const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

class UserController{
    index(req, res){
        return res.send('index page')
    }
    // [POST] /user/register
    register(req, res){
        const {email, name, password} = req.body
        bcrypt.hash(password, saltRounds)
        .then(hashed => {
            if(hashed){
                const newUser = userModel({
                    email: email,
                    name: name,
                    password: hashed,
                })
        
                const token = jwt.sign(
                    { user_id: newUser._id, email },
                    process.env.JWT_SECRET,
                    {
                    expiresIn: "1h",
                    }
                )
                // save user token
                newUser.token = token;
                newUser.save()
                .then(person => {
                    return res.json({code: 1, token: person.token})
                })
                .catch(err => console.log(err.message))
            }
        })
    }
    // [POST] /user/login
    logIn(req, res){
        const {email, password} = req.body
        userModel.findOne({email: email}, (err, person) => {
            if(err){
                return res.json(err.message)        
            }
            else if(!person){
                return res.json("Email is not exists")
            }
            else{
                let pwd = person.password
                bcrypt.compare(password, pwd)
                .then(match => {
                    if(!match){
                        return res.json("Password is not true")
                    }
                    const token = jwt.sign(
                        { user_id: person._id, email },
                        process.env.JWT_SECRET,
                        {
                        expiresIn: "1h",
                        }
                    )
                    // save user token
                    person.token = token
                    person.updatedAt = Date.now()
                    return res.json({code: 1, data: {token: person.token, email: person.email} })
                })
                .catch(err => {
                    return res.json(err.message)
                })
            }
        })
    }
}

module.exports = new UserController