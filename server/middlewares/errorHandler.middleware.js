const errHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  const formatedMessage = error?.message?.replaceAll(`\"`, ``)
  return res.status(statusCode).json({
    success: false,
    mes: formatedMessage,
  })
}

const throwErrorWithStatus = (code, message, res, next) => {
  const formatedMessage = message?.replaceAll(`\"`, `"`)
  const error = new Error(formatedMessage)
  const statusCode = code || 500
  res.status(statusCode)
  next(error)
}

const badRequestException = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found.`)
  res.status(403)
  next(error)
}
module.exports = {
  errHandler,
  throwErrorWithStatus,
  badRequestException,
}
