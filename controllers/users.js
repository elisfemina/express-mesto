const User = require("../models/user");

const getUser = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "Запрашиваемый пользователь не найден" });
      }
      return res.status(200).send(user);
    })
    .catch(() => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Невалидный id " });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })

    .then((user) => res.status(201).send({ user }))

    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(", ")}`,
        });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

const updateUser = (req, res) => {
  const id = req.user._id;

  return User.findByIdAndUpdate(id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "Запрашиваемый пользователь не найден" });
      }
      return res.status(200).send(user);
    })
    .catch(() => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Некорректные данные" });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

const updateAvatarUser = (req, res) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.params.id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "Запрашиваемый пользователь не найден" });
      }
      return res.status(200).send(user);
    })
    .catch(() => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Некорректные данные" });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatarUser,
};
