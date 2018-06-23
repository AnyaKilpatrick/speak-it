const router = require("express").Router();
const userController = require("../../controllers/userController");


router.route("/")
.post(userController.create)
// .get(articleController.findArticles)

// router.route("/:id")
// .put(articleController.deleteArticle)

module.exports = router;
