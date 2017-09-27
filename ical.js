const { Component, Property } = require('immutable-ics')
const version = require('./package').version
const idDomain = 'ka-trash.raphinesse.de'

function eventUid(event) {
  const dateString = event.date.toISOString().split('T')[0]
  return `${event.title}:${dateString}@${idDomain}`
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
          value: event.date,
        }),
      ]
    })
  },
  createCalendarComponent(events) {
    return new Component({
      name: 'VCALENDAR',
      properties: [
        new Property({ name: 'VERSION', value: 2 }),
        new Property({ name: 'PRODID', value: `${idDomain}@${version}` }),
      ],
      components: events,
    })
  },
}
