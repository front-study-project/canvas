class Step {
  constructor(options) {
    const { type, width = 0, height = 0, top = 0, left = 0, text, src } = options
    this.key = Date.now()
    this.type = type
    this.width = width
    this.height = height
    this.top = top
    this.left = left
    this.right = top + width
    this.bottom = top + height
    this.text = text
    this.src = src
    this.tag = undefined
    this.el = undefined
  }
  create(tag) {
    if (!tag) return
    const { text, src, type, key } = this
    this.tag = tag
    this.el = document.createElement(tag)
    this.el.setAttribute('id', key)
    this.el.className = "canvas-child-wrapper"

    switch(type) {
      case 'text':
        this.el.innerText = text
        break
        case 'image':
        this.el.src = src
        break
    }
    return this.el
  }

  updateRect({ left, top, right, bottom }) {
    if (left) {
      this.left = left
    }
    if (top) {
      this.top = top
    }
    if (right) {
      this.right = right
    }
    if (bottom) {
      this.bottom = bottom
    }
  }
}