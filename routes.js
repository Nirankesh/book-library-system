var fs = require("fs");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.get("/books", function(req, res) {
    let jsonData = JSON.parse(fs.readFileSync("books.json", "utf-8"));
    //console.log(jsonData);
    res.send(jsonData);
  });

  /** ADD BOOK AND WRITE TO JSON FILE AND RETURN CURRENT ADDED BOOK */
  app.post("/books/add", function(req, res) {
    var pushdata = req.body;
    //console.log(pushdata);
    const data = fs.readFileSync("books.json");
    const json = JSON.parse(data);
    if (!!json && json.length >= 1) {
      pushdata._id = parseInt(json[json.length - 1]._id + 1);
    } else {
      pushdata._id = 1;
    }

    json.push(pushdata);
    const jsonString = JSON.stringify(json);
    fs.writeFile("books.json", jsonString, err => {
      if (err) {
        return res.json({ stauts: 400 });
      } else {
        //let jsonData = JSON.parse(fs.readFileSync('books.json', 'utf-8'));
        return res.json(pushdata);
      }
    });
  });

  /** UPDATE BOOK AND WRITE TO JSON FILE AND RETURN CURRENT UPDATED BOOK */
  app.post("/books/update/:_id", function(req, res) {
    const _id = parseInt(req.params._id);
    const req_data = req.body;
    req_data._id = _id;
    const data = fs.readFileSync("books.json");
    var jsonarray = JSON.parse(data);
    for (var i = 0; i < jsonarray.length; i++) {
      if (jsonarray[i]._id === parseInt(_id)) {
        jsonarray[i] = req_data;
      }
    }

    const jsonString = JSON.stringify(jsonarray);
    fs.writeFile("books.json", jsonString, err => {
      if (err) {
        return res.send({ stauts: 400 });
      } else {
        let jsonData = JSON.parse(fs.readFileSync("books.json", "utf-8"));
        return res.send(req_data);
      }
    });
  });

  /** VIEW BOOK */
  app.get("/books/viewbook/:_id", function(req, res) {
    //console.log("dddg");
    const _id = parseInt(req.params._id);
    const data = fs.readFileSync("books.json");
    var jsonarray = JSON.parse(data);

    for (var i = 0; i < jsonarray.length; i++) {
      if (jsonarray[i]._id == _id) {
        return res.send(jsonarray[i]);
      }
    }
  });

  /** DELETE CURRENT BOOK */
  app.get("/books/delete/:_id", function(req, res) {
    var req_id = req.params._id;
    const data = fs.readFileSync("books.json");
    var jsonarray = JSON.parse(data);
    jsonarray = jsonarray.filter(function(obj) {
      return obj._id !== parseInt(req_id);
    });

    const jsonString = JSON.stringify(jsonarray);
    fs.writeFile("books.json", jsonString, err => {
      if (err) {
        return res.send({ stauts: 400 });
      } else {
        let jsonData = JSON.parse(fs.readFileSync("books.json", "utf-8"));
        return res.send(jsonData);
      }
    });
  });
};
