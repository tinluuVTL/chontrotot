const { Sequelize } = require("sequelize")
const env = process.env.NODE_ENV || "development"

const options = {
  host: process.env.POSTGRES_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
  timezone: "+07:00",
  port: Number(process.env.POSTGRES_PORT),
}
if (env === "production")
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  options
)

const dbconn = async () => {
  try {
    await sequelize.authenticate()
    console.log(":::DB CONNECTED!")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

module.exports = dbconn
