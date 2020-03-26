const express = require('express');
const router = express.Router();
const Walks = require('../models/walks.js');

router.get('/', (req, res) => {
    Walks.find({}, (error, foundWalks) => {
        res.json(foundWalks);
    })
})

router.post('/', (req, res) => {
    Walks.create(req.body, (err, createdWalk) => {
        res.json(createdWalk);
    });
});

router.delete('/:id', (req, res) => {
    Walks.findByIdAndRemove(req.params.id, (error, deletedWalk) => {
        res.json(deletedWalk);
    });
});

router.put('/:id', (req, res) => {
    Walks.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedWalk) => {
        res.json(updatedWalk);
    })
})

module.exports = router;
