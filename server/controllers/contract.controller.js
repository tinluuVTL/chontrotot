const asyncHandler = require("express-async-handler")
const db = require("../models")
const nodemailer = require('nodemailer') 
module.exports = {
  create: asyncHandler(async (req, res) => {
    const { firstName, lastName, CID, address, ...data } = req.body
    const response = await Promise.all([
      db.Contract.create(data),
      db.Room.update({ position: "Đã thuê" }, { where: { id: data.roomId } }),
      db.Payment.update(
        { status: "Thành công" },
        {
          where: {
            roomId: data.roomId,
            userId: data.userId,
            status: "Đang chờ",
          },
        }
      ),
    ])
    const alreadyUpdateProfile = await db.Profile.findOne({ where: { userId: data.userId } })
    if (alreadyUpdateProfile) {
      await db.Profile.update({ firstName, lastName, CID, address }, { where: { userId: data.userId } })
    } else {
      await db.Profile.create({ firstName, lastName, CID, address, userId: data.userId })
    }

    return res.json({
      success: !!response[0],
      mes: response[0] ? "Thêm hợp đồng thành công" : "Có lỗi",
      response,
    })
  }),
  get: asyncHandler(async (req, res) => {
    const { limit, page, sort, fields, keyword, postedBy, userId, ...filters } = req.query
    const options = {}
    if (postedBy) filters["$rRoom.rPost.postedBy$"] = postedBy
    if (fields) {
      const attributes = fields.split(",")
      const isExclude = attributes.some((el) => el.startsWith("-"))
      if (isExclude)
        options.attributes = {
          exclude: attributes.map((el) => el.replace("-", "")),
        }
      else options.attributes = attributes
    }
    if (keyword)
      filters[Op.or] = [
        {
          title: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("Post.title")),
            "LIKE",
            `%${keyword.toLocaleLowerCase()}%`
          ),
        },
        {
          address: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("Post.address")),
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
      const response = await db.Contract.findAll({
        where: filters,
        subQuery: false,
        // include: [
        //   {
        //     model: db.Post,
        //     as: "rPost",
        //     attributes: ["id", "postedBy", "title"],
        //   },
        // ],
        ...options,
        distinct: true,
      })
      return res.json({
        success: response.length > 0,
        mes: response.length > 0 ? "Got." : "Có lỗi, hãy thử lại sau.",
        contracts: response,
      })
    }
    const prevPage = !page || page === 1 ? 0 : page - 1
    const offset = prevPage * limit
    if (offset) options.offset = offset
    options.limit = +limit
    const response = await db.Contract.findAndCountAll({
      where: filters,
      subQuery: false,
      include: [
        {
          model: db.Room,
          as: "rRoom",
          attributes: ["id", "title", "position"],
          include: [
            {
              model: db.Post,
              as: "rPost",
              attributes: ["id", "title", "postedBy"],
            },
          ],
        },
        {
          model: db.User,
          as: "rUser",
          attributes: ["id", "username", "phone"],
          include: [
            {
              model: db.Profile,
              as: "rprofile",
              attributes: ["firstName", "lastName", "CID", "address", "birthday"],
            },
          ],
        },
        {
          model: db.Payment,
          as: "rPayments",
          attributes: ["total"],
          required: false,

        },
      ],
      ...options,
      distinct: true,
    });
    
    return res.json({
      success: Boolean(response),
      mes: response ? "Got." : "Có lỗi, hãy thử lại sau.",
      contracts: response,
    })
  }),
  getCustomer: asyncHandler(async (req, res) => {
    const { limit, page, sort, fields, keyword, postedBy, ...filters } = req.query
    const options = {}
    if (postedBy) filters["$rRoom.rPost.postedBy$"] = postedBy
    if (fields) {
      const attributes = fields.split(",")
      const isExclude = attributes.some((el) => el.startsWith("-"))
      if (isExclude)
        options.attributes = {
          exclude: attributes.map((el) => el.replace("-", "")),
        }
      else options.attributes = attributes
    }
    if (keyword)
      filters[Op.or] = [
        {
          username: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("User.username")),
            "LIKE",
            `%${keyword.toLocaleLowerCase()}%`
          ),
        },
        { "$rUser.username$": keyword },
        { "$rUser.phone$": keyword },
      ]
    if (sort) {
      const order = sort
        .split(",")
        .map((el) => (el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]))
      options.order = order
    }

    if (!limit) {
      const response = await db.Contract.findAll({
        where: filters,
        subQuery: false,
        ...options,
        distinct: true,
      })
      return res.json({
        success: response.length > 0,
        mes: response.length > 0 ? "Got." : "Có lỗi, hãy thử lại sau.",
        contracts: response,
      })
    }
    const prevPage = !page || page === 1 ? 0 : page - 1
    const offset = prevPage * limit
    if (offset) options.offset = offset
    options.limit = +limit
    const response = await db.Contract.findAndCountAll({
      where: filters,
      subQuery: false,
      include: [
        {
          model: db.User,
          as: "rUser",
          attributes: ["id", "username", "phone"],
          include: [{ model: db.Profile, as: "rprofile" }],
        },
        {
          model: db.Room,
          as: "rRoom",
          attributes: ["id", "title"],
          include: [
            {
              model: db.Post,
              as: "rPost",
              attributes: ["id", "title", "postedBy"],
            },
          ],
        },
      ],
      ...options,
      distinct: true,
    })

    return res.json({
      success: Boolean(response),
      mes: response ? "Got." : "Có lỗi, hãy thử lại sau.",
      contracts: response,
    })
  }),
  update: asyncHandler(async (req, res) => {
    const { id } = req.params
    const response = await db.Contract.update(req.body, { where: { id } })
    return res.json({
      success: response[0] > 0,
      mes: response[0] > 0 ? "Cập nhật thành công." : "Cập nhật không thành công.",
    })
  }),
  remove: asyncHandler(async (req, res) => {
    const { id } = req.params
    const response = await db.Contract.destroy({ where: { id } })
    return res.json({
      success: response > 0,
      mes: response > 0 ? "Xóa thành công." : "Xóa không thành công.",
    })
  }),
  getAdmin: asyncHandler(async (req, res) => {
    const { limit, page, sort, fields, keyword, postedBy, userId, ...filters } = req.query
    const options = {}
    // if (postedBy) filters["$rRoom.rPost.postedBy$"] = postedBy
    if (fields) {
      const attributes = fields.split(",")
      const isExclude = attributes.some((el) => el.startsWith("-"))
      if (isExclude)
        options.attributes = {
          exclude: attributes.map((el) => el.replace("-", "")),
        }
      else options.attributes = attributes
    }
    if (keyword)
      filters[Op.or] = [
        {
          title: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("Post.title")),
            "LIKE",
            `%${keyword.toLocaleLowerCase()}%`
          ),
        },
        {
          address: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("Post.address")),
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
      const response = await db.Contract.findAll({
        where: filters,
        subQuery: false,
        // include: [
        //   {
        //     model: db.Post,
        //     as: "rPost",
        //     attributes: ["id", "postedBy", "title"],
        //   },
        // ],
        ...options,
        distinct: true,
      })
      return res.json({
        success: response.length > 0,
        mes: response.length > 0 ? "Got." : "Có lỗi, hãy thử lại sau.",
        contracts: response,
      })
    }
    const prevPage = !page || page === 1 ? 0 : page - 1
    const offset = prevPage * limit
    if (offset) options.offset = offset
    options.limit = +limit
    const response = await db.Contract.findAndCountAll({
      where: filters,
      subQuery: false,
      include: [
        {
          model: db.Room,
          as: "rRoom",
          attributes: ["id", "title", "position"],
          include: [
            {
              model: db.Post,
              as: "rPost",
              attributes: ["id", "title", "postedBy"],
            },
          ],
        },
        {
          model: db.User,
          as: "rUser",
          attributes: ["id", "username", "phone"],
          include: [
            {
              model: db.Profile,
              as: "rprofile",
              attributes: ["firstName", "lastName", "CID", "address", "birthday"],
            },
          ],
        },
        {
          model: db.Payment,
          as: "rPayments",
          attributes: ["total"],
          required: false,

        },
      ],
      ...options,
      distinct: true,
    });
    
    return res.json({
      success: Boolean(response),
      mes: response ? "Got." : "Có lỗi, hãy thử lại sau.",
      contracts: response,
    })
  }),
  sendContactEmail: asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'vantinluu.vtl@gmail.com',
    to: 'chontrotot.io.vn@gmail.com', 
    subject: 'Thông Tin đăng ký chủ trọ mới !',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ 
      success: true,
      mes: 'Email sent successfully' 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      mes: 'Failed to send email',
      error: error.message 
    });
  }
})
}
// Thêm dấu phẩy ở đây và đặt sendContactEmail vào trong object


