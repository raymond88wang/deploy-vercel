const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')
const breadSeed = require('../seeds/bread_seed.js')

// /breads
// INDEX
breads.get('/', async (req, res) => {
    const foundBakers = await Baker.find().lean()
    const foundBreads = await Bread.find().limit(2).lean()
    res.render(
        'index',
        {
            breads: foundBreads,
            bakers: foundBakers,
            title: 'Index Page'
        }
    )
})

// breads/new
// NEW
breads.get('/new', (req, res) => {
    Baker
        .find()
        .then(foundBakers => {
            res.render(
                'new',
                {
                    bakers: foundBakers
                })
        })
})

// /breads/0
// /breads/1
// /breads/111
// /breads/a
// http://localhost:3003/breads/64eeaa79cef0b2292ab03107
// SHOW
breads.get('/:id', (req, res) => {
    if (req.params.id) {
        Bread
            .findById(req.params.id)
            .populate("baker")
            .then(bread => {
                res.render(
                    'show',
                    {
                        bread: bread,
                        id: req.params.id
                    })
            })
            .catch(err => {
                console.log(err)
                res.render('notFound')
            })
    } else {
        res.render('notFound')
    }
    //res.send(Bread[req.params.arrayIndex])
})

// CREATE
// CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
      req.body.image = undefined
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread
        .create(req.body)
        .then(createdBread => {
            res.redirect('/breads')
        })
        .catch(err => {
            res.send(err)
        })
})

// DELETE
breads.delete('/:id', async (req, res) => {
    if (req.params.id) {
        Bread
            .findByIdAndDelete(req.params.id) 
            .then(deletedBread => {
                res.status(303).redirect('/breads')
            })
    } else {
        res.render('notFound')
    }
})

// EDIT
breads.get('/:id/edit', (req, res) => {
    Baker
        .find()
        .then(foundBakers => {
            if (req.params.id) {
                Bread
                    .findById(req.params.id)
                    .populate("baker")
                    .then(bread => {
                        res.render(
                            'Edit', 
                            {
                                bread: bread,
                                bakers: foundBakers
                            })
                    })
            } else {
                res.render('notFound')
            }
        })
})

// UPDATE
breads.put('/:id', (req, res) => {
    if (req.params.id) {
        if(req.body.hasGluten === 'on'){
            req.body.hasGluten = true
          } else {
            req.body.hasGluten = false
          }

          Bread
              .findByIdAndUpdate(req.params.id, req.body, { new: true }) 
              .then(updatedBread => {
                  console.log(updatedBread) 
                  res.redirect(`/breads/${req.params.id}`)
              })
    } else {
        res.render('notFound')
    }
})

breads.get('/data/seed', (req, res) => {
    Bread
        .insertMany(breadSeed)
        .then(createdBreads => {
            res.redirect('/breads')
        })
})
  
module.exports = breads
