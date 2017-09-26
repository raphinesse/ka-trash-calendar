const { Component, Property } = require('immutable-ics')

function eventUid(event) {
  const dateString = event.date.toISOString().split('T')[0]
  return `${event.title}:${dateString}@trash.raphinesse.de`
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
        new Property({ name: 'PRODID', value: `trash.raphinesse.de@0.1.0` }),
      ],
      components: events,
    })
  },
}
