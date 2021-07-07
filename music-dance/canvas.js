const max = 256
const config = {
  width: 10, // 柱体宽度
  space: 15, // 柱体间间距
}

class AudioControl {
  constructor({ size }) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)
    this.audioCtx = audioCtx
    this.audioBufferSourceNode = audioCtx.createBufferSource()
    this.analyserNode = audioCtx.createAnalyser()
    this.size = size || 128
  }
  decodeAudioData(buffer) {
    return new Promise((resolve, reject) => {
      this.audioCtx.decodeAudioData(buffer, (res) => {
        resolve(res)
      }, (e) => reject(e))
    })
  }
  start(buffer) {
    this.audioBufferSourceNode.buffer = buffer
    this.audioBufferSourceNode.connect(this.analyserNode)
    this.audioBufferSourceNode.loop = true
    this.audioBufferSourceNode.start(0)

    this.analyserNode.fftSize = this.size
  }
}

class MusicControl {
  constructor({ target }) {
    const canvas = document.querySelector(target)
    this.canvas = canvas
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    this.ctx = this.canvas.getContext('2d')
    this.w = this.canvas.width
    this.h = this.canvas.height
  }
  drawPanel() {}

  draw(data = []) {
    this.data = data
    this.drawRectangle()
  }

  drawRectangle() {
    console.log('draw')
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.w, this.h)
    const source = this.data
    const { width, space } = config
    let x = 0
    let y = 0
    for (let i = 0; i < source.length; i++) {
      let cur = source[i]
      let h = cur / max * this.h
      ctx.beginPath()
      ctx.fillStyle = 'red'
      ctx.fillRect(x, y, width, h)
      x = x + space
      ctx.closePath()
    }
  }
}