const router = require("express").Router();
const usersController = require("../../controllers/UserController");

router.route("/")
    .get(usersController.findAll)
    .post(usersController.validate, usersController.create)

router.route("/logout")
    .post(usersController.logout)

router.route("/login")
    .post(usersController.logIn)

router.route("/profile")
    .get(usersController.loggedIn)

router.route("/:id")
    .get(usersController.findbyID)
    .delete(usersController.remove)
    .put(usersController.update)


module.exports = router;