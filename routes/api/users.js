const router = require("express").Router();
const usersController = require("../../controllers/UserController");

router.route("/")
    .get(usersController.findAll)
    .post(usersController.create)


router.route("/:id")
    .get(usersController.findbyID)
    .delete(usersController.remove)
    .put(usersController.update)


module.exports = router;