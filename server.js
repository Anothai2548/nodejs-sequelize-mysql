express = require("express")
const app = express()
const PORT = process.env.PORT || 8080

const db = require("./app/module")
db.sequelize.sync()
    .then(() => {
        console.log("Sysnced DB")
    })
    .catch(() => {
        console.log("Failed to sysnc DB")
    })

app.use(express.json())

app.use(express.urlencoded({extend: true}))

app.get("/", (req, res) => {
    res.json({meassage: "Welcome to ITD102 application"})
})

require("./app/routes/tutorial.routes.js")(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
