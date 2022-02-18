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

// DISPLAY DIFFERENT PLATFORMS ON PAGE 1
app.get("/platform", (httpreq, resp) => {
  request("http://videogame-api.fly.dev/platforms", (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);
    console.log(data);
    resp.render("platforms", { list: data.platforms });
  });
});

//  DISPLAY DES DIFFERENTS JEUX EN FONCTION DE LA PLATEFORME
app.get("/gameList/:platformId", (httprequest, response) => {
  const routeParameters = httprequest.params;
  const platformId = routeParameters.platformId;
  // console.log(platformId);
  request(`http://videogame-api.fly.dev/games/platforms/${platformId}`, (error, body) => {
    if (error) {
      throw error;
    }
    const result = JSON.parse(body);
    response.render("listOfGames", { list: result.games, total: result.total });
  });
});

//DISPLAY INFORMATIONS OF GAME
app.get("/gameInformation/:itemid", (httprequest, response) => {
  const routeParameters = httprequest.params;
  const game = routeParameters.itemid;
  request(`http://videogame-api.fly.dev/games/${game}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);

    response.render("gameInformation", {
      gameinfo: data,
      gamescreenshots: data.screenshots,
    });
  });
});

//
// APPEL DU SERVEUR

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
