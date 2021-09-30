const router = require("express").Router();
const {
  getUser,
  getUsers,
  updateUser,
  updateAvatarUser,
} = require("../controllers/users");

router.get("/:userId", getUser);
router.get("/", getUsers);
router.get("/users/me", getUser);
router.patch("/me", updateUser);
router.patch("/avatar", updateAvatarUser);

module.exports = router;
