const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const SALT_ROUNDS = 10;

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
    .catch((err) => {
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
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
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
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "Запрашиваемый пользователь не найден" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
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
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "Запрашиваемый пользователь не найден" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Некорректные данные" });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const id = req.user._id;

  if (!email || !password) {
    return res.status(400).send({ message: "Отсутствует email или пароль" });
  }

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      const token = jwt.sign({ id }, 'some-secret-key');
      return res.send(token);
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatarUser,
  login,
};
