import express from "express";
import nunjucks from "nunjucks";
import request from "@fewlines-education/request";

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

// AFFICHER LES DIFFERENTES PLATFORMS
app.get("/platform", (httpreq, resp) => {
  request("http://videogame-api.fly.dev/platforms", (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);

    resp.render("platforms", { plateform: data.platforms });
  });
});

// AFFICHER DIFFERENTS JEUX EN FONCTION DE LA PLATEFORME

app.get("/Platform/:itemname/:itemid", (httpRequest, response) => {
  const routeParameters = httpRequest.params;
  const id = routeParameters.itemid;
  const name = routeParameters.itemname;
  request(`http://videogame-api.fly.dev/games/platforms/${id}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);

    response.render("games", { catalogGames: data.games, nom: name });
  });
});

// AFFICHER LES DETAILS DES JEUX

app.get("/Platform/Windows%20Phone/games/game/:itemname/:itemid/", (httprequest, response) => {
  const routeParameters = httprequest.params;
  const game = routeParameters.itemid;
  request(`http://videogame-api.fly.dev/games/${game}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);
    console.log(data.screenshots);
    response.render("game", {
      gameinfo: data,
      gamegenres: data.genres,
      gamescreenshots: data.screenshots,
    });
  });
});

// APPEL DU SERVEUR

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
