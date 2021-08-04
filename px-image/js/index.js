const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const w = 700
const h = 700
let slic = null

canvas.width = w
canvas.height = h

function drawOriginalImage(imgData) {
  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 0, 0, w, h)

    let canvasData = ctx.getImageData(0, 0, w, h)
    let binaryData = canvasData.data
    slic = new SLIC(binaryData, w, h)
    slic.pixelDeal()
  }
  img.src = imgData
}

class SLIC {
  constructor(binaryData, width, height) {
    console.log(binaryData)
    this.rgbaImageData = Uint8ClampedArray.from(binaryData)
    this.labImageData = []
    this.binaryData = Array.from(binaryData)
    this.w = width
    this.h = height
  }
  rgb2xyz(r, g, b) {
    
  }
  rgb2lab(r, g, b) {

  }
  pixelDeal(blockSize, iters, stride, weight) {
    this.blockSize = this.step = blockSize
    this.iters = iters
    this.stride = stride
    this.weight = weight

    const { w, h, binaryData } = this
    for (let i = 0; i < w * h; i += 4) {
      const r = binaryData[i]
      const g = binaryData[i + 1]
      const b = binaryData[i + 2]
      const labColor = this.rgb2lab(r, g, b)
      const { l, a, b } = labColor
      // why is i, i + 2, i + 3
      this.labImageData[i] = l // 明度
      this.labImageData[i + 2] = a // 红绿
      this.labImageData[i + 3] = b // 黄蓝
    }
  }
}