const express = require("express")
const { google } = require("googleapis")

const app = express()

app.set("view engine", "ejs")
app.use(express.static('style'))
app.use(express.static('scripts'))
app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/hours", async(req, res) => {
    const { request, name } = req.body

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })

    // Create client instance for auth
    const client = await auth.getClient()

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client })

    const spreadsheetId = "1XCeHA3VTSejwD_GbFDkWN7n-wRwhPLHoYcmJ2HBhsvc"

    // Read rows from spreadsheet
    const data = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Hours!A2:C",
    })

    res.send(data)
})

app.get("/events", async(req, res) => {
    const { request, name } = req.body

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })

    // Create client instance for auth
    const client = await auth.getClient()

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client })

    const spreadsheetId = "1XCeHA3VTSejwD_GbFDkWN7n-wRwhPLHoYcmJ2HBhsvc"

    // Read rows from spreadsheet
    const data = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Events!A2:C",
    })

    res.send(data)
})

const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({
        args: [
            '--start-fullscreen',
            '--app=http://localhost:1337' // you can also use '--start-fullscreen'
        ],
        headless: false,
        defaultViewport: null,
    })
})()

app.listen(1337, (req, res) => console.log("running on 1337"))