const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;

  return Card.create({ name, link })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Некорректные данные" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Невалидный id" });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Невалидный id" });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Невалидный id" });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Невалидный id" });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Невалидный id" });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Невалидный id" });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
