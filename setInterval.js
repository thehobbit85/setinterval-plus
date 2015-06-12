function _setInterval (callback, interval) {
  var timer, startTime, waiter
  var state = 0 //  0 = idle, 1 = running, 2 = paused, 3= resumed
  this.remaining = 0

  this.pause = function () {
    if (state !== 1) return
    var runTime = new Date() - startTime
    this.remaining = runTime % interval
    clearInterval(timer)
    state = 2
  }

  this.resume = function () {
    if (state !== 2) return
    state = 3
    var self = this
    waiter = setTimeout(function () {
      if (state !== 3) return
      callback()
      state = 0
      self.start()
    }, this.remaining)
  }

  this.stop = function () {
    if (state === 0) return
    this.remaining = -1
    clearTimeout(waiter)
    clearInterval(timer)
    state = 0
  }

  this.start = function () {
    if (state !== 0) return
    startTime = new Date()
    timer = setInterval(callback, interval)
    state = 1
  }

  this.start()
}

module.exports = _setInterval
