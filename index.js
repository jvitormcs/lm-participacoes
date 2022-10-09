const express = require('express')
const app = express()
const SwaggerUi = require("swagger-ui-express");
const Docs = require('./swagger.json')
require('dotenv').config();
const conn = require('./db/conn')
const cors = require('cors')

const protocol = process.env.PROTOCOL || "http";
const ip = require("ip").address();
const port = process.env.PORT || 3030;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(express.static('public'))

const routes = require("./routers");

app.use('/docs', SwaggerUi.serve, SwaggerUi.setup(Docs))

app.use(routes);
conn.sync().then(() => {
app.listen(port, () =>
  console.log(
    `Server iniciado em: https:${port} or ${protocol}://${ip}:${port}
    `
  )
)}).catch((err) => console.log(err));
