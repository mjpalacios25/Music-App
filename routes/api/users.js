const router = require("express").Router();
const usersController = require("../../controllers/UserController");
const playlistController = require("../../controllers/PlaylistController");

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
    .post(playlistController.create)
    .delete(playlistController.remove)
    
router.route("/playlists/:id")
    .get(playlistController.findbyID)
    .put(playlistController.update)
    
    

module.exports = router;