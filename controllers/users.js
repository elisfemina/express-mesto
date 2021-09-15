const User = require("../models/user");

const getUser = (req, res) => {
  const { id } = req.params;

  return User.findById(id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ massage: "Запрашиваемый пользователь не найден" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

const getUsers = (req, res) =>
  User.find({}).then((users) => res.status(200).send(users));

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));

  // return User.create({ ...req.body })

  //   .then((user) => res.status(201).send({ user }))

  //   .catch((err) => {
  //     if (err.name === "ValidationError") {
  //       res.status(400).send({
  //         message: `${Object.values(err.errors)
  //           .map((error) => error.message)
  //           .join(", ")}`,
  //       });
  //     } else {
  //       res.status(500).send({ message: "Произошла ошибка" });
  //     }
  //   });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
};
