const mysql = require('mysql');

const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '', // Assurez-vous que c'est le bon mot de passe
    database: 'it_project',
    charset: 'utf8mb4'
});

con.connect(function(err) {
    if (err) throw err;
    //console.log("Connecté à la base de données !");
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

    //console.log("Reçu:", req.body); // Pour déboguer
    const sql = "INSERT INTO stands (ID, Event_ID, Color, Name, Rotation, Type, Width, Height, X_position, Y_position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    con.query(sql, [ID, Event_ID, Color, Name, Rotation, Type, Width, Height, X_position, Y_position], function(err, result) {
        if (err) {
            res.status(500).send({ message: "Erreur lors de l'enregistrement des données" });
            throw err;
        }
        res.status(200).send({ message: "Données enregistrées avec succès" });
    });
});

app.post('/clear-stands', (req, res) => {
    // Récupération de l'ID à partir de la requête
    const eventId = req.query.eventId;
    console.log(eventId);

    // Vérifiez que l'ID est fourni
    if (!eventId) {
        return res.status(400).send({ message: "L'ID de l'événement est requis" });
    }

    // Requête SQL pour supprimer les lignes correspondant à l'ID
    const sql = "DELETE FROM stands WHERE Event_ID = ?";
    console.log(sql);
    
    // Exécution de la requête SQL
    con.query(sql, [eventId], function(err, result) {
        console.log(result);
        if (err) {
            res.status(500).send({ message: "Erreur lors de la suppression des données" });
            throw err;
        }
        res.status(200).send({ message: "Données supprimées avec succès" });
    });
});


app.get('/getDimensions', (req, res) => {
    // Récupérer l'ID depuis la requête GET
    const eventId = req.query.eventId;

    // Vérifier si l'ID est fourni
    if (!eventId) {
        return res.status(400).send('Aucun ID d\'événement fourni');
    }

    // Modifier la requête SQL pour filtrer en fonction de l'ID
    const sql = 'SELECT market_height, market_width, small_height, small_width, medium_height, medium_width, large_height, large_width, id FROM events WHERE id = ?';

    con.query(sql, [eventId], (err, result) => {
        if (err) {
            //console.log(err);
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            //console.log(result);
            res.json(result);
        }
    });
});
app.get('/getStands', (req, res) => {
    // Récupérer l'ID depuis la requête GET
    const eventId = req.query.eventId;
    //console.log(eventId);

    // Vérifier si l'ID est fourni
    if (!eventId) {
        return res.status(400).send('Aucun ID d\'événement fourni');
    }

    // Modifier la requête SQL pour sélectionner les champs spécifiques en fonction de l'ID
    const sql = 'SELECT ID, Event_ID, Color, Name, Rotation, Type, Width, Height, X_position, Y_position FROM stands WHERE Event_ID = ?';

    con.query(sql, [eventId], (err, result) => {
        if (err) {
            //console.log(err);
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            //console.log(result);
            res.json(result);
        }
    });
});



app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});

