const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const w = 700
const h = 700

canvas.width = w
canvas.height = h

function drawOriginalImage(imgData) {
  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 0, 0, w, h)
  }
  img.src = imgData
}