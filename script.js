const express = require("express");
const bodyParser = require("body-parser");
const bcryp = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/adminRoutes")
const tenderRoutes = require("./routes/tenderRoutes")

const app = express();

const dbURL = 'mongodb+srv://admin:admin@tenderdb.f9vl9.mongodb.net/tender-db?retryWrites=true&w=majority';


app.set("view engine", "ejs");

mongoose.connect(dbURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000, () => {
        console.log("app is running on port 3000...");
    }))
    .catch((err) => console.log(err))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());

const database = {
    users: [
        {
            id: "123",
            name: "John",
            email: "john@gmail.com",
            password: "john",
        },
        {
            id: "124",
            name: "Sally",
            email: "sally@gmail.com",
            password: "sally",
        },
    ],
};

app.get("/", (req, res) => {
    res.redirect("/tender")
})



app.get("/login", (req, res) => {
    res.render("login", { title: "Login" })
})



app.use( "/admin", adminRoutes)

app.use( "/tender", tenderRoutes)




app.post("/signin", (req, res) => {
    if (
        req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password
    ) {
        res.json("success...");
    } else {
        res.status(400).json("error logging in...");
    }
})

app.post("/register", (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, null, null, function (err, hash) {
        console.log(hash);
    })
    database.users.push({
        id: "125",
        name: name,
        email: email,
        password: password,
    })
    res.json(database.users[database.users.length - 1]);
})

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach((user) => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not found...');
    }
})

// app.get("/add", (req, res) => {
//     const tender = new Tender({
//         title: "yeni baslik",
//         detail: "detay",
//         status: 1,
//         minPrice: 1
//     })

//     tender.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

// app.get("/all", (req, res) => {
//     Tender.find().then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

app.use((req, res) => {
    res.status(404).render("404", { title: "Sayfa bulunamadı..." })
})
