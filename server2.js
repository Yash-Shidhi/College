const express = require("express");
const app = express();

const body1 = require("body-parser");
const Student1 = require("./connect");
const encoded = body1.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.post("/signup", encoded, async (req, res) => {
  let student = await Student1(req.body);
  student
    .save()
    .then(() => {
      res.redirect("/dashboard");
    })
    .catch((err) => console.log(err));
});

app.use(express.static(__dirname));
app.use(express.static(__dirname + "/HOME"));

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/LOGIN/login.html");
});

app.post("/loggedin", encoded, async (req, res) => {
  const username1 = req.body.username;
  const password1 = req.body.password;
  Student1.findOne({ policy: username1, password: password1 })
    .then((student) => {
      if (student) {
        console.log(student);
        res.redirect("/dashboard");
      } else {
        res.status(401).send("Invalid username or password");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/HOME/index.html");
});

app.listen(8099, () => {
  console.log("Server is rumming on port 8099");
});
