const Environment = require('./environment')
const View = require('./view')
const $ = require('jquery')
const loop = require('raf-loop')

class Engine {

  constructor () {
    this.environment = new Environment()
    this.view = new View()
  }

  bindEventListeners () {
    // $(window).load(this.view.closeLoadingScreen)
    $(window).on('load', this.view.closeLoadingScreen)
  }


  start () {
    loop((dt) => {
      this.environment.render()
      if (this.environment.controls) {
        this.environment.controls.update(dt)
      }
    }).start()
  }

}

module.exports = Engine
