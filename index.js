const express = require("express")
const mustacheExpress = require("mustache-express")
const app = express()
const PORT = process.env.PORT || 8080
const path = require("path")
const models = require("./models")

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("static"))

const VIEWS_PATH = path.join(__dirname, "/views")

app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"))
app.set("views", VIEWS_PATH)
app.set("view engine", "mustache")

app.get("/", (req, res) => {
  models.Personality.findAll()
    .then(personality => {
      // console.log(personality);
      res.render("personality", { personality: personality })
    })
    .catch(error => {
      console.log(error)
    });
});

app.get("/personality/:name", (req, res) => {
  let personalityName = req.params.name
  models.Personality.findOne({
    where: {
      name: personalityName
    }
  })
    .then(chosenPersonality => {
      console.log(chosenPersonality)
      res.render('index', { personality: chosenPersonality })
    })
    .catch(error => {
      models.Personality.findAll().then(personality => {
        res.render("personality", {
          personality: personality,
          message: "Unable to find personality!"
        })
      })
    })
})

app.listen(PORT, () => {
  console.log("Server is running...")
})