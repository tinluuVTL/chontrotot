const router = require("express").Router()
const ctrls = require("../controllers/payment.controller")
const { verifyToken } = require("../middlewares/verifyToken.middleware")
const validateDto = require("../middlewares/validateDto.middleware")
const joi = require("joi")
const {
  stringReq,
  numberReq,
  number,
} = require("../middlewares/schema.middleware")
router.post(
  "/new",
  validateDto(
    joi.object({
      email: stringReq,
      userId: numberReq,
      roomId: numberReq,
      total: numberReq,
    })
  ),
  ctrls.createNewPayment
)

module.exports = router
