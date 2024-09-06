const asyncHandler = require("express-async-handler")
const db = require("../models")
const { Sequelize } = require("sequelize")

module.exports = {
  create: asyncHandler(async (req, res) => {
    const { id } = req.user
    const { pid } = req.params
    const { content, score } = req.body
    const alreadyRatingUser = await db.Rating.findOne({
      where: { postId: pid, userId: id },
    })
    if (alreadyRatingUser) {
      await db.Rating.update(
        { content, score },
        { where: { id: alreadyRatingUser.id } }
      )
    } else {
      await db.Rating.create({
        userId: id,
        postId: pid,
        content,
        score,
      })
    }

    const getScore = await db.Rating.findAll({
      attributes: [[Sequelize.fn("AVG", Sequelize.col("score")), "score"]],
      raw: true,
    })
    if (getScore[0] && getScore[0].score)
      await db.Post.update({ star: getScore[0].score }, { where: { id: pid } })

    return res.json({
      success: true,
      mes: "Đánh giá thành công",
    })
  }),
}
