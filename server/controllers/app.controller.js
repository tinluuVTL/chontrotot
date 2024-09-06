const asyncHandler = require("express-async-handler")
const db = require("../models")
const { Op, Sequelize } = require("sequelize")
module.exports = {
  getRoles: asyncHandler(async (req, res) => {
    const roles = await db.Role.findAll({
      attributes: ["code", "value"],
    })

    return res.json({
      success: roles.length > 0,
      roles,
    })
  }),
  getCatalogs: asyncHandler(async (req, res) => {
    const response = await db.Catalog.findAll()

    return res.json({
      success: response.length > 0,
      catalogs: response,
    })
  }),
  getDashboardManager: asyncHandler(async (req, res) => {
    const { id } = req.user
    const { days, type, from, to } = req.query
    const daysQuery = days || 220
    const typeDate = type === "MONTH" ? "MM-YY" : "DD-MM-YY"
    const start = from || Date.now() - daysQuery * 24 * 60 * 60 * 1000
    const end = to || Date.now()
    const q = { postedBy: id }
    if (from && to) {
      if (from === to)
        q.createdAt = {
          [Op.and]: [{ [Op.gte]: `${from} 00:00:00` }, { [Op.lte]: `${from} 23:59:59` }],
        }
      else
        q.createdAt = {
          [Op.and]: [{ [Op.lte]: `${end} 23:59:59` }, { [Op.gte]: `${start} 00:00:00` }],
        }
    }
    const [postData, classifyPost, views, roomStatus] = await Promise.all([
      db.Post.findAll({
        where: q,
        attributes: [
          [Sequelize.fn("to_char", Sequelize.col("createdAt"), typeDate), "createdOn"],
          [Sequelize.fn("COUNT", Sequelize.col("Post.id")), "postCounter"],
        ],
        order: [[Sequelize.literal('"createdOn"'), "ASC"]],
        group: "createdOn",
      }),
      db.Post.findAll({
        where: q,
        attributes: ["isDeleted", [Sequelize.fn("COUNT", Sequelize.col("Post.id")), "postCounter"]],
        order: [[Sequelize.literal('"isDeleted"'), "ASC"]],
        group: "isDeleted",
      }),
      db.Post.findAll({
        where: q,
        attributes: [[Sequelize.fn("SUM", Sequelize.col("Post.views")), "viewCounter"]],
      }),
      db.Post.findAll({
        where: q,
        attributes: ["id"],
        include: [
          {
            model: db.Room,
            as: "rRooms",
            attributes: ["position", "id"],
            include: [
              {
                model: db.Payment,
                // where: { status: "Thành công" },
                as: "rPayment",
                attributes: ["total", "status"],
              },
            ],
          },
        ],
      }),
    ])

    return res.json({
      success: true,
      data: { postData, classifyPost, views, roomStatus },
    })
  }),
  getDashboardAdmin: asyncHandler(async (req, res) => {
    const { id } = req.user
    const { days, type, from, to } = req.query
    const daysQuery = days || 220
    const typeDate = type === "MONTH" ? "MM-YY" : "DD-MM-YY"
    const start = from || Date.now() - daysQuery * 24 * 60 * 60 * 1000
    const end = to || Date.now()
    const q = {}
    if (from && to) {
      if (from === to)
        q.createdAt = {
          [Op.and]: [{ [Op.gte]: `${from} 00:00:00` }, { [Op.lte]: `${from} 23:59:59` }],
        }
      else
        q.createdAt = {
          [Op.and]: [{ [Op.lte]: `${end} 23:59:59` }, { [Op.gte]: `${start} 00:00:00` }],
        }
    }
    const [postData, views, userCount, userRoles, paymentStatus] = await Promise.all([
      db.Post.findAll({
        where: q,
        attributes: [
          [Sequelize.fn("to_char", Sequelize.col("createdAt"), typeDate), "createdOn"],
          [Sequelize.fn("COUNT", Sequelize.col("Post.id")), "postCounter"],
        ],
        order: [[Sequelize.literal('"createdOn"'), "ASC"]],
        group: "createdOn",
      }),

      db.Post.findAll({
        where: q,
        attributes: [[Sequelize.fn("SUM", Sequelize.col("Post.views")), "viewCounter"]],
      }),
      db.User.findAll({
        where: q,
        attributes: [[Sequelize.fn("count", Sequelize.col("User.id")), "userCounter"]],
      }),
      db.Role_User.findAll({
        where: q,
        attributes: [[Sequelize.fn("count", Sequelize.col("Role_User.id")), "count"], "roleCode"],
        group: "roleCode",
      }),
      db.Payment.findAll({
        where: q,
        attributes: [[Sequelize.fn("SUM", Sequelize.col("Payment.total")), "total"], "status"],
        group: ["status"],
      }),
    ])

    return res.json({
      success: true,
      data: { postData, views, paymentStatus, userRoles, userCount },
    })
  }),
}
