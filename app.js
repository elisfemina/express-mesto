const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World2");
});

app.use((req, res, next) => {
  req.user = {
    _id: "6141cc6ab0fd4840bd5110f7", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

app.use("/users", require("./routes/users"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
