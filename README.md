# Karlsruhe Trash Calendar

A server that parses official Karlsruhe trash collection dates and serves them in iCalendar format.

## Setup

```
$ git clone https://github.com/raphinesse/ka-trash-calendar.git
$ cd ka-trash-calendar
$ echo 4711 > port.json
$ npm i && npm start
```

## Usage

Send a `GET` request to `http://HOST/LOCATION-ID` where `LOCATION-ID` is a valid value for the search parameter `strasse` of the [city's offical trash calendar web site][city trash site]. For example

```
curl http://localhost:4711/ABRAHAM-LINCOLN-ALLEE
```

[city trash site]: https://web3.karlsruhe.de/service/abfall/akal/akal.php
