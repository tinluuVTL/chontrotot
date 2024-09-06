const router = require("express").Router()
const ctrls = require("../controllers/rating.controller")
const validateDto = require("../middlewares/validateDto.middleware")
const joi = require("joi")
const { numberReq, string } = require("../middlewares/schema.middleware")
const { verifyToken } = require("../middlewares/verifyToken.middleware")

router.post(
  "/:pid",
  verifyToken,
  validateDto(
    joi.object({
      content: string,
      score: numberReq,
    })
  ),
  ctrls.create
)
module.exports = router
