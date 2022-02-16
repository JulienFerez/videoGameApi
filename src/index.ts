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
/*// AFFICHER LES DIFFERENTES PLATEFORMES
app.get("/game", (httpreq, resp) => {
  request("http://videogame-api.fly.dev/games/platforms/<platform_id>", (error, body) => {
    if (error) {
      throw error;
    }
    const games = JSON.parse(body).games;
    console.log(games, "Line 28");
    resp.render("platform", { games });
  });
});
*/

// AFFICHER LES DIFFERENTES PLATFORMS
app.get("/platform", (httpreq, resp) => {
  request("http://videogame-api.fly.dev/platforms", (error, body) => {
    if (error) {
      throw error;
    }
    const platforms = JSON.parse(body).platforms;
    console.log(platforms);
    resp.render("platforms", { platforms });
  });
});

// AFFICHER DIFFERENTS JEUX EN FONCTION DE LA PLATEFORME
app.get("/platforms/:game", (httprequest, resp) => {
  request(`https://videogame-api.fly.dev/games/platforms/${game}`, (error, body) => {
    if (error) {
      throw error;
    }
    const games = JSON.parse(body).games;
    // console.log(games);
    resp.render("game", { games });
  });
});

// APPEL DU SERVEUR

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
