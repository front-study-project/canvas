const wrapper = document.querySelector("#wrapper");
const ct = new Controller();
let record = [];
let touchState = {
  touch: false,
  startX: 0,
  startY: 0,
  absMoveX: 0,
  absMoveY: 0,
  lastTouchX: 0,
  lastTouchY: 0,
  target: null
}

wrapper.addEventListener("touchstart", (e) => {
  const touch = e.touches[0]
  const { clientX, clientY } = touch
  const target = e.target
  wrapper.children && [...wrapper.children].forEach(e => {
    e.className = e.className.replace(' active', '')
  })
  if (target.className.indexOf('canvas-child-wrapper') > -1) {
    target.className += " active"
    touchState.target = target
    touchState.touch = true
    touchState.startX = clientX
    touchState.startY = clientY
  } else {
    touchState.target = null
    touchState.touch = false
  }
});

wrapper.addEventListener('touchmove', (e) => {
  if (!touchState.touch || !touchState.target) {
    return
  }
  const touch = e.touches[0]
  const { clientX, clientY } = touch
  const { startX, startY } = touchState
  const absX = Math.abs(clientX - startX)
  const absY = Math.abs(clientY - startY)

  touchState.absMoveX = absX
  touchState.absMoveY = absY

  const item = record.find(item => item.el === touchState.target)
  const { left, top } = item
  let resultX = 0
  let resultY = 0
  if (clientX > startX) {
    resultX = left + absX
  } else {
    resultX = left - absX
  }
  if (clientY > startY) {
    resultY = top + absY
  } else {
    resultY = top - absY
  }

  touchState.lastTouchX = resultX
  touchState.lastTouchY = resultY

  touchState.target.style.transform = `translate(${resultX}px, ${resultY}px)`
  console.log("touchmove")
})

wrapper.addEventListener('touchend', (e) => {
  const touch = e.changedTouches[0]
  const { clientX, clientY } = touch
  if (touchState.target) {
    const item = record.find(item => item.el === touchState.target)
    if (item) {
      const { lastTouchX, lastTouchY } = touchState
      item.updateRect({ left: lastTouchX, top: lastTouchY })
      save(record)
    }
  }
  touchState.target = null
  touchState.touch = false
})

function back() {
  let d = ct.back();
  reRender(d)
}

function forward() {
  let d = ct.forward();
  if (d) {
    reRender(d)
  }
}

function save(data) {
  ct.save(data.map(e => {
    return {
      ...e
    }
  }));
}

// el一直是同一个结点，根据数据去还原到前/后一个结点的信息
// 因为绘制的时候用的innerHTML，导致每次子节点匹配，即使元素看起来一致，但实际是不同的结点，因为用key去匹配
// 这里可能会内存泄漏
function reRender(data = []) {
  record = data

  // for(let i = 0; i < wrapper.children.length; i++) {
  //   const itemData = data[i]
  //   const el = wrapper.children[0]
  //   if (itemData) {
  //     let { left, top } = itemData
  //     if (left && top) {
  //       el.style.transform = `translate(${left}px, ${top}px)`
  //     } else {
  //       el.style.transform = `translate(0, 0)`
  //     }
  //     el.style.display = 'inline-block'
  //   } else {
  //     el.style.display = 'none'
  //   }
  // }
}

function text() {
  let t = window.prompt("请输入文本");
  if (!t) return
  const stepItem = new Step({ text: t, type: 'text' })
  const stepItemEL = stepItem.create('div')
  stepItemEL.style.display = 'inline-block'
  record.push(stepItem)
  save(record)
  wrapper.appendChild(stepItemEL);
}

function upload() {
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.onchange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const stepItem = new Step({ type: 'image', src: url })
    const stepItemEl = stepItem.create('img')
    wrapper.appendChild(stepItemEl);
    record.push(stepItem)
    save(record);
    document.body.removeChild(input);
  };
  input.style.display = "none";
  document.body.appendChild(input);
  input.click();
}

function generateExport() {
  html2canvas(wrapper).then((canvas) => {
    const a = document.createElement("a");
    a.download = "导出.png";
    a.href = canvas.toDataURL();
    a.target = "_blank";
    a.click();
  });
}
