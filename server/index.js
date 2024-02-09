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
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}))
app.use(cookieParser())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "266701",
    database: "ruiz"
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json("You are not logged in")
    }else{
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err){
                return res.json("The token is not correct!")
            }else{
                req.name = decoded.name;
                next();
            }
        })
    }
}

app.get("/", verifyUser, (req, res) => {
    return res.json({Status: "Jimba", name: req.name})
})

app.post("/register", [
    check('name')
    .not().isEmpty().withMessage("Field(s) can't be empty!")
    .isLength({min: 3}).withMessage("Name must be of at least 3 characters long.")
    .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.'),
    check('email')
    .not().isEmpty().withMessage("Field(s) can't be empty!")
    .isEmail().withMessage("Invalid email address")
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).withMessage("Invalid Email Address!"),
    check('password')
    .not().isEmpty().withMessage("Field(s) can't be empty!")
    .isLength({min:8}).withMessage("Password must contain at least 8 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).withMessage("Password must contain a number, lowercase & uppercase letter")
], (req, res) => {
    // Check existing user
    const q = "SELECT * FROM users WHERE name = ? OR email = ?"
    db.query(q, [req.body.name, req.body.email], async (err, data) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.json(Object.values(errors.errors[0])[2])
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

app.post("/login", [
    check('email')
    .not().isEmpty().withMessage("Field(s) can't be empty!"),
    check('password')
    .not().isEmpty().withMessage("Field(s) can't be empty!")
], (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if(err) return res.json("Login error in server");
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.json(Object.values(errors.errors[0])[2])
        }
        if(data.length > 0){
            bcrypt.compare(req.body.password, data[0].password, (err, response) => {
                if(err) return res.json("Wrong password");
                if(response){
                    const name = data[0].name;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: "1d"});
                    res.cookie('token', token)
                    return res.status(200).json("User has been Logged In!");
                }else{
                    return res.json("Wrong password");
                }
            })
        }else{
            return res.json("No email match")
        }
    })
})

app.get("/logout", (req, res) => {
    res.clearCookie('token')
    return res.json("User logged out")
})

app.listen(5001, () => {
    console.log("Running...");
})