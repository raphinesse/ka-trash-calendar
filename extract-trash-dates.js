const esr = require('escape-string-regexp')
const moment = require('moment-timezone')
const map = require('lodash/map')
const fromPairs = require('lodash/fromPairs')

const germanDateFormat = 'DD.MM.YYYY'
const germanDateRegexString = esr(germanDateFormat).replace(/[DMY]/g, '\\d')
const germanDateRegex = new RegExp(germanDateRegexString, 'g')
function parseGermanDate(s) {
  return moment.tz(s, germanDateFormat, true, 'Europe/Berlin').toDate()
}

function parseTitle(s) {
  return s.split(',')[0]
}

function parseDates(s) {
  return map(s.match(germanDateRegex), parseGermanDate)
}

module.exports = function extractTrashDates($) {
  const rows = $('table').last().find('tr').get()
    .map(r => $(r).find('td').get().map(c => $(c).text()))

  const pairs = rows
    .map(columns => {
      const title = parseTitle(columns[1])
      const dates = parseDates(columns[2])
      return [title, dates]
    })
    .filter(([title, dates]) => title && dates.length)

  return fromPairs(pairs)
}
