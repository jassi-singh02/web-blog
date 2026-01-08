/**
 * 4) ADD DELETE FEATURE (easiest CRUD next)
 *    - Add a route:
 *        app.post("/posts/:id/delete", (req, res) => {
 *          const id = req.params.id;
 *          posts = posts.filter(p => p.id !== id);
 *          res.redirect("/");
 *        });
 *
 *    - In EJS loop, add a Delete button form for each post:
 *        <form action="/posts/<%= post.id %>/delete" method="POST">
 *          <button type="submit">Delete</button>
 *        </form>
 *
 * 5) ADD EDIT FEATURE (after delete)
 *    - Add page route (edit form):
 *        GET /posts/:id/edit -> render edit.ejs with the post’s existing values
 *
 *    - Add update route:
 *        POST /posts/:id -> update that post’s title/content then redirect
 *
 * 6) OPTIONAL: ADD VIEW-SINGLE-POST PAGE
 *    - GET /posts/:id -> render a "post.ejs" page (nice for real blogs)
 *
 * 7) FORM IMPROVEMENTS
 *    - Change Content input -> <textarea> for multi-line writing
 *    - Validate title/content not empty (server-side)
 *
 * 8) EXPRESS CLEANUP
 *    - You can replace bodyParser with built-in Express middleware:
 *        app.use(express.urlencoded({ extended: true }));
 */



import express from "express";
import bodyParser from "body-parser";
import crypto from "crypto";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});


// Next step is to create a delete route here
app.post("/submit", (req, res) => {
  const title = req.body.Title;
  const content = req.body.Content;
  
  const newPost = {
    id: crypto.randomUUID(),
    title: title,
    content: content,
    createdAt: new Date()
  }

  posts.push(newPost);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});