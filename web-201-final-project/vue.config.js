const fs = require("fs");

module.exports = {
  devServer: {
    host: "localhost",
    hot: true,
    disableHostCheck: true,
    https: {
      key: fs.readFileSync("./certificate/key.pem"),
      cert: fs.readFileSync("./certificate/cert.pem")
    }
  }
};
