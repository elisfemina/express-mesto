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
router.patch("/me", updateUser);
router.patch("/avatar", updateAvatarUser);

module.exports = router;
