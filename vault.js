const config = require("./config.json");
const vault = require("node-vault")({ ...config.vault });
const mountPoint = "github";

function payload(token) {
  return new Promise((resolve, reject) => {
    vault
      .auths()
      .then(result => {
        if (result.hasOwnProperty("github/")) return undefined;
        return vault.enableAuth({
          mount_point: mountPoint,
          type: "github",
          description: "GitHub auth"
        });
      })
      .then(() => vault.githubLogin({ token }))
      .then(() => vault.read("gcp//token//token-role-set"))
      .then(resolve)
      .catch(err => reject(err));
  });
}

module.exports = { payload };
