const router = require("express").Router()
const ctrls = require("../controllers/room.controller")
const validateDto = require("../middlewares/validateDto.middleware")
const joi = require("joi")
const { numberReq, stringReq, arrayReq, dateReq } = require("../middlewares/schema.middleware")
const { verifyToken, isManager } = require("../middlewares/verifyToken.middleware")

/**
 * Routes
 */
router.get("/", verifyToken, isManager, ctrls.getRooms)
router.delete("/:roomId", verifyToken, isManager, ctrls.remove)
router.patch(
  "/full/:roomId",
  verifyToken,
  isManager,
  validateDto(
    joi.object({
      price: numberReq,
      area: numberReq,
      capsPrice: numberReq,
      internetPrice: numberReq,
      stayMax: numberReq,
      waterPrice: numberReq,
      electricPrice: numberReq,
      title: stringReq,
      convenients: arrayReq,
    })
  ),
  ctrls.updateFull
)
router.patch(
  "/:roomId",
  verifyToken,
  isManager,
  validateDto(
    joi.object({
      price: numberReq,
      area: numberReq,
      capsPrice: numberReq,
      internetPrice: numberReq,
      position: stringReq,
      stayMax: numberReq,
      waterPrice: numberReq,
      electricPrice: numberReq,
    })
  ),
  ctrls.update
)
router.post(
  "/index-counter/add",
  verifyToken,
  isManager,
  validateDto(
    joi.object({
      roomId: numberReq,
      electric: numberReq,
      water: numberReq,
      services: arrayReq,
      date: dateReq,
    })
  ),
  ctrls.addIndexCounter
)
router.post(
  "/add",
  verifyToken,
  isManager,
  validateDto(
    joi.object({
      price: numberReq,
      area: numberReq,
      capsPrice: numberReq,
      internetPrice: numberReq,
      stayMax: numberReq,
      waterPrice: numberReq,
      electricPrice: numberReq,
      postId: numberReq,
      title: stringReq,
      convenients: arrayReq,
    })
  ),
  ctrls.createRoom
)

module.exports = router
