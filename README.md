# setinterval-plus
[![Build Status](https://travis-ci.org/thehobbit85/setinterval-plus.svg?branch=master)](https://travis-ci.org/thehobbit85/setinterval-plus) [![Coverage Status](https://coveralls.io/repos/thehobbit85/setinterval-plus/badge.svg?branch=master)](https://coveralls.io/r/thehobbit85/setinterval-plus?branch=master) [![npm version](https://badge.fury.io/js/setinterval-plus.svg)](http://badge.fury.io/js/setinterval-plus)

setinterval-plus is inspired (and mostly copied) from the [stackoverflow] answer on how to pause and resume normal setInterval timers.
What setinterval-plus provides is a smiliar API as the vanila function setIntreval only the object returned isn't a Timer but instead it returns and object with the ability to start/pause/resume/stop the Timer object with a very intuitive and foolproof API.

### Installation

```sh
$ npm i setinterval-plus
```


### Create a new setinterval-plus

After creating a new instance the timer will start running.

Params:

  - callback - The function to be called on each setInterval iteration. Can't take any args since the function will be called like this: callback()
  - interval - Time in ms to wait between intervals

#### Example:

```js
var callback = function () {
  console.log('Run')
}
var timer = new _setInterval(callback, 1000) // Timer starts ticking
```
### API

```js
timer.pause() // Pauses the interval timer
timer.resume() // Resumes the interval timer at the point where the timer was paused (+/- a few ms)
timer.stop() // Stop a timer and clears the interval
timer.start() // Start back a stoped interval with the original interval time
```

##### Example:

```js
var _setInterval = require('setinterval-plus')

var runs = 0
var timer = new _setInterval(function () {
  console.log('Run')
  runs++
}, 100)
// console.log(timer)
setTimeout(function () {
  timer.pause()
  setTimeout(function () {
    console.log('Remaining time for Interval: ', timer.remaining) // Will print around 50
    timer.resume()
    setTimeout(function () {
      timer.stop()
      setTimeout(function () {
        timer.start()
        console.log('Remaining time for Interval: ', timer.remaining) // Will print -1 which means it restarted running
        var check = new Date()
        setTimeout(function () {
          console.log('Time before rerunning', new Date() - check)
          console.log(runs) // Should print 15
        }, 1045) // Will run 10 more times
      }, 5) // Wll Stop for 5 ms
    }, 200) // Will run for 200 ms which are 2 full runs (we have 50 ms from before)
  }, 100) // Will pause for 100 ms
}, 350) // Will run for 350 ms which are 3 full runs

```
### Testing

In order to test you need to install [mocha] globaly on your machine

```sh
$ cd /"module-path"/setinterval-plus
$ mocha
```


License
----

MIT

[mocha]:https://www.npmjs.com/package/mocha
[stackoverflow]:http://stackoverflow.com/questions/24724852/pause-and-resume-setinterval