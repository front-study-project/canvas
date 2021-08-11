class Controller {
  constructor() {
    this.history = []
    this.index = -1
  }
  back() {
    if (this.index === 0) {
      return []
    }
    if (this.index > 0) {
      let data = this.history[--this.index]
      return data
    }
  }
  forward() {
    if (this.index >= 0) {
      return this.history[++this.index]
    }
  }
  save(data) {
    this.index++
    this.history[this.index] = [...data]
    this.history = this.history.slice(0, this.index + 1)
  }
}