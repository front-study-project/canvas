function getRandomColor() {
  let colorArr = ['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
  let color = ""
  for(let i = 0; i < 6; i++){
    color += colorArr[Math.floor(Math.random()*15)]
  }
  return "#" + color
}


class Lottery {
  constructor({ config, target }) {
    const canvas = document.querySelector(target)
    this.config = config
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.w = config.width || this.canvas.width
    this.h = config.height || this.canvas.height
    this.awards = config.awards || []
    this.duration = config.duration
    this.turns = config.turns
  }

  centerX = 120
  centerY = 120

  init() {
    this.ctx.clearRect(0, 0, this.w, this.h)
    this.drawPanel()
    this.drawPointer()
  }

  // 绘制面板
  drawPanel() {
    const { centerX, centerY, ctx, awards } = this
    ctx.moveTo(centerY, centerY)
    ctx.beginPath()
    ctx.fillStyle = '#d64737'
    ctx.arc(centerX, centerY, 100, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(centerY, centerY)
    ctx.fillStyle = '#f9e3bb'
    ctx.arc(centerX, centerY, 90, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()

    let start = 0
    let per = Math.PI * 2 / awards.length
    for (let i = 0; i < awards.length; i++) {
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      const award = awards[i]
      const { text, type } = award
      // ctx.fillStyle = getRandomColor()
      ctx.fillStyle = '#ddd'
      ctx.arc(centerX, centerY, 90, start, start + per)
      ctx.fill()
      start = start + per
      ctx.closePath()

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      const moveX = centerX + 90 * Math.cos(start / 180)
      const moveY = centerY + 90 * Math.sin(start / 180)
      ctx.lineWidth = 5
      ctx.lineTo(moveX, moveY)
      ctx.fill()
      ctx.closePath()

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineWidth = 1
      ctx.lineTo(centerX + 90, centerY)
      ctx.strokeStyle = '#f9e3bb'
      ctx.stroke()
      ctx.closePath()
    }
  }

  // 绘制指针
  drawPointer() {

  }

  // 开始抽奖
  goGetLucky() {

  }
}

const config = {
  awards: [
    { id: 1001, text: 'Mac M1', type: '一等奖' },
    { id: 1002, text: 'Ipad pro 2020', type: '二等奖' },
    { id: 1003, text: 'Iphone手机', type: '三等奖' },
    { id: 1004, text: 'Iphone 定制火影手机壳', type: '' },
    { id: 1005, text: '阳光普照奖', type: '' },
    { id: 1005, text: '阳光普照奖', type: '' },
    { id: 1005, text: '阳光普照奖', type: '' },
    { id: 1005, text: '阳光普照奖', type: '' },
    { id: 1005, text: '阳光普照奖', type: '' },
  ],
  duration: 3000,
  turns: 10,
  space: 5
}
const lottery = new Lottery({ config, target: '#canvas' })

lottery.init()