import express from "express";
import nunjucks from "nunjucks";

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
