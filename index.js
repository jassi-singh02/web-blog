import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const title = req.body.Title;
  const content = req.body.Content;
  console.log(`Title: ${title}, Content: ${content}`);
  res.send("Form submitted successfully!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});