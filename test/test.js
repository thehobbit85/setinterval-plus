var _setInterval = require(__dirname + '/../setInterval')
var assert = require('assert')

describe('Testing setInterval-plus', function () {
  this.timeout(0)

  it('should print somthing around 400', function (done) {
    var runs = 0
    var timer = new _setInterval(function () {
      // console.log('Run')
      runs++
    }, 100)
    // console.log(timer)
    setTimeout(function () {
      timer.pause()
      setTimeout(function () {
        // console.log('Remaining time for Interval: ', timer.remaining) // Will print around 50 ms
        timer.resume()
        setTimeout(function () {
          timer.stop()
          setTimeout(function () {
            timer.start()
            // console.log('Remaining time for Interval: ', timer.remaining) // Will print 100 ms
            // var check = new Date()
            setTimeout(function () {
              // console.log('Time before rerunning', new Date() - check)
              // console.log(runs)
              assert.equal(runs, 15, 'Should be 15')
              done()
            }, 1045) // Will run 10 more times
          }, 5) // Wll Stop for 5 ms
        }, 200) // Will run for 200 ms which are 2 full runs (we have 50 ms from before)
      }, 100) // Will pause for 100 ms
    }, 350) // Will run for 350 ms which are 3 full runs
  })

})
