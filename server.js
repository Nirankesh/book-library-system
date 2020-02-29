var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./routes")(app);

/** LISTEN ON PORT NUMBER 5000 */

app.listen(port, () => {
  console.log("server is running " + port);
});
