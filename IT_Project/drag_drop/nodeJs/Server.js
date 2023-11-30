const mysql = require('mysql');

const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '', // Assurez-vous que c'est le bon mot de passe
    database: 'drag_and_drop_test',
    charset: 'utf8mb4'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données !");
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Utilisez CORS pour toutes les routes
app.use(cors());

app.use(bodyParser.json());

// ... (le reste de votre code serveur ici)


app.post('/save-stand', (req, res) => {
    const { ID, Event_ID, Color, Name, Rotation, Type, Width, Height, X_position, Y_position } = req.body;
    console
    console.log("Reçu:", req.body); // Pour déboguer

    const sql = "INSERT INTO stands (ID, Event_ID, Color, Name, Rotation, Type, Width, Height, X_position, Y_position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    con.query(sql, [ID, Event_ID, Color, Name, Rotation, Type, Width, Height, X_position, Y_position], function(err, result) {
        if (err) {
            res.status(500).send({ message: "Erreur lors de l'enregistrement des données" });
            throw err;
        }
        res.status(200).send({ message: "Données enregistrées avec succès" });
    });
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});

