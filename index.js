const express = require('express')
const retrieveTrashCalendar = require('./retrieve-trash-calendar')
const app = express()

app.get('/:street', function (req, res) {
  const street = req.params.street
  const fileName = `Abfallkalender ${street}.ics`
  retrieveTrashCalendar(req.params.street)
    .then(t => res.attachment(fileName).send(t))
    .catch(_ => res.status(404).send(`No data found for ${street}`))
})

app.listen(3000, function () {
  console.log('Trash calendar listening on port 3000!')
})
