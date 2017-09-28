const moment = require('moment')
const { Component, Property } = require('immutable-ics')

const version = require('./package').version
const idDomain = 'ka-trash.raphinesse.de'
const PRODID = `${idDomain}@${version}`


function formatDate(date) {
  return moment(date).format('YYYYMMDD')
}

function eventUid(event) {
  return `${event.title}-${formatDate(event.date)}@${idDomain}`
}

module.exports = {
  createEventComponent(event) {
    return new Component({
      name: 'VEVENT',
      properties: [
        new Property({ name: 'UID', value: eventUid(event) }),
        new Property({ name: 'SUMMARY', value: event.title }),
        new Property({ name: 'DTSTAMP', value: new Date() }),
        new Property({
          name: 'DTSTART',
          parameters: { VALUE: 'DATE' },
          value: formatDate(event.date),
        }),
      ]
    })
  },
  createCalendarComponent(events) {
    return new Component({
      name: 'VCALENDAR',
      properties: [
        new Property({ name: 'VERSION', value: 2 }),
        new Property({ name: 'PRODID', value: PRODID }),
      ],
      components: events,
    })
  },
}
