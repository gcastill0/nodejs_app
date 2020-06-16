const express = require("express");
const Router = express.Router();
const $vault = require("../vault");
const request = require("request");

Router.get("/", (req, res) => {
  return res.render("index");
});

Router.post("/vault", async (req, res) => {
  const { token } = req.body;
  try {
    const payload = await $vault.payload(token);
    res.render("result", { payload });
  } catch (err) {
    console.log(err);
    res.render("error");
  }
});

// Router.post("/auth", async (req, res) => {
//   const { token } = req.body;
//   try {
//     const client_token = await processToken(token);
//     const payload = await getSecret(client_token);
//   } catch (err) {
//     res.send("Error has immerged!");
//   }
// });

// function processToken(token) {
//   return new Promise((resolve, reject) => {
//     if (!token) reject({ error: "Token is required", token });
//     request.post(
//       "http://35.196.17.47:8200/v1/auth/github/login",
//       {
//         json: true,
//         form: `{"token": "${token}"}`
//       },
//       (err, resp, body) => {
//         if (err) return reject(err);
//         if (typeof body === "string") body = JSON.parse(body);
//         if (body.auth && body.auth.client_token) {
//           return resolve(body.auth.client_token);
//         } else {
//           return reject({ error: "No client token was found", body });
//         }
//       }
//     );
//   });
// }

// function getSecret(client_token) {
//   return new Promise((resolve, reject) => {
//     request.get(
//       {
//         json: true,
//         url: "http://35.196.17.47:8200/v1/secret/nodejs-app",
//         headers: {
//           "X-Vault-Token": client_token
//         }
//       },
//       (err, r, body) => {
//         if (err) return reject(err);
//         if ("string" === typeof body) body = JSON.parse(body);
//         resolve(body);
//       }
//     );
//   });
// }

module.exports = Router;
