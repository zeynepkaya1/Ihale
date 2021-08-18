const Tender = require("../models/ihale");

const admin_index = (req, res) => {
    Tender.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render("admin", { title: "Admin", tenders: result });
    })
    .catch((err) => {
        console.log(err)
    })
}

const admin_add = (req, res) => {
    res.render("add", { title: "Yeni ihale"})
}

const admin_add_post = (req, res) => {
    const tender = new Tender(req.body)

    tender.save()
    .then((result) => {
        res.redirect('/admin')
    })
    .catch((err) => {
        console.log(err)
    })
}

const admin_delete = (req, res) => {
    const id = req.params.id
    Tender.findByIdAndDelete(id)
    .then((result) => {
        res.json({ link:"/admin" })
    })
    .catch((err) => {
        console.log(err)
    })
}


module.exports = {
    admin_index,
    admin_add,
    admin_add_post,
    admin_delete
}