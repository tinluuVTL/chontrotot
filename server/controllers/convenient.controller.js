const asyncHandler = require("express-async-handler")
const db = require("../models")

module.exports = {
  getAllConvenients: asyncHandler(async (req, res) => {
    const response = await db.Convenient.findAll({
      attributes: ["id", "name", "image"],
    })
    return res.json({
      success: response.length > 0,
      convenients: response,
    })
  }),
}
