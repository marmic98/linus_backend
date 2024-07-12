const express = require('express');
const router = express.Router();
const Punteggio = require('../models/punteggio');

// Endpoint per registrare o aggiornare un punteggio
router.post('/save', async (req, res) => {
    const { id, punteggio } = req.body;
    try {
        let punteggioUtente = await Punteggio.findOne({ where: { id } });
        if (punteggioUtente) {
            if(punteggioUtente.punteggio > punteggio){
                punteggioUtente.punteggio = punteggio;  // Aggiorna il punteggio se esiste e se è migliore
                await punteggioUtente.save();
            }                
        } else {
            punteggioUtente = await Punteggio.create({ id, punteggio });  // Crea un nuovo documento se non esiste
        }
        res.status(200).json(punteggioUtente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint per ottenere il punteggio di un utente
router.get('/:id', async (req, res) => {
    try {
        const punteggioUtente = await Punteggio.findOne({ where: { id: req.params.id } });
        if (punteggioUtente) {
            res.status(200).json(punteggioUtente);
        } else {
            res.status(404).json({ message: 'Utente non trovato' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint per ottenere i punteggi di tutti gli utenti
router.get('/', async (req, res) => {
    try {
        const punteggi = (await Punteggio.findAll({
            order: [['punteggio', 'ASC']]
        }));
        res.status(200).json(punteggi);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
