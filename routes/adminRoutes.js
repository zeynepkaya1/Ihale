const express = require("express")
const router = express.Router()
const Tender = require("../models/ihale");

router.get("/admin", (req, res) => {
    Tender.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render("admin", { title: "Admin", tenders: result });
    })
    .catch((err) => {
        console.log(err)
    })
})

router.get("/admin/add", (req, res) => {
    res.render("add", { title: "Yeni ihale"})
})

router.post("/admin/add", (req, res) => {
    const tender = new Tender(req.body)

    tender.save()
    .then((result) => {
        res.redirect('/admin')
    })
    .catch((err) => {
        console.log(err)
    })
})

router.delete("/admin/delete/:id", (req, res) => {
    const id = req.params.id
    Tender.findByIdAndDelete(id)
    .then((result) => {
        res.json({ link:"/admin" })
    })
    .catch((err) => {
        console.log(err)
    })
})


module.exports = router