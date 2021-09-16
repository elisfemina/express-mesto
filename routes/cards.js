const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCard);
router.put("/cards/:cardId/likes", likeCard);
router.put("/cards/:cardId/likes", dislikeCard);

module.exports = router;
