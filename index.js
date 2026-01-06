import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let title = "";
let content = "";

app.get("/", (req, res) => {
  res.render("index.ejs", { title, content});
});

app.post("/submit", (req, res) => {
  title = req.body.Title;
  content = req.body.Content;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});