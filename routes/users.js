const router = require("express").Router();
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatarUser,
} = require("../controllers/users");

router.get("/:userId", getUser);
router.get("/", getUsers);
router.post("/", createUser);
router.patch("/users/me", updateUser);
router.patch("/users/avatar", updateAvatarUser);

module.exports = router;
