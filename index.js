import express from "express";
import bodyparser from "body-parser";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const blogs = [];

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { blogs: blogs });
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/write", (req, res) => {
  res.render("write.ejs");
});

app.post("/submit", (req, res) => {
  const username = req.body.username || "Anonymous";
  const newBlog = req.body.blog;
  if (newBlog.trim()) {
    blogs.push({ username: username.trim(), content: newBlog.trim() });
  }
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const blogIndex = parseInt(req.body.index, 10);
  if (!isNaN(blogIndex)) {
    blogs.splice(blogIndex, 1);
  }
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const blogIndex = parseInt(req.body.index, 10);
  const updatedContent = req.body.content;

  if (!isNaN(blogIndex) && updatedContent) {
    blogs[blogIndex].content = updatedContent.trim(); // Update the blog content
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
