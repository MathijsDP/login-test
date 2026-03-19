const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");

const app = express();
app.use(express.urlencoded({ extended: true }));

// Homepage tonen
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Form verwerken
app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // 👉 plain password tonen (ALLEEN TEST)
    console.log("PLAIN password:", password);

    // 👉 hashing
    const hash = await bcrypt.hash(password, 10); 

    // 👉 alles opslaan in bestand
    const log = `
--- Nieuwe gegevens ---
Email: ${email}
Password (plain): ${password}
Hash: ${hash}
Tijd: ${new Date().toLocaleString()}
---------------------
`;

    fs.appendFileSync("test-log.txt", `Password: ${password}\n`);

    console.log("Opgeslagen in test-log.txt");

    res.send("Data opgeslagen! Check je bestand.");
});

// Server starten
app.listen(3000, () => {
    console.log("Server draait op http://localhost:3000");
});