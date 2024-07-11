const express = require('express');
const bodyParser = require('body-parser');
const punteggioRoutes = require('./routes/punteggio');
const sequelize = require('./config/database');

const app = express();

app.use((req, res, next) => {
    //res.header('Access-Control-Allow-Origin', '*'); // Permetti richieste da qualsiasi origine
    res.header('Access-Control-Allow-Origin', 'vscode-webview://1adinm7kh7eljqarnvle82ef3qnb4iur0dr4mvv4a84p5rm2n69c'); // Permetti richieste solo da questa origine specifica
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());

app.use('/api/punteggio', punteggioRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Unable to connect to the database:', err));
