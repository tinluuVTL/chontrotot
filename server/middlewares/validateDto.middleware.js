const { throwErrorWithStatus } = require("./errorHandler.middleware")

const validateDto = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body)
  if (error) {
    const message = error.details[0].message?.replaceAll(`\"`, "")
    throwErrorWithStatus(401, message, res, next)
  }
  next()
}

module.exports = validateDto
