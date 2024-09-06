const asyncHandler = require("express-async-handler")
const db = require("../models")
const { Sequelize, Op } = require("sequelize")

module.exports = {
  getRooms: asyncHandler(async (req, res) => {
    const { limit, page, sort, fields, title, keyword, postedBy, isDeleted, ...filters } = req.query
    const options = {}
    if (postedBy) filters["$rPost.postedBy$"] = +postedBy
    if (fields) {
      const attributes = fields.split(",")
      const isExclude = attributes.some((el) => el.startsWith("-"))
      if (isExclude)
        options.attributes = {
          exclude: attributes.map((el) => el.replace("-", "")),
        }
      else options.attributes = attributes
    }
    if (!isDeleted) filters.isDeleted = false
    if (keyword)
      filters[Op.or] = [
        {
          title: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("rPost.title")),
            "LIKE",
            `%${keyword.toLocaleLowerCase()}%`
          ),
        },
        {
          address: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("rPost.address")),
            "LIKE",
            `%${keyword.toLocaleLowerCase()}%`
          ),
        },
      ]
    if (sort) {
      const order = sort
        .split(",")
        .map((el) => (el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]))
      options.order = order
    }

    if (!limit) {
      const response = await db.Room.findAll({
        where: filters,
        subQuery: false,
        include: [
          {
            model: db.Post,
            as: "rPost",
            attributes: ["id", "postedBy", "title"],
          },
        ],
        ...options,
        distinct: true,
      })
      return res.json({
        success: response.length > 0,
        mes: response.length > 0 ? "Got." : "Có lỗi, hãy thử lại sau.",
        rooms: response,
      })
    }
    const prevPage = !page || page === 1 ? 0 : page - 1
    const offset = prevPage * limit
    if (offset) options.offset = offset
    options.limit = +limit
    const response = await db.Room.findAndCountAll({
      where: filters,
      // subQuery: false,
      ...options,
      include: [
        {
          model: db.Post,
          as: "rPost",
          attributes: ["id", "postedBy", "title"],
          required: true,
        },
        {
          model: db.Payment,
          as: "rPayment",
          include: [{ model: db.User, attributes: ["phone"], as: "rUser" }],
        },
        {
          model: db.IndexCounter,
          as: "rCounter",
        },
        {
          model: db.Contract,
          as: "rContract",
          attributes: ["id"],
          include: [
            {
              model: db.User,
              as: "rUser",
              attributes: ["id"],
              include: [
                {
                  model: db.Profile,
                  as: "rprofile",
                  attributes: ["firstName", "lastName"],
                },
              ],
            },
          ],
        },
      ],

      distinct: true,
    })

    return res.json({
      success: Boolean(response),
      mes: response ? "Got." : "Có lỗi, hãy thử lại sau.",
      rooms: response,
      options,
      filters,
    })
  }),
  update: asyncHandler(async (req, res) => {
    const { roomId } = req.params
    const response = await db.Room.update(req.body, { where: { id: roomId } })
    return res.json({
      success: response[0] > 0,
      mes: response[0] > 0 ? "Cập nhật thành công." : "Cập nhật không thành công.",
    })
  }),
  updateFull: asyncHandler(async (req, res) => {
    const { roomId } = req.params
    const { convenients, ...data } = req.body
    const response = await db.Room.update(data, { where: { id: roomId } })
    await db.Room_Convenient.destroy({ where: { roomId } })
    await db.Room_Convenient.bulkCreate(convenients.map((el) => ({ roomId, convenientId: el })))
    return res.json({
      success: response[0] > 0,
      mes: response[0] > 0 ? "Cập nhật thành công." : "Cập nhật không thành công.",
    })
  }),
  remove: asyncHandler(async (req, res) => {
    const { roomId } = req.params
    const response = await db.Room.update({ isDeleted: true }, { where: { id: roomId } })
    return res.json({
      success: response > 0,
      mes: response > 0 ? "Xóa thành công." : "Xóa không thành công.",
    })
  }),
  addIndexCounter: asyncHandler(async (req, res) => {
    const { services, ...data } = req.body
    if (services.some((el) => el === "caps")) data.caps = true
    if (services.some((el) => el === "internet")) data.internet = true

    const response = await db.IndexCounter.create(data)
    return res.json({
      success: !!response,
      mes: response ? "Cập nhật chỉ số thành công" : "Cập nhật chỉ số thất bại.",
    })
  }),
  createRoom: asyncHandler(async (req, res) => {
    const response = await db.Room.create(req.body)
    return res.json({
      success: !!response,
      mes: response ? "Thêm phòng trọ thành công" : "Có lỗi, hãy thử lại sau.",
    })
  }),
}
