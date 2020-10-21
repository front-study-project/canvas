/**
 * 计算鼠标坐标，对应在canvas中的x，y
 * @param {*} canvas 
 * @param {*} x 
 * @param {*} y 
 */
function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect()
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  }
}

/**
 * 绘制canvas背景辅助线
 * @param {*} ctx 
 * @param {*} color 
 * @param {*} stepX 
 * @param {*} stepY 
 */
function drawGrid(ctx, color = 'lightgray', stepX = 10, stepY = 10) {
  let width = ctx.canvas.width
  let height = ctx.canvas.height
  ctx.strokeStyle = color
  ctx.lineWidth = 0.5
  for (let i = stepX + 0.5; i < width; i+= stepX) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, height)
    ctx.stroke()
  }
  for (let j = stepY + 0.5; j < height; j+= stepY) {
    ctx.beginPath()
    ctx.moveTo(0, j)
    ctx.lineTo(width, j)
    ctx.stroke()
  }
}
