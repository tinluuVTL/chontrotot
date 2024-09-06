const jsonwebtoken = require("jsonwebtoken")
const db = require("../models")
const verifyToken = async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization?.split(" ")[1]
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          mes: "Hết phiên, yêu cầu đăng nhập.",
        })
      }
      req.user = decode
      next()
    })
  } else {
    return res.status(401).json({
      success: false,
      mes: "Hết phiên, yêu cầu đăng nhập.",
    })
  }
}

const isManager = async (req, res, next) => {
  const { id } = req.user
  const isValid = await db.Role_User.findOne({
    where: { userId: id, roleCode: "MANAGER" },
  })
  if (!isValid)
    return res.status(401).json({
      success: false,
      mes: "Bạn không có quyền truy cập",
    })

  next()
}
const isAdmin = async (req, res, next) => {
  const { id } = req.user
  const isValid = await db.Role_User.findOne({
    where: { userId: id, roleCode: "ADMIN" },
  })
  if (!isValid)
    return res.status(401).json({
      success: false,
      mes: "Bạn không có quyền truy cập",
    })

  next()
}
module.exports = {
  verifyToken,
  isManager,
  isAdmin,
}
