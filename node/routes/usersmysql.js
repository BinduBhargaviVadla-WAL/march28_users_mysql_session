var express = require("express");
var router = express.Router();
var usersController = require("../controllers/usersController");
router.get("/createtable", usersController.createtable);
router.post("/", usersController.insertUsers);
router.get("/", usersController.selectAll);
router.get("/:id", usersController.viewUser);
router.delete("/:id", usersController.deleteUser);
router.delete("/", usersController.deleteAll);
router.put("/:id", usersController.updateUsers);
router.get("/checkLogin", usersController.checkLogin);
router.get("/loggedUser", usersController.loggedUser);
module.exports = router;
