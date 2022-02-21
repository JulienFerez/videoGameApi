import express from "express";
import nunjucks from "nunjucks";
//import request from "@fewlines-education/request";
import fetch from "node-fetch";
import { resourceLimits } from "worker_threads";

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.use(express.static("public"));

// HOME SERVER
app.get("/", (request, response) => {
  response.render("home");
});

// DISPLAY DIFFERENT PLATFORMS ON PAGE 1
app.get("/platform", (req, resp) => {
  fetch("http://videogame-api.fly.dev/platforms")
    .then((resp) => resp.json())
    .then((data) => {
      return resp.render("platforms", {
        list: data.platforms,
      });
    });
});

app.get("/gameList/:platformId", (httprequest, resp) => {
  const routeParameters = httprequest.params;
  const platformId = routeParameters.platformId;
  fetch(`http://videogame-api.fly.dev/games/platforms/${platformId}`)
    .then((resp) => resp.json())
    .then((result) => {
      return resp.render("listOfGames", {
        list: result.games,
      });
    });
});

app.get("/gameInformation/:itemid", (httprequest, resp) => {
  const routeParameters = httprequest.params;
  const game = routeParameters.itemid;
  fetch(`http://videogame-api.fly.dev/games/${game}`)
    .then((resp) => resp.json())
    .then((data) => {
      return resp.render("gameInformation", {
        gameinfo: data,
        gamescreenshots: data.screenshots,
      });
    });
});

// APPEL DU SERVEUR

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
