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
  const page = httpreq.query;
  console.log(typeof page.page, "line24");
  console.log(page.page, "line25");
  console.log(Number(page.page), "line26");
  if (page.page) {
    request(`http://videogame-api.fly.dev/platforms?page=${Number(page.page)}`, (error, body) => {
      if (error) {
        throw error;
      }

      const data = JSON.parse(body);
      //console.log("\n TEST 32 ", data);
      const totalNumbersOfPages = Math.ceil(data.total / 20);
      // Object.keys(data)
      resp.render("platforms", { list: data.platforms, totalNumbersOfPages });
    });
  } else {
    request("http://videogame-api.fly.dev/platforms", (error, body) => {
      if (error) {
        throw error;
      }
      const data = JSON.parse(body);
      const totalNumbersOfPages = Math.ceil(data.total / 20);

      resp.render("platforms", { list: data.platforms, totalNumbersOfPages });
    });
  }
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
/*
//manage the different platform links

app.get("platforms/", (httprequest, resp) => {
  const page = httprequest.query;
  console.log(page);
  console.log();
  console.log(httprequest.query);
  request(`http://videogame-api.fly.dev/platforms?page=${page}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);

    resp.render("platforms", { list: data.platforms });
  });
});
*/
// APPEL DU SERVEUR

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
