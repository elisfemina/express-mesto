const express = require("express");
const mongoose = require("mongoose");

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.post('/signin', login);
app.post('/signup', createUser);

// авторизация

app.use(auth);

app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: "Некорректные данные" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
