const { URL } = require('url')
const got = require('got')
const cheerio = require('cheerio')
const cartesian = require('cartesian')
const map = require('lodash/fp/map')
const zipObject = require('lodash/fp/zipObject')
const flatMap = require('lodash/flatMap')
const extractTrashDates = require('./extract-trash-dates')
const iCal = require('./ical')

function trashDatesToEventList(trashDates) {
  return flatMap(Object.entries(trashDates), cartesian)
    .map(zipObject(['title', 'date']))
}

const url = new URL('https://web3.karlsruhe.de/service/abfall/akal/akal.php')
url.searchParams.set('strasse', 'LUISENSTRAßE 1-25Z')

got(url)
  .then(response => cheerio.load(response.body))
  .then(extractTrashDates)
  .then(trashDatesToEventList)
  .then(map(iCal.createEventComponent))
  .then(iCal.createCalendarComponent)
  .then(cal => console.log(cal.toString()))
  .catch(err => console.error(err))
