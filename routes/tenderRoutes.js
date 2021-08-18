const express = require("express")
const router = express.Router()
const Tender = require("../models/ihale");


router.get("/tender", (req, res) => {
    Tender.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render("index", { title: "Anasayfa", tenders: result });
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get("/tender/:id", (req, res) => {
    const id = req.params.id

    Tender.findById(id)
    .then((result) => {
        res.render("tender", { tender: result, title: "Detay"})
    })
})

module.exports = router