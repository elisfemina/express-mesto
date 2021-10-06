const router = require("express").Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getUser,
  getUsers,
  updateUser,
  updateAvatarUser,
} = require("../controllers/users");

const validateUrl = (value) => {
  const result = validator.isURL(value);
  if (!result) {
    throw new Error('Введена некорректная ссылка');
  }

  return value;
};

router.get("/:userId", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateUrl),
  }),
}), getUser);
router.get("/", getUsers);
router.get("/users/me", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateUrl),
  }),
}), getUser);
router.patch("/me", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateUrl),
  }),
}), updateUser);
router.patch("/avatar", celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
}), updateAvatarUser);

module.exports = router;
