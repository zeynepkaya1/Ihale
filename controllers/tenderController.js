const Tender = require("../models/ihale");

const tender_index = (req, res) => {
    Tender.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render("index", { title: "Anasayfa", tenders: result });
        })
        .catch((err) => {
            console.log(err)
        })
}

const tender_content = (req, res) => {
    const id = req.params.id

    Tender.findById(id)
    .then((result) => {
        res.render("tender", { tender: result, title: "Detay"})
    })
}


module.exports = {
    tender_index,
    tender_content
}