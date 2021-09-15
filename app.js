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

// app.use((req, res, next) => {
//   req.user = {
//     _id: "5d8b8592978f8bd833ca8133", // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };

//   next();
// });

mongoose
  .connect("mongodb://localhost:27017/mestodb")
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

mongoose.connection.on("open", () => console.log("DB Connected!"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
