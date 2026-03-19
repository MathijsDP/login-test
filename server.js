const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Path naar je Documenten-map
const logFilePath = path.join(require('os').homedir(), 'Documents', 'logins.txt');

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Toon plain password in CMD
    console.log(`Plain Password: ${password}`);
    console.log(`Email: ${email}`);

    // Hash voor veilig opslaan
    const hash = await bcrypt.hash(password, 10);

    // Sla alles op in Documenten/logins.txt
    fs.appendFileSync(logFilePath, `Email: ${email} | Password: ${password} | Hash: ${hash}\n`);

    res.send("Login geregistreerd! Check CMD en logins.txt in je Documenten-map.");
});

app.listen(3000, () => {
    console.log("Server draait lokaal op http://localhost:3000");
});