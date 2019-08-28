const express = require("express");
const mustacheExpress = require("mustache-express");
const path = require("path");
const models = require("./models");
const aws = require("aws-sdk");
aws.config.update({ region: "us-east-2" });
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("static"));

const VIEWS_PATH = path.join(__dirname, "/views");
const S3_BUCKET = process.env.S3_BUCKET;

app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");

app.get("/", (req, res) => {
  models.Personality.findAll()
    .then(personality => {
      res.render("personality", { personality: personality });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/personality/:name", (req, res) => {
  let personalityName = req.params.name;
  models.Personality.findOne({
    where: {
      name: personalityName
    }
  })
    .then(chosenPersonality => {
      res.render("index", { personality: chosenPersonality });
    })
    .catch(error => {
      models.Personality.findAll().then(personality => {
        res.render("personality", {
          personality: personality,
          message: "Unable to find personality!"
        });
      });
    });
});

app.listen(PORT, () => {
  console.log("Server is running...");
});
