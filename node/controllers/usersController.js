var connector = require("../poolconnect");
exports.createtable = (req, res) => {
  console.log(connector);
  const sql =
    "CREATE TABLE users (Id int AUTO_INCREMENT PRIMARY KEY,username varchar(20) NOT NULL,password varchar(100) NOT NULL,doc DATE)";
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json({ err, results, fields });
    }
  });
};
exports.insertUsers = (req, res) => {
  const { id, username, password } = req.body;
  let doc = new Date();
  let sql = `SELECT * FROM users WHERE username = "${username}"`;
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json({ err });
    } else {
      if (results.length > 0) {
        res.json({ status: 0, debug_data: "username already exists" });
      } else {
        const sqlQuery = `INSERT INTO users (id, username, password, doc) VALUES(?,?,?,?)`;
        connector.query(
          sqlQuery,
          [id, username, password, doc],
          function (err, results, fields) {
            if (err) {
              res.json(err);
            } else {
              res.json({ status: 1, data: "user created" });
            }
          }
        );
      }
    }
  });
};
exports.selectAll = (req, res) => {
  const sql = `SELECT * FROM users`;
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
};
exports.viewUser = (req, res) => {
  const sql = `SELECT * FROM users WHERE Id = "${parseInt(req.params.id)}"`;
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
};
exports.deleteUser = (req, res) => {
  console.log(req.params);
  const sql = `DELETE FROM users where Id = "${parseInt(req.params.id)}"`;
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
};
exports.deleteAll = (req, res) => {
  const sql = `DELETE FROM users`;
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
};
exports.updateUsers = (req, res) => {
  const { username, password, doc } = req.body;
  const sql = `UPDATE users SET username=?,password=?,doc=? where Id="${parseInt(
    req.params.id
  )}"`;
  connector.query(
    sql,
    [username, password, doc],
    function (err, results, fields) {
      if (err) {
        res.json(err);
      } else {
        res.json(results);
      }
    }
  );
};

exports.checkLogin = (req, res) => {
  console.log("heloo");
  const { username, password } = req.body;
  console.log(req.body);
  let flag = false;
  console.log("incorrectlogged");
  connector.query("SELECT * FROM users", (error, result) => {
    result.forEach((user) => {
      if (user.username === username && user.password === password) {
        flag = true;
      }
    });
    if (flag) {
      req.session["isLoggedIn"] = 1;
      req.session["username"] = username;
      res.json({ status: 1, data: username });
      console.log("logged");
    } else {
      req.session["isLoggedIn"] = 0;
      console.log("incorrectlogged");
      res.json({ status: 0, data: "incorrect login details" });
    }
  });
};
exports.loggedUser = (req, res) => {
  console.log("loggeduser");
  if (req.session.isLoggedIn === 1) {
    const sql = "SELECT * FROM users where username=?;";
    connector.query(sql, [req.session.username], (error, result) => {
      res.json({ error, result });
    });
  } else {
    res.json({ status: 0, debug_data: "you are not logged in " });
  }
};
