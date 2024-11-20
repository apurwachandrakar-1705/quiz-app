require('dotenv').config()
const { expressjwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.SCORE_URL;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [`${api}/users/login`, `${api}/users/register`],
  });
}
module.exports = authJwt;
