/**
 * NEXT STEPS (Blog App Roadmap)
 *
 * 1) CLEAN DATA MODEL
 *    - Replace titleList[] and contentList[] with ONE array of post objects:
 *        let posts = [];
 *        // Each post should look like:
 *        // { id: "some-unique-id", title: "Hello", content: "Body text", createdAt: Date }
 *
 * 2) ADD UNIQUE IDS (so edit/delete targets the right post)
 *    - Use Node's built-in crypto module (NO npm install needed):
 *        import crypto from "crypto";
 *        const id = crypto.randomUUID();   // best option if Node supports it
 *
 *    - If randomUUID is not available, fallback:
 *        const id = crypto.randomBytes(16).toString("hex");
 *
 * 3) UPDATE ROUTES TO USE OBJECTS
 *    - In POST /submit:
 *        const title = req.body.Title;
 *        const content = req.body.Content;
 *        posts.push({ id, title, content, createdAt: new Date() });
 *
 *    - In GET /:
 *        res.render("index.ejs", { posts });
 *
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

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let title = "";
let content = "";
let titleList = [];
let contentList = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { titleList, contentList});
});

app.post("/submit", (req, res) => {
  title = req.body.Title;
  content = req.body.Content;
  titleList.push(title);
  contentList.push(content);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});