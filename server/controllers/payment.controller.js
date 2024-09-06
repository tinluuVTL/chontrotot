const asyncHandler = require("express-async-handler")
const db = require("../models")

module.exports = {
  createNewPayment: asyncHandler(async (req, res) => {
    const response = await Promise.all([
      db.Payment.create(req.body),
      db.Room.update(
        { position: "Đang xử lý" },
        { where: { id: req.body.roomId } }
      ),
    ])
    return res.json({
      success: !!response,
      mes: response
        ? "Thanh toán thành công. Hãy tải hợp đồng rồi đi gặp chủ trọ để hoàn tất thủ tục"
        : "Có lỗi",
    })
  }),
}
