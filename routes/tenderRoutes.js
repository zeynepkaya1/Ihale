const express = require("express")
const router = express.Router()
const tenderController = require("../controllers/tenderController")


router.get("/", tenderController.tender_index )

router.get("/:id", tenderController.tender_content )


module.exports = router