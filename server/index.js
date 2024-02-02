// Import the express function
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const saltRounds = 10
const { check, validationResult } = require('express-validator')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "266701",
    database: "ruiz"
})

app.post("/register", [
    check('email', "Email length error!").isEmail().isLength({min: 10, max: 30}),
    check('password', "Password length 8-10").isLength({min:8, max:10})
], (req, res) => {
    // Check existing user
    const q = "SELECT * FROM users WHERE name = ? OR email = ?"
    db.query(q, [req.body.name, req.body.email], async (err, data) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.json(errors)
        }
        if(err) return res.json(err)
        if(data.length > 0) return res.status(409).json("User already exists!")

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const q = "INSERT INTO users(`name`, `email`, `password`) VALUES(?)"
        const values = [req.body.name, req.body.email, hashedPassword]

        db.query(q, [values], (err, data) => {
            if(err) return res.json(err)
            return res.status(200).json("User has been created!")
        })

    })
})

app.listen(5001, () => {
    console.log("Running...");
})