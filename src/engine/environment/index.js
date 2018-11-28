const THREE = require('three')
const $ = require('jquery')
const OrbitControls = require('three-orbit-controls')(THREE)
const FlyControls = require('three-fly-controls')(THREE)
const WindowResize = require('three-window-resize')
const dat = require('dat.gui')

class Environment {

  constructor () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
    this.camera.position.z = 10
    this.camera.position.x = 0
    this.camera.position.y = 0


    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: $('#three-canvas')[0]})
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 1)

    // this.controls = new OrbitControls(this.camera)
    this.controls = new THREE.FlyControls(this.camera, this.renderer.domElement)
    this.controls.movementSpeed = 0.1
    this.controls.rollSpeed = 0.01
    this.keyMap = {}

    const windowResize = new WindowResize(this.renderer, this.camera)

    this.gui = new dat.GUI()
    var options = this.gui.addFolder('options')
    this.rotate = true
    options.add(this, 'rotate').listen()
    options.open()

    this._addCubeToScene()
  }

  render () {
    if(this.rotate){
      this.cube.rotation.x+=0.01
      this.cube.rotation.y+=0.01
    }

    this.renderer.render(this.scene, this.camera)

  }

  // 'private'

  _addCubeToScene() {
    var geometry = new THREE.BoxGeometry(1,1,1)
    var material = new THREE.MeshNormalMaterial()
    this.cube = new THREE.Mesh(geometry,material)
    this.scene.add(this.cube)
  }



}

module.exports = Environment
