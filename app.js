const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express() 
const PORT = 3000
const path = require('path')
const models = require('./models')

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('static'))
app.use(express.static('js'))

const VIEWS_PATH = path.join(__dirname, '/views')

app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine', "mustache")

app.get('/', (req, res) => {

    models.Personality.findAll()
        .then((personality) => {
            console.log(personality)
            res.render('personality', {personality: personality})
        })
})

app.get('/personality/:personality', (req, res) => {
    let personality = req.params.personality
    models.Personality.findOne({
        where: {
            name: personality
        }
    }).then(chosenPersonality => res.render(`/personality/${chosenPersonality}`, {personality: chosenPersonality}))
        .catch(error => {
            models.Personality.findAll()
            .then((personality) => {
                res.render('personality', {personality: personality, message: "Unable to find personality!"})
            })
        })
})

app.listen(PORT, () => {
    console.log("Server is running...")
})





// models.Personality.findAll()
//     .then((personalities) => console.log(personalities))

// models.Personality.findAll({
//     where: {
//         id: 3
//     }
// }).then((personality) => console.log(personality))

// models.Personality.findOne({
//     where: {
//         name: "Steve"
//     }
// }).then((personality) => console.log(personality))

// let personality = models.Personality.build({
//     name: 'Steve',
//     title: 'Group Lead',
//     location: 'Dallas, TX',
//     bio: 'Why do I have to write a bio.'
// })

// personality.save().then((newPersonality) => {
//     console.log(newPersonality)
// })