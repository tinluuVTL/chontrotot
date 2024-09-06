const router = require("express").Router()
const ctrls = require("../controllers/post.controller")
const {
  verifyToken,
  isManager,
} = require("../middlewares/verifyToken.middleware")
const validateDto = require("../middlewares/validateDto.middleware")
const joi = require("joi")
const {
  stringReq,
  numberReq,
  arrayReq,
  array,
} = require("../middlewares/schema.middleware")
router.post(
  "/new",
  verifyToken,
  isManager,
  validateDto(
    joi.object({
      title: stringReq,
      address: stringReq,
      description: stringReq,
      catalogId: numberReq,
      images: arrayReq,
      rooms: array,
    })
  ),
  ctrls.createNewPost
)
router.patch(
  "/:id",
  verifyToken,
  isManager,
  validateDto(
    joi.object({
      title: stringReq,
      address: stringReq,
      description: stringReq,
      catalogId: numberReq,
      images: arrayReq,
      rooms: array,
    })
  ),
  ctrls.updatePost
)
router.get("/", ctrls.getPosts)
router.get("/:pid", ctrls.getPostById)
router.delete("/:id", verifyToken, isManager, ctrls.removePost)

module.exports = router
