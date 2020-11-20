const express = require("express")
const request = require("request")
const bodyParser = require("body-parser")
const https = require("https")
const { dirname } = require("path")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)
    const url = "INSERT LIST HERE"
    const options = {
        method: "POST",
        auth: "INSERT AUTH HERE"
    }
    const request = https.request(url, options, (response) => {
        response.statusCode === 200
            ? res.sendFile(__dirname + "/success.html")
            : res.sendFile(__dirname + "/failure.html")

        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()
})

app.post("/failure", (req, res) => {
    res.redirect("/")
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
