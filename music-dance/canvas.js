const max = 256

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
    this.canvas = document.querySelector(target)
    this.ctx = this.canvas.getContext('2d')
    this.w = this.canvas.clientWidth
    this.h = this.canvas.clientHeight
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
    let x = 0
    let y = 0
    for (let i = 0; i < source.length; i++) {
      let cur = source[i]
      let h = cur / max * this.h
      ctx.beginPath()
      ctx.fillStyle = 'red'
      console.log(h / 2)
      ctx.fillRect(x, 0, 1, h)
      // ctx.fillRect(x, y, 1, h)
      x = x + 5
      ctx.closePath()
    }
  }
}