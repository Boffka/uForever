# uForever: Web UI for [forever](https://github.com/nodejitsu/forever)  [![Gittip](http://badgr.co/gittip/boffka.png)](https://www.gittip.com/boffka/)
***

*Simple Application for administration Node.js running units
================================

Web UI builded with:

* [Bootstrap 3](http://getbootstrap.com/)
* [JQuery](http://jquery.com/)
* [Angular.js](http://angularjs.org/)
* Node modules:
  * [Express](http://expressjs.com/)
  * [Forever](https://github.com/nodejitsu/forever)
  * [JSON file store](https://github.com/flosse/json-file-store)
  * [Moment](http://momentjs.com/)
  * [Passport](https://github.com/jaredhanson/passport)

## Main Features
  * Forever control
    * Restart All
    * Stop All
  * Unit control
    * Start
    * Stop
    * Restart
    * View all runned units
    * View running status (online, offline)
    * View environment
    * View uptime
    * View log
  * No DB needed (using JSON file store)
  * Add Units to DB
    * Notes:
      * Custom unit name
      * Unit description
      * Port
    * Parameters:
      * Script name
      * sourceDir
      * cwd
      * Environment (development, production)
      * Custom log name
      * spinSleepTime
      * minUptime
      * watch
  * Run Units from DB
  * Users administration



## Installation
### Via npm (node package manager)

``` bash
      npm install node-uforever && sudo node node_modules/node-uforever/app.js
```

and browse ```http://127.0.0.1:3102```

## TODO
 * Maintance control (Memory, CPU, workers ...)
 * Unit start scheduler
 * Create Unit environment
    * Automatic creation application folder
    * Automatic creation FTP account for deploy & nginx .vhost file





Web Application, for an NodeJS administration.
Builded on [Angular.js](http://angularjs.org/)