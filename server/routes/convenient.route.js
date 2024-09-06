const router = require("express").Router()
const ctrls = require("../controllers/convenient.controller")

router.get("/all", ctrls.getAllConvenients)

module.exports = router
