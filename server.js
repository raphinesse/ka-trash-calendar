const express = require('express')
const cache = require('apicache').middleware
const port = require('./port')
const retrieveTrashCalendar = require('./retrieve-trash-calendar')

const app = express()

app.get('/:street', cache('1 week'), (req, res) => {
  const street = req.params.street
  const fileName = `Abfallkalender ${street}.ics`
  retrieveTrashCalendar(req.params.street)
    .then(t => res.attachment(fileName).send(t))
    .catch(_ => res.status(404).send(`No data found for ${street}`))
})

const server = app.listen(port, () => {
  console.log(`Trash calendar listening on port ${port}`)
})
